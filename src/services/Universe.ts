import { Conflict, DatabaseError, NotFound, Unauthorized } from "@/exceptions";
import { getUserFromServerSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateLeagueFixtures, simulateMatch } from "@/lib/game";
import { generateObjectId } from "@/lib/mongodb";
import { organizeStandingsTable } from "@/lib/standingsTable";
import { universeCreationSchema } from "@/lib/validation/zodSchemas";
import { Division, Fixture, Match, MatchWeek, Team, Universe } from "@/types/types";
import { Competition, League, Prisma } from "@prisma/client";
import { z } from "zod";
import { getAllLeagues, getLeagueChampionAndRunnerUp, handleLeagueType1Relegation, handleLeagueType2Relegation } from "./League";
import { getAllTeamProgress, updateTeamsRating } from "./Team";

type NewUniverseProps = z.infer<typeof universeCreationSchema>
type CreateManyLeague = Prisma.LeagueCreateManyInput;

/**
 * Finds a universe by its ID.
 * @param id - The ID of the universe to find.
 * @returns A Promise that resolves to the found universe.
 */
export async function findUniverseById(id: string) {
    return await prisma.universe.findUnique({
        where: {
            id
        },
        include: {
            competitions: {
                include: {
                    leagues: {
                        include: {
                            MatchWeek: true
                        }
                    }
                }
            }
        }
    }) as unknown as Universe
}

/**
 * Retrieves a universe by its ID.
 * @param id The ID of the universe to retrieve.
 * @returns A Promise that resolves to the universe object, or null if not found.
 */
export async function getUniverseById(id: string) {
    return await prisma.universe.findUnique({
        where: {
            id
        }
    })
}

/**
 * Retrieves all competitions associated with a given universe ID.
 * @param universeId - The ID of the universe to retrieve competitions for.
 * @returns A promise that resolves to an array of competitions.
 */
export async function getCompetitionsByUniverseId(universeId: string) {
    return await prisma.competition.findMany({
        where: {
            universeId
        }
    })
}

/**
 * Retrieves all leagues associated with a given competition ID, including their match weeks.
 * @param competitionId The ID of the competition to retrieve leagues for.
 * @returns A promise that resolves to an array of leagues with their associated match weeks.
 */
export async function getLeaguesByCompetitionId(competitionId: string) {
    return await prisma.league.findMany({
        where: {
            competitionId
        },
        include: {
            MatchWeek: true
        }
    })
}

/**
 * Retrieves leagues by competition IDs.
 * @param competitionIds - An array of competition IDs.
 * @returns A promise that resolves to an array of leagues with their match weeks included.
 */
export async function getLeaguesByCompetitionIds(competitionIds: string[]) {
    return await prisma.league.findMany({
        where: {
            competitionId: {
                in: competitionIds
            }
        },
        include: {
            MatchWeek: true
        }
    })
}

/**
 * Organizes fixtures for a given week.
 * @param fixture - An array of fixtures for the week.
 * @param index - The index of the current week.
 * @returns An object containing the fixtures for the week and the current week number.
 */
export function organizeFixture(fixture: Fixture[], index: number) {
    const currentWeek = index + 1
    const fixturesList: Match[] = []
    fixture.map((game) => {
        const fixture: Match = {
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            awayScore: 0,
            homeScore: 0
        }

        fixturesList.push(fixture)
    })

    return {
        fixtures: fixturesList,
        week: currentWeek
    }
}

/**
 * Edits the rating of a team by its ID in all leagues and matches of a universe.
 * @param universeId The ID of the universe.
 * @param teamId The ID of the team to edit.
 * @param rating The new rating of the team.
 * @throws {NotFound} If the universe with the given ID is not found.
 * @throws {Unauthorized} If the user is not authorized to edit the universe.
 * @throws {DatabaseError} If the update operation fails.
 */
