const division1 = {
    name: "Paraguay I",
    relegation: 2,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'LIBT', rating: 81, lastSeasonProgress: [] },
        { name: 'CERP', rating: 80, lastSeasonProgress: [] },
        { name: 'TRID', rating: 79, lastSeasonProgress: [] },
        { name: 'GUAR', rating: 78, lastSeasonProgress: [] },
        { name: 'NATL', rating: 77, lastSeasonProgress: [] },
        { name: 'SPAM', rating: 76, lastSeasonProgress: [] },
        { name: 'OLIM', rating: 75, lastSeasonProgress: [] },
        { name: 'SPLQ', rating: 74, lastSeasonProgress: [] },
        { name: 'GNCJ', rating: 73, lastSeasonProgress: [] },
        { name: 'GUAI', rating: 72, lastSeasonProgress: [] },
        { name: 'RSCC', rating: 71, lastSeasonProgress: [] },
        { name: 'TACY', rating: 70, lastSeasonProgress: [] }
    ]
}

const division2 = {
    name: "Paraguay II",
    level: 2,
    teams: [
        { name: 'SOLA', rating: 67, lastSeasonProgress: [] },
        { name: 'MAYO', rating: 66, lastSeasonProgress: [] },
        { name: 'INCG', rating: 65, lastSeasonProgress: [] },
        { name: 'FDMO', rating: 64, lastSeasonProgress: [] },
        { name: 'RUBN', rating: 63, lastSeasonProgress: [] },
        { name: 'CDCA', rating: 62, lastSeasonProgress: [] },
        { name: 'SSLO', rating: 61, lastSeasonProgress: [] },
        { name: 'DSAN', rating: 60, lastSeasonProgress: [] },
        { name: 'FEBR', rating: 59, lastSeasonProgress: [] },
        { name: 'CMLE', rating: 58, lastSeasonProgress: [] },
        { name: 'ATCO', rating: 57, lastSeasonProgress: [] },
        { name: 'OCTU', rating: 56, lastSeasonProgress: [] }
    ]
}


const paraguayanLeague = {
    name: "Paraguayan League",
    country: "paraguay",
    leagues: [
        division1,
        division2
    ]
}

export default paraguayanLeague