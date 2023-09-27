import { Fixture, Team } from "@/types/types";

const SHOOT_PER_TEAM_BASE = 8
const BASE_SCORING_CHANCE = 1.15
const BASE_SCORING_ADD = 0.1
const BASE_HOME_SCORING_ADD = BASE_SCORING_ADD + 0.025

/**
 * Generates league fixtures for a given list of teams and number of rematch rounds.
 * @param teams - The list of teams to generate fixtures for.
 * @param rematch - The number of rematch rounds to generate fixtures for.
 * @returns An array of arrays of fixtures, where each inner array represents a round of fixtures.
 */
export function generateLeagueFixtures(teams: Team[], rematch: number) {
    function generateRoundRobin(teamsList: Team[], isRematch: boolean = false) {
        if (teamsList.length % 2 !== 0) {
            teamsList.push({
                name: "ghost",
                lastSeasonProgress: [],
                rating: 0,
                id: "none"
            })
        }

        const rounds = teamsList.length - 1
        const matchesPerRound = teamsList.length / 2
        const fixtures: Fixture[][] = []

        for (let round = 0; round < rounds; round += 1) {
            const roundMatches: Fixture[] = []
            for (let match = 0; match < matchesPerRound; match += 1) {
                let homeIndex = (round + match) % (teamsList.length - 1)
                let awayIndex = (teamsList.length - 1 - match + round) % (teamsList.length - 1)
                if (match === 0) {
                    awayIndex = teamsList.length - 1
                }

                if (isRematch) {
                    const temp = homeIndex
                    homeIndex = awayIndex
                    awayIndex = temp
                }

                if (teamsList[homeIndex].name === "ghost" || teamsList[awayIndex].name === "ghost") continue

                roundMatches.push({
                    homeTeam: teamsList[homeIndex],
                    awayTeam: teamsList[awayIndex]
                })
            }
            fixtures.push(roundMatches)
        }
        return fixtures
    }

    let allFixtures: Fixture[][] = []
    for (let i = 0; i < rematch; i += 1) {
        const fixtures = generateRoundRobin(teams, i % 2 === 1)
        allFixtures = allFixtures.concat(fixtures)
    }

    return allFixtures
}

function generateTeamScore(homeTeam: boolean, shootQuantity: number, oppositeTeam: number) {
    let score = 0

    for (let shootingAttempt = 1; shootingAttempt <= shootQuantity; shootingAttempt += 1) {
        const chance = Math.random() + (homeTeam ? BASE_HOME_SCORING_ADD : BASE_SCORING_ADD)
        const defenseChange = Math.random()
        if (BASE_SCORING_CHANCE * chance > ((oppositeTeam / 100) + defenseChange)) {
            score += 1
        }
    }

    return score
}

/**
 * Simulates a football match between two teams and returns the scores.
 * @param homeTeam - The strength of the home team as a number.
 * @param awayTeam - The strength of the away team as a number.
 * @returns An array containing the home team score and the away team score.
 */
export function simulateMatch(homeTeam: number, awayTeam: number) {
    let [homeScore, awayScore] = [0, 0]

    const teamsDiff = Math.abs(((homeTeam - awayTeam)) / 10)
    const baseShootQuantity = SHOOT_PER_TEAM_BASE + (teamsDiff / 2)

    homeScore = generateTeamScore(true, baseShootQuantity, awayTeam)
    awayScore = generateTeamScore(false, baseShootQuantity, homeTeam)

    return [homeScore, awayScore]
}