export async function editTeamIdRatingByUniverseId(universeId: string, teamId: string, rating: number) {
    const user = await getUserFromServerSession()

    const universe = await getUniverseById(universeId)
    if (!universe) {
        throw new NotFound(`Not found universe with the id of ${universe}`)
    }
    if (universe.userId !== user.id) {
        throw new Unauthorized(`Unauthorized. You do not created the universe`)
    }

    const prismaOperations = []

    const leagues = await prisma.league.findMany({
        where: {
            Competition: {
                universeId: universe.id
            }
        }
    })

    for (const league of leagues) {
        const teamsList = league.teams as Team[]
        const teamIndex = teamsList.findIndex((team) => team.id === teamId)
        if (teamIndex === -1) continue

        teamsList[teamIndex].rating = rating
        teamsList[teamIndex].defaultRating = rating

        const updateOperation = prisma.league.update({
            where: { id: league.id },
            data: { teams: teamsList },
        })
        prismaOperations.push(updateOperation)
    }

    const matches = await prisma.matchWeek.findMany({
        where: {
            league: {
                Competition: {
                    universeId: universe.id
                }
            },
            played: false,
        }
    })

    for (const matchWeek of matches) {
        const weekMatches = matchWeek.matches as Match[];

        const foundMatch = weekMatches.find(match => match.homeTeam.id === teamId || match.awayTeam.id === teamId);

        if (foundMatch) {
            if (foundMatch.homeTeam.id === teamId) {
                foundMatch.homeTeam.rating = rating;
                foundMatch.homeTeam.defaultRating = rating;
            } else if (foundMatch.awayTeam.id === teamId) {
                foundMatch.awayTeam.rating = rating;
                foundMatch.awayTeam.defaultRating = rating;
            }

            const updateOperation = prisma.matchWeek.update({
                where: { id: matchWeek.id },
                data: { matches: weekMatches },
            });
            prismaOperations.push(updateOperation);
        }
    }

    try {
        await prisma.$transaction(prismaOperations)
    } catch (exception) {
        throw new DatabaseError(`Failed to update the team rating. Please try again later`, exception)
    }
}

/**
 * Simulates a week for a given universe ID.
 * @param {string} universeId - The ID of the universe to simulate the week for.
 * @throws {NotFound} If the universe with the given ID is not found.
 * @throws {Unauthorized} If the user is not authorized to simulate the week for the given universe.
 * @throws {Conflict} If the universe has not been started yet.
 * @throws {DatabaseError} If there is an error while simulating the matches.
 * @returns {Promise<void>} A promise that resolves when the week is simulated successfully.
 */
export async function simulateWeekByUniverseId(universeId: string) {
    const user = await getUserFromServerSession()

    const universe = await getUniverseById(universeId)
    if (!universe) {
        throw new NotFound(`Not found universe with the id of ${universe}`)
    }
    if (universe.userId !== user.id) {
        throw new Unauthorized(`Unauthorized. You do not created the universe`)
    }
    if (!universe.started) {
        throw new Conflict("You must start a new season before simulating it")
    }

    let matchPlayed = false
    const prismaOperations = []
    const currentWeek = universe.currentWeek

    const competitions = await getCompetitionsByUniverseId(universe.id)
    const competitionIDs = competitions.map(competition => competition.id)
    const allLeagues = await getLeaguesByCompetitionIds(competitionIDs)

    for (const competition of competitions) {
        const leaguesForThisCompetition = allLeagues.filter(league => league.competitionId === competition.id)

        for (const league of leaguesForThisCompetition) {
            // Again we convert to unknown first to allow a custom typing MatchWeek
            // This main happens cause we use a JSON to represent team and matches objects
            let leagueFixtures = league.MatchWeek as unknown as MatchWeek[]
            const foundMatchWeek = leagueFixtures.find((matchWeek) => matchWeek.week === currentWeek)

            if (foundMatchWeek) {
                matchPlayed = true
                const matches = foundMatchWeek.matches
                const updatedMatches = matches.map((match) => {
                    const [homeScore, awayScore] = simulateMatch(match.homeTeam.rating, match.awayTeam.rating)
                    return {
                        homeTeam: match.homeTeam,
                        awayTeam: match.awayTeam,
                        homeScore,
                        awayScore
                    }
                })

                const updatingOperation = prisma.matchWeek.update({
                    where: { id: foundMatchWeek.id },
                    data: {
                        matches: updatedMatches,
                        played: true
                    }
                })
                prismaOperations.push(updatingOperation)
            } else {
                if (league.finished) continue
                const leagueTable = organizeStandingsTable(league as unknown as Division)
                const { champion, runnerUp } = getLeagueChampionAndRunnerUp(leagueTable)

                const dataToSave = {
                    season: universe.season,
                    champion,
                    runnerUp
                }

                const saveTeamProgress = getAllTeamProgress(league, leagueTable)

                const saveLeagueTeamsProgress = prisma.league.update({
                    where: {
                        id: league.id
                    },
                    data: {
                        teams: saveTeamProgress,
                        finished: true,
                        pastSeasons: {
                            push: dataToSave
                        }
                    }
                })
                prismaOperations.push(saveLeagueTeamsProgress)
            }
        }
    }


    const updateUniverseWeek = prisma.universe.update({
        where: {
            id: universe.id
        },
        data: {
            currentWeek: currentWeek + 1,
            // If a league match has been played then it's false, otherwise all the leagues have no games left
            finished: !matchPlayed
        }
    })
    prismaOperations.push(updateUniverseWeek)


    try {
        await prisma.$transaction(prismaOperations)
    } catch (exception) {
        throw new DatabaseError(`Failed simulating matches. Please try again later`, exception)
    }
}


