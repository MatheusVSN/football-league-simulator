import { Division, Match, TeamStanding } from "@/types/types";

type TeamStatsUpdateProps = {
    result: "Win" | "Draw" | "Loss"
    goalsFor: number
    goalsConceded: number
}

function getMatchWinner(game: Match) {
    if (game.homeScore === game.awayScore) return
    return game.homeScore > game.awayScore ? game.homeTeam : game.awayTeam
}

/**
 * Organizes the standings table for a given division based on the teams' performance in the matches played.
 * @param division - The division for which the standings table is to be organized.
 * @returns An array of team standings sorted by points, wins, goal difference, goals scored, and outcome of the last match between both teams.
 */
export function organizeStandingsTable(division: Division) {
    const currentStanding: TeamStanding[] = []

    division.teams.map((team) => {
        currentStanding.push({
            team,
            draw: 0,
            goalsConceded: 0,
            goalsFor: 0,
            losses: 0,
            points: 0,
            wins: 0
        })
    })

    function updateTeamStats(teamName: string, stats: TeamStatsUpdateProps) {
        const teamStandInfo = currentStanding.find((stand) => stand.team.name === teamName)
        if (!teamStandInfo) return

        if (stats.result === "Win") {
            teamStandInfo.wins += 1
            teamStandInfo.points += 3
        }
        else if (stats.result === "Draw") {
            teamStandInfo.draw += 1
            teamStandInfo.points += 1
        }
        else if (stats.result === "Loss") teamStandInfo.losses += 1

        teamStandInfo.goalsFor += stats.goalsFor
        teamStandInfo.goalsConceded += stats.goalsConceded
    }

    division.MatchWeek.map((gameWeek) => {
        if (!gameWeek.played) return
        gameWeek.matches.map((game) => {
            const winner = getMatchWinner(game)

            if (!winner) {
                updateTeamStats(game.homeTeam.name, { result: "Draw", goalsFor: game.homeScore, goalsConceded: game.awayScore })
                updateTeamStats(game.awayTeam.name, { result: "Draw", goalsFor: game.awayScore, goalsConceded: game.homeScore })
            } else if (winner === game.homeTeam) {
                updateTeamStats(game.homeTeam.name, { result: "Win", goalsFor: game.homeScore, goalsConceded: game.awayScore })
                updateTeamStats(game.awayTeam.name, { result: "Loss", goalsFor: game.awayScore, goalsConceded: game.homeScore })
            } else {
                updateTeamStats(game.awayTeam.name, { result: "Win", goalsFor: game.awayScore, goalsConceded: game.homeScore })
                updateTeamStats(game.homeTeam.name, { result: "Loss", goalsFor: game.homeScore, goalsConceded: game.awayScore })
            }
        })
    })

    function getWinnerFromMatch(homeTeam: string, awayTeam: string) {
        for (let matches = division.MatchWeek.length -  1; matches >= 0; matches -= 1) {
            const presumedMatchWeek = division.MatchWeek[matches].matches
            // Find the last match that both teams played
            const foundMatch = presumedMatchWeek.find((match) => match.homeTeam.name === homeTeam && match.awayTeam.name === awayTeam
                || match.homeTeam.name === awayTeam && match.awayTeam.name === homeTeam)

            if (!foundMatch) return
            if (foundMatch.homeScore === foundMatch.awayScore) continue
            return foundMatch.awayScore - foundMatch.homeScore
        }
    }


    /*
    Sorts the standing by:
    - Most points
    - Most wins
    - Most goal difference
    - Most goals scored
    - Outcome of the last match between both teams. If they have drawn every time, a random decision is made
    */
    currentStanding.sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        } else if (a.wins !== b.wins) {
            return b.wins - a.wins;
        } else {
            const aTeamGD = a.goalsFor - a.goalsConceded
            const bTeamGD = b.goalsFor - b.goalsConceded

            if (aTeamGD !== bTeamGD) {
                return bTeamGD - aTeamGD
            } else if (a.goalsFor !== b.goalsFor) {
                return b.goalsFor - a.goalsFor
            } else {
                const winner = getWinnerFromMatch(a.team.name, b.team.name)

                if (!winner) return 0.5 - Math.random()
                return winner
            }
        }
    })

    return currentStanding
}