const division1 = {
    name: "Pro league",
    relegation: 2,
    relegationType: 2,
    level: 1,
    teams: [
        { name: 'STRG', rating: 78, lastSeasonProgress: [] },
        { name: 'NPOT', rating: 77, lastSeasonProgress: [] },
        { name: 'BOLV', rating: 76, lastSeasonProgress: [] },
        { name: 'ALRD', rating: 75, lastSeasonProgress: [] },
        { name: 'AURR', rating: 74, lastSeasonProgress: [] },
        { name: 'RSCZ', rating: 73, lastSeasonProgress: [] },
        { name: 'ORIP', rating: 72, lastSeasonProgress: [] },
        { name: 'INPE', rating: 71, lastSeasonProgress: [] },
        { name: 'UDVI', rating: 70, lastSeasonProgress: [] },
        { name: 'RTOM', rating: 69, lastSeasonProgress: [] },
        { name: 'JWIL', rating: 68, lastSeasonProgress: [] },
        { name: 'ROYP', rating: 67, lastSeasonProgress: [] },
        { name: 'VACD', rating: 66, lastSeasonProgress: [] },
        { name: 'ATPF', rating: 65, lastSeasonProgress: [] },
        { name: 'BLOM', rating: 64, lastSeasonProgress: [] },
        { name: 'LGMM', rating: 63, lastSeasonProgress: [] },
        { name: 'GUAB', rating: 62, lastSeasonProgress: [] }
    ]
}

const division2A = {
    name: "Second Division A",
    level: 2,
    teams: [
        { name: "REALO", rating: 56, lastSeasonProgress: [] },
        { name: "MDYAC", rating: 57, lastSeasonProgress: [] },
        { name: "GVSJ", rating: 58, lastSeasonProgress: [] },
        { name: "STOSL", rating: 59, lastSeasonProgress: [] },
        { name: "FRANC", rating: 55, lastSeasonProgress: [] },
        { name: "CHN19", rating: 62, lastSeasonProgress: [] },
        { name: "REALM", rating: 61, lastSeasonProgress: [] },
        { name: "PASCE", rating: 53, lastSeasonProgress: [] },
        { name: "TORRF", rating: 54, lastSeasonProgress: [] },
        { name: "REALP", rating: 64, lastSeasonProgress: [] },
        { name: "UNIPA", rating: 60, lastSeasonProgress: [] },
        { name: "NATSU", rating: 63, lastSeasonProgress: [] }
    ]
}

const division2B = {
    name: "Second Division B",
    level: 2,
    teams: [
        { name: "CDMTA", rating: 49, lastSeasonProgress: [] },
        { name: "CDFAT", rating: 47, lastSeasonProgress: [] },
        { name: "RMAPA", rating: 45, lastSeasonProgress: [] },
        { name: "SALDB", rating: 51, lastSeasonProgress: [] },
        { name: "24SEP", rating: 44, lastSeasonProgress: [] },
        { name: "CDSUR", rating: 48, lastSeasonProgress: [] },
        { name: "CABER", rating: 50, lastSeasonProgress: [] },
        { name: "SABUB", rating: 52, lastSeasonProgress: [] },
        { name: "CINSC", rating: 43, lastSeasonProgress: [] },
        { name: "UNIBE", rating: 46, lastSeasonProgress: [] },
        { name: "CDALE", rating: 41, lastSeasonProgress: [] },
        { name: "ACBAL", rating: 42, lastSeasonProgress: [] }
    ]
}


const bolivianLeague = {
    name: "Bolivian League",
    country: "bolivia",
    leagues: [
        division1,
        division2A,
        division2B
    ]
}

export default bolivianLeague