export async function startNewSeasonByUniverseId(universeId: string) {
    const user = await getUserFromServerSession()

    let prismaOperations: any[] = []
    const universe = await getUniverseById(universeId)
    if (!universe) {
        throw new NotFound(`Not found universe with the id of ${universe}`)
    }
    let seasonUpdated = 0

    if (universe.userId !== user.id) {
        throw new Unauthorized(`Unauthorized. You do not created the universe`)
    }
    if (universe.started && !universe.finished) {
        throw new Conflict("The season already started")
    }
    if (universe.finished) {
        seasonUpdated += 1
        const deleteAllMatchLeagues = prisma.matchWeek.deleteMany()
        prismaOperations.push(deleteAllMatchLeagues)
    }

    const competitions = await getCompetitionsByUniverseId(universe.id)
    const competitionIDs = competitions.map(competition => competition.id)
    const allLeagues = await getLeaguesByCompetitionIds(competitionIDs)

    for (const competition of competitions) {
        const leaguesForThisCompetition = allLeagues.filter(league => league.competitionId === competition.id)

        for (let index = 0; index < leaguesForThisCompetition.length; index += 1) {
            if (!universe.finished) continue
            const league = leaguesForThisCompetition[index]

            if (league.relegation) {
                const changeAmount = league.relegation
                if (league.relegationType === 1) {
                    const lowerDivision = leaguesForThisCompetition[index + 1]
                    if (!lowerDivision) continue

                    const relegationType1Operations = handleLeagueType1Relegation(league, lowerDivision, changeAmount)
                    prismaOperations.push(...relegationType1Operations)
                } else if (league.relegationType === 2) {
                    const lowerA = leaguesForThisCompetition[index + 1]
                    const lowerB = leaguesForThisCompetition[index + 2]
                    if (!lowerA || !lowerB) continue

                    const relegationType2Operations = handleLeagueType2Relegation(league, lowerA, lowerB, changeAmount)
                    prismaOperations.push(...relegationType2Operations)
                }
            }
        }
    }

    try {
        await prisma.$transaction(prismaOperations)
        // Restart the prisma operations so we can do the part 2
        prismaOperations = []
    } catch (exception) {
        throw new DatabaseError(`Failed to generate a new season on the universe`, exception)
    }

    // Part 2
    const updatedCompetitions = await getCompetitionsByUniverseId(universe.id)
    const updatedCompetitionIDs = updatedCompetitions.map(competition => competition.id)
    const allUpdatedLeagues = await getLeaguesByCompetitionIds(updatedCompetitionIDs)

    for (const competition of updatedCompetitions) {
        const leaguesForThisCompetition: League[] = allUpdatedLeagues.filter(league => league.competitionId === competition.id)

        for (let index = 0; index < leaguesForThisCompetition.length; index += 1) {
            const league = leaguesForThisCompetition[index]
            const leagueFixtures = generateLeagueFixtures(league.teams as Team[], 2)

            const generatedFixtures = leagueFixtures.map((fixture, index) => {
                const organizedFixtures = organizeFixture(fixture, index)
                return {
                    leagueId: league.id,
                    week: organizedFixtures.week,
                    matches: organizedFixtures.fixtures
                }
            })

            const generatedGames = prisma.matchWeek.createMany({
                data: generatedFixtures
            })
            prismaOperations.push(generatedGames)

            let updatedTeams = league.teams
            if (universe.finished) {
                updatedTeams = updateTeamsRating(league.teams as unknown as Team[], universe.ratingMode as NewUniverseProps["rating"])
            }

            // Had to do the assertion. The properties and the object itself does 100% exists. 
            updatedTeams = updatedTeams.filter((team) => (team as Team).name !== "ghost")
            updatedTeams = updatedTeams.sort((aTeam, bTeam) => (bTeam as Team).rating - (aTeam as Team).rating)

            const startLeagueOperation = prisma.league.update({
                where: {
                    id: league.id
                },
                data: {
                    finished: false,
                    teams: updatedTeams as unknown as Prisma.LeagueUpdateteamsInput

                }
            })
            prismaOperations.push(startLeagueOperation)

        }
    }

    const startSeason = prisma.universe.update({
        where: {
            id: universe.id
        },
        data: {
            started: true,
            finished: false,
            season: universe.season + seasonUpdated,
            currentWeek: 1
        }
    })
    prismaOperations.push(startSeason)

    try {
        await prisma.$transaction(prismaOperations)
    } catch (exception) {
        throw new DatabaseError(`Failed to start a new season on the universe`, exception)
    }
}

