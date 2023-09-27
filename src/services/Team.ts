import { universeCreationSchema } from "@/lib/validation/zodSchemas";
import { Team, TeamStanding } from "@/types/types";
import { League } from "@prisma/client";
import { z } from "zod";


// A rating cannot be +15 or -15 compared to the defaultRating if the rating mode is semi-random
const MAX_RATING_DIFFERENCE_SEMI = 15
type universeCreationSchema = z.infer<typeof universeCreationSchema>

function getRandomRatingChange() {
    // Generates a number between -3 and 3
    return Math.floor(Math.random() * 7) - 3;
}

/**
 * Returns an array of all teams in the league with their last season progress and default rating.
 * @param league - The league object containing all teams.
 * @param leagueTable - The array of team standings in the league.
 * @returns An array of all teams in the league with their last season progress and default rating.
 */
export function getAllTeamProgress(league: League, leagueTable: TeamStanding[]) {
    const teamProgress: Team[] = league.teams.map((nonTypedTeam: any) => {
        const team = nonTypedTeam as Team

        // Index starts with 0, so we add 1 to it
        const lastTeamStanding = leagueTable.findIndex((teamStandingInfo) => teamStandingInfo.team.name === team.name) + 1

        const progressToSave = {
            leagueId: league.id,
            position: lastTeamStanding
        }

        let defaultRating = team.defaultRating
        if (!defaultRating) {
            defaultRating = team.rating
        }

        return {
            ...team,
            lastSeasonProgress: [...team.lastSeasonProgress, progressToSave],
            defaultRating
        }
    })

    return teamProgress
}

/**
 * Updates the rating of each team based on the given rating mode.
 * @param teams An array of Team objects to update the rating for.
 * @param ratingMode The rating mode to use for updating the rating.
 * @returns An array of updated Team objects with the new rating.
 */
export function updateTeamsRating(teams: Team[], ratingMode: universeCreationSchema["rating"]) {
    const updatedTeams = teams.map(team => {
        let teamRating = team.rating

        if (ratingMode == "random") {
            const change = getRandomRatingChange()
            teamRating += change
        } else if (ratingMode === "semi") {
            if (!team.defaultRating) {
                team.defaultRating = teamRating
            }

            const change = getRandomRatingChange()
            teamRating += change

            // Checks if the team rating is higher or lower than the default rating
            if (teamRating - team.defaultRating < -MAX_RATING_DIFFERENCE_SEMI) {
                teamRating = team.defaultRating - MAX_RATING_DIFFERENCE_SEMI
            } else if (teamRating - team.defaultRating > MAX_RATING_DIFFERENCE_SEMI) {
                teamRating = team.defaultRating + MAX_RATING_DIFFERENCE_SEMI
            }
        }

        // Limits the rating to be between 1 and 99
        if (teamRating < 1) teamRating = 1
        if (teamRating > 99) teamRating = 99

        return { ...team, rating: teamRating }
    })

    return updatedTeams
}