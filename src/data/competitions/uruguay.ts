const division1 = {
    name: "First Division",
    relegation: 4,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'BOSR', rating: 85, lastSeasonProgress: [] },
        { name: 'DFSP', rating: 84, lastSeasonProgress: [] },
        { name: 'LLUZ', rating: 83, lastSeasonProgress: [] },
        { name: 'PENR', rating: 82, lastSeasonProgress: [] },
        { name: 'DPMAL', rating: 81, lastSeasonProgress: [] },
        { name: 'FENX', rating: 80, lastSeasonProgress: [] },
        { name: 'RIVP', rating: 79, lastSeasonProgress: [] },
        { name: 'MCTT', rating: 78, lastSeasonProgress: [] },
        { name: 'LIVP', rating: 77, lastSeasonProgress: [] },
        { name: 'DANB', rating: 76, lastSeasonProgress: [] },
        { name: 'NACN', rating: 75, lastSeasonProgress: [] },
        { name: 'WAND', rating: 74, lastSeasonProgress: [] },
        { name: 'RACG', rating: 73, lastSeasonProgress: [] },
        { name: 'PLAC', rating: 72, lastSeasonProgress: [] },
        { name: 'CERL', rating: 71, lastSeasonProgress: [] },
        { name: 'CERR', rating: 70, lastSeasonProgress: [] }
    ]
}

const divisionB = {
    name: "Second Division",
    level: 2,
    teams: [
        { name: 'URUM', rating: 72, lastSeasonProgress: [] },
        { name: 'MIRM', rating: 71, lastSeasonProgress: [] },
        { name: 'PROG', rating: 70, lastSeasonProgress: [] },
        { name: 'JUVE', rating: 69, lastSeasonProgress: [] },
        { name: 'ORIE', rating: 68, lastSeasonProgress: [] },
        { name: 'RAMJ', rating: 67, lastSeasonProgress: [] },
        { name: 'ALBI', rating: 66, lastSeasonProgress: [] },
        { name: 'RENT', rating: 65, lastSeasonProgress: [] },
        { name: 'TACU', rating: 64, lastSeasonProgress: [] },
        { name: 'CERR', rating: 63, lastSeasonProgress: [] },
        { name: 'CABV', rating: 62, lastSeasonProgress: [] },
        { name: 'CAAT', rating: 61, lastSeasonProgress: [] },
        { name: 'SUDA', rating: 60, lastSeasonProgress: [] },
        { name: 'POTE', rating: 59, lastSeasonProgress: [] }
    ]
}


const uruguayanLeague = {
    name: "Uruguayan League",
    country: "uruguay",
    leagues: [
        division1,
        divisionB
    ]
}

export default uruguayanLeague