/**
 * Deletes a universe by its ID.
 * @param {string} universeId - The ID of the universe to be deleted.
 * @throws {NotFound} If the universe with the given ID is not found.
 * @throws {Unauthorized} If the user is not authorized to delete the universe.
 * @throws {DatabaseError} If there is an error while deleting the universe.
 * @returns {Promise<void>} A Promise that resolves when the universe is successfully deleted.
 */
export async function deleteUniverseById(universeId: string) {
    const user = await getUserFromServerSession()

    const universe = await getUniverseById(universeId)
    if (!universe) {
        throw new NotFound(`Not found universe with the id of ${universe}`)
    }
    if (universe.userId !== user.id) {
        throw new Unauthorized(`Unauthorized. You do not created the universe`)
    }

    const prismaOperations = []

    const deleteManyMatchWeeks = prisma.matchWeek.deleteMany({
        where: {
            league: {
                Competition: {
                    universeId: universe.id
                }
            }
        }
    })
    prismaOperations.push(deleteManyMatchWeeks)

    const deleteManyLeagues = prisma.league.deleteMany({
        where: {
            Competition: {
                universeId: universe.id
            }
        }
    })
    prismaOperations.push(deleteManyLeagues)

    const deleteManyCompetitions = prisma.competition.deleteMany({
        where: {
            universeId: universe.id
        }
    })
    prismaOperations.push(deleteManyCompetitions)

    const deleteUniverse = prisma.universe.delete({
        where: {
            id: universeId
        }
    })
    prismaOperations.push(deleteUniverse)

    try {
        await prisma.$transaction(prismaOperations)
    } catch (exception) {
        throw new DatabaseError(`Failed to delete the universe`, exception)
    }
}

/**
 * Creates a new universe with the given data.
 * @param {NewUniverseProps} newUniverseData - The data for the new universe.
 * @returns {Promise<string>} - The ID of the newly created universe.
 * @throws {DatabaseError} - If there is an error creating the universe.
 */
export async function createNewUniverse(newUniverseData: NewUniverseProps) {
    const user = await getUserFromServerSession()
    const { name, rating } = await universeCreationSchema.parseAsync(newUniverseData)

    const prismaOperations = []
    const allCompetitions = getAllLeagues()
    const competitions = allCompetitions.map((competition) => {
        const firstDivision = competition.leagues[0]
        const updatedLeagues = competition.leagues.map((league, index) => {
            let promotionAmount = null

            if (index > 0 && firstDivision.relegationType === 1) {
                promotionAmount = firstDivision.relegation as number
            } else if (index > 0 && firstDivision.relegationType === 2) {
                promotionAmount = firstDivision.relegation as number / 2
            }

            return {
                ...league,
                promotion: promotionAmount,
            }
        })

        return {
            ...competition,
            leagues: updatedLeagues
        }
    })


    const newUniverseID = generateObjectId()
    const newUniverse = prisma.universe.create({
        data: {
            id: newUniverseID,
            name,
            ratingMode: rating,
            season: 1,
            User: {
                connect: {
                    id: user.id
                }
            }
        }
    })
    prismaOperations.push(newUniverse)

    let competitionsData: Competition[] = [];
    let leaguesData: CreateManyLeague[] = [];

    competitions.forEach((competition) => {
        const newCompetitionID = generateObjectId();

        competition.leagues.forEach((league) => {
            const teams = league.teams.map((team) => {
                return {
                    ...team,
                    id: generateObjectId()
                }
            });

            leaguesData.push({
                id: generateObjectId(),
                name: league.name,
                teams,
                relegation: league.relegation ?? null,
                relegationType: league.relegationType ?? null,
                finished: false,
                pastSeasons: [],
                level: league.level,
                competitionId: newCompetitionID,
                promotion: league.promotion
            });
        });

        competitionsData.push({
            id: newCompetitionID,
            name: competition.name,
            country: competition.country,
            universeId: newUniverseID
        });
    });

    const newCompetitions = prisma.competition.createMany({
        data: competitionsData
    });
    prismaOperations.push(newCompetitions);

    const newLeagues = prisma.league.createMany({
        data: leaguesData
    });
    prismaOperations.push(newLeagues);

    try {
        await prisma.$transaction(prismaOperations)
    } catch (exception) {
        throw new DatabaseError("Error creating the universe", exception)
    }

    return newUniverseID
}