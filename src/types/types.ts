export type TeamProgress = {
    leagueId: string,
    position: number
}

export type Team = {
    id: string
    name: string
    rating: number
    lastSeasonProgress: TeamProgress[]
    defaultRating?: number
}

export type Match = {
    homeTeam: Team
    awayTeam: Team
    homeScore: number
    awayScore: number
}

export type MatchWeek = {
    id: string
    week: number
    played: boolean
    matches: Match[]
}

export type PastSeason = {
    season: number
    champion: {
        team: Team
    }
    runnerUp: {
        team: Team
    }
}

export type Division = {
    id: string
    competitionId: string
    name: string
    teams: Team[]
    champions: unknown | Team
    runnerUp: unknown | Team
    MatchWeek: MatchWeek[]
    finished: boolean
    relegation?: number
    level: number
    relegationType?: 1 | 2
    pastSeasons: PastSeason[]
    promotion?: number
}

export type Competition = {
    id: string
    universeId: string
    name: string
    country: string
    leagues: Division[]
}

export type Universe = {
    id: string;
    name: string;
    userId: string;
    season: number;
    ratingMode: string;
    createdAt: Date;
    started: boolean;
    competitions: Competition[];
    finished: boolean
    currentWeek: number
}

export type Fixture = {
    homeTeam: Team,
    awayTeam: Team
}

export type TeamStanding = {
    team: Team
    points: number
    goalsFor: number
    goalsConceded: number
    wins: number
    draw: number
    losses: number
}