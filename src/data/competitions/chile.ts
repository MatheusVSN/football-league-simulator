const division1 = {
    name: "National League",
    relegation: 2,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'COBR', rating: 83, lastSeasonProgress: [] },
        { name: 'HUAC', rating: 82, lastSeasonProgress: [] },
        { name: 'COLC', rating: 81, lastSeasonProgress: [] },
        { name: 'PALE', rating: 80, lastSeasonProgress: [] },
        { name: 'EVER', rating: 79, lastSeasonProgress: [] },
        { name: 'ULCA', rating: 78, lastSeasonProgress: [] },
        { name: 'COQU', rating: 77, lastSeasonProgress: [] },
        { name: 'UNIE', rating: 76, lastSeasonProgress: [] },
        { name: 'CDUC', rating: 75, lastSeasonProgress: [] },
        { name: 'UCHI', rating: 74, lastSeasonProgress: [] },
        { name: 'OHIG', rating: 73, lastSeasonProgress: [] },
        { name: 'NUBL', rating: 72, lastSeasonProgress: [] },
        { name: 'AUDI', rating: 71, lastSeasonProgress: [] },
        { name: 'COPI', rating: 70, lastSeasonProgress: [] },
        { name: 'MAGA', rating: 69, lastSeasonProgress: [] },
        { name: 'CURU', rating: 68, lastSeasonProgress: [] }
    ]
}

const division2 = {
    name: "Second Division",
    level: 2,
    teams: [
        { name: 'DLIM', rating: 70, lastSeasonProgress: [] },
        { name: 'MELI', rating: 69, lastSeasonProgress: [] },
        { name: 'SAUN', rating: 68, lastSeasonProgress: [] },
        { name: 'FERV', rating: 67, lastSeasonProgress: [] },
        { name: 'LAUB', rating: 66, lastSeasonProgress: [] },
        { name: 'DVAL', rating: 65, lastSeasonProgress: [] },
        { name: 'PROO', rating: 64, lastSeasonProgress: [] },
        { name: 'TRAS', rating: 63, lastSeasonProgress: [] },
        { name: 'RSAN', rating: 62, lastSeasonProgress: [] },
        { name: 'CONC', rating: 61, lastSeasonProgress: [] },
        { name: 'DREN', rating: 60, lastSeasonProgress: [] },
        { name: 'GVEL', rating: 59, lastSeasonProgress: [] },
        { name: 'IBER', rating: 58, lastSeasonProgress: [] },
        { name: 'DLIN', rating: 57, lastSeasonProgress: [] }
    ]
}


const chileanLeague = {
    name: "Chilean League",
    country: "chile",
    leagues: [
        division1,
        division2
    ]
}

export default chileanLeague