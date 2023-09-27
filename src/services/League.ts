import argentinianLeague from "@/data/competitions/argentina";
import bolivianLeague from "@/data/competitions/bolivia";
import brazilianLeague from "@/data/competitions/brazil";
import chileanLeague from "@/data/competitions/chile";
import colombianLeague from "@/data/competitions/colombia";
import ecuadorianLeague from "@/data/competitions/ecuador";
import paraguayanLeague from "@/data/competitions/paraguay";
import peruvianLeague from "@/data/competitions/peru";
import uruguayanLeague from "@/data/competitions/uruguay";
import venezuelanLeague from "@/data/competitions/venezuela";
import { prisma } from "@/lib/db";
import { organizeStandingsTable } from "@/lib/standingsTable";
import { Competition, Division, TeamStanding } from "@/types/types";
import { League } from "@prisma/client";

/**
 * Returns an array of all available leagues.
 * @returns {Competition[]} An array of all available leagues.
 */
export function getAllLeagues() {
    return [
        argentinianLeague,
        bolivianLeague,
        brazilianLeague,
        chileanLeague,
        colombianLeague,
        ecuadorianLeague,
        paraguayanLeague,
        peruvianLeague,
        uruguayanLeague,
        venezuelanLeague
    ] as unknown as Competition[]
}

/**
 * Returns the champion and runner-up teams from a league table.
 * @param leagueTable - The league table containing team standings.
 * @returns An object with the champion and runner-up teams.
 */
export function getLeagueChampionAndRunnerUp(leagueTable: TeamStanding[]) {
    return {
        champion: leagueTable[0],
        runnerUp: leagueTable[1]
    }
}

/**
 * Returns an array of the top teams from the league table based on the given quantity.
 * @param leagueTable - The league table to get the top teams from.
 * @param quantity - The number of top teams to return.
 * @returns An array of the top teams from the league table.
 */
export function getTopTeamsFromLeagueTable(leagueTable: TeamStanding[], quantity: number) {
    const topTeams = []

    for (let index = 0; index < quantity; index += 1) {
        const team = leagueTable[index]
        topTeams.push(team)
    }

    return topTeams
}

/**
 * Returns an array of the lowest ranked teams from a given league table.
 * @param leagueTable - An array of team standings in the league.
 * @param quantity - The number of lowest ranked teams to return.
 * @returns An array of the lowest ranked teams from the league table.
 */
export function getLowestTeamsFromLeagueTable(leagueTable: TeamStanding[], quantity: number) {
    const lowestTeams = []
    const teamsAmount = leagueTable.length - 1
    const loopUntil = teamsAmount - quantity

    for (let index = teamsAmount; index > loopUntil; index -= 1) {
        const team = leagueTable[index]
        lowestTeams.push(team)
    }

    return lowestTeams
}

/**
 * Handles promotion and relegation between two divisions.
 * @param upperDivision - An array of team standings in the upper division.
 * @param lowerDivision - An array of team standings in the lower division.
 * @param quantity - The number of teams to promote/relegate.
 * @returns An object containing the updated team lists for both divisions.
 */
export function handlePromotionRelegation(upperDivision: TeamStanding[], lowerDivision: TeamStanding[], quantity: number) {
    const topTeamsFromLowerDivision = getTopTeamsFromLeagueTable(lowerDivision, quantity)
    const lowestTeamsFromUpperDivision = getLowestTeamsFromLeagueTable(upperDivision, quantity)


    lowerDivision.splice(0, quantity)
    upperDivision.splice(upperDivision.length - quantity, quantity)
    upperDivision.push(...topTeamsFromLowerDivision)
    lowerDivision.push(...lowestTeamsFromUpperDivision)

    const firstDivision = upperDivision.map((team) => team.team)
    const secondDivision = lowerDivision.map((team) => team.team)


    return {
        firstDivision,
        secondDivision
    }
}

/**
 * Handles promotion and relegation of teams between leagues.
 * @param upperDivision - An array of team standings in the upper division.
 * @param lowerA - An array of team standings in the lower division A.
 * @param lowerB - An array of team standings in the lower division B.
 * @param quantity - The number of teams to promote and relegate.
 * @returns An object containing the updated team standings for each division.
 */
export function handleGroupsPromotionRelegation(upperDivision: TeamStanding[], lowerA: TeamStanding[], lowerB: TeamStanding[], quantity: number) {
    const promotionFromEach = quantity / 2
    const topTeamsFromA = getTopTeamsFromLeagueTable(lowerA, promotionFromEach)
    const topTeamsFromB = getTopTeamsFromLeagueTable(lowerB, promotionFromEach)

    lowerA.splice(0, promotionFromEach)
    lowerB.splice(0, promotionFromEach)

    const relegatedTeams = upperDivision.splice(upperDivision.length - quantity, quantity)
    const relegatedToA = relegatedTeams.slice(0, quantity / 2)
    const relegatedToB = relegatedTeams.slice(quantity / 2)

    lowerA.push(...relegatedToA)
    lowerB.push(...relegatedToB)
    upperDivision.push(...topTeamsFromA, ...topTeamsFromB)

    const firstDivision = upperDivision.map((team) => team.team)
    const secondA = lowerA.map((team) => team.team)
    const secondB = lowerB.map((team) => team.team)

    return {
        firstDivision,
        secondA,
        secondB
    }
}

/**
 * Handles the relegation of teams from one league to another.
 * @param league - The league from which teams are being relegated.
 * @param lowerDivision - The league to which teams are being relegated.
 * @param changeAmount - The number of teams being relegated.
 * @returns An array of Prisma operations to update the leagues' teams.
 */
export function handleLeagueType1Relegation(league: League, lowerDivision: League, changeAmount: number) {
    const prismaOperations = []
    const upperDivision = organizeStandingsTable(league as unknown as Division)
    const promotingDivision = organizeStandingsTable(lowerDivision as unknown as Division)

    const { firstDivision, secondDivision } = handlePromotionRelegation(upperDivision, promotingDivision, changeAmount)

    const updatedFirstDivision = prisma.league.update({
        where: {
            id: league.id
        },
        data: {
            teams: firstDivision
        }
    })
    prismaOperations.push(updatedFirstDivision)

    const updatedLowerDivision = prisma.league.update({
        where: {
            id: lowerDivision.id
        },
        data: {
            teams: secondDivision
        }
    })
    prismaOperations.push(updatedLowerDivision)
    return prismaOperations
}

/**
 * Handles the promotion and relegation of teams between leagues of type 2.
 * @param league - The league to handle promotion and relegation for.
 * @param lowerDivisionA - The lower division A league.
 * @param lowerDivisionB - The lower division B league.
 * @param changeAmount - The number of teams to promote or relegate.
 * @returns An array of Prisma operations to update the leagues with the new team standings.
 */
export function handleLeagueType2Relegation(league: League, lowerDivisionA: League, lowerDivisionB: League, changeAmount: number) {
    const prismaOperations = []

    const upperDivision = organizeStandingsTable(league as unknown as Division)
    const lowerAStandings = organizeStandingsTable(lowerDivisionA as unknown as Division)
    const lowerBStandings = organizeStandingsTable(lowerDivisionB as unknown as Division)

    const { firstDivision, secondA, secondB } = handleGroupsPromotionRelegation(upperDivision, lowerAStandings, lowerBStandings, changeAmount)

    const updatedFirstDivision = prisma.league.update({
        where: {
            id: league.id
        },
        data: {
            teams: firstDivision
        }
    })
    prismaOperations.push(updatedFirstDivision)

    const updatedADivision = prisma.league.update({
        where: {
            id: lowerDivisionA.id
        },
        data: {
            teams: secondA
        }
    })
    prismaOperations.push(updatedADivision)

    const updatedBDivision = prisma.league.update({
        where: {
            id: lowerDivisionB.id
        },
        data: {
            teams: secondB
        }
    })
    prismaOperations.push(updatedBDivision)

    return prismaOperations
}