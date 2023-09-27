const division1 = {
    name: "League 1",
    relegation: 4,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'STCR', rating: 78, lastSeasonProgress: [] },
        { name: 'UNIV', rating: 77, lastSeasonProgress: [] },
        { name: 'MLGR', rating: 76, lastSeasonProgress: [] },
        { name: 'ALIM', rating: 75, lastSeasonProgress: [] },
        { name: 'ADTT', rating: 74, lastSeasonProgress: [] },
        { name: 'DPGS', rating: 73, lastSeasonProgress: [] },
        { name: 'SPHN', rating: 72, lastSeasonProgress: [] },
        { name: 'CSVL', rating: 71, lastSeasonProgress: [] },
        { name: 'UTCC', rating: 70, lastSeasonProgress: [] },
        { name: 'CMAN', rating: 69, lastSeasonProgress: [] },
        { name: 'SPBY', rating: 68, lastSeasonProgress: [] },
        { name: 'CINC', rating: 67, lastSeasonProgress: [] },
        { name: 'CUSC', rating: 66, lastSeasonProgress: [] },
        { name: 'DPBN', rating: 65, lastSeasonProgress: [] },
        { name: 'UNCM', rating: 64, lastSeasonProgress: [] },
        { name: 'ACCA', rating: 63, lastSeasonProgress: [] },
        { name: 'ALAT', rating: 62, lastSeasonProgress: [] },
        { name: 'ATGR', rating: 61, lastSeasonProgress: [] },
        { name: 'DPMU', rating: 60, lastSeasonProgress: [] }
    ]
}

const divisionB = {
    name: "League 2",
    level: 2,
    teams: [
        { name: 'CMUN', rating: 62, lastSeasonProgress: [] },
        { name: 'LCHN', rating: 61, lastSeasonProgress: [] },
        { name: 'ALHU', rating: 60, lastSeasonProgress: [] },
        { name: 'LLAC', rating: 59, lastSeasonProgress: [] },
        { name: 'SNTS', rating: 58, lastSeasonProgress: [] },
        { name: 'USNM', rating: 57, lastSeasonProgress: [] },
        { name: 'CMRC', rating: 56, lastSeasonProgress: [] },
        { name: 'DCOP', rating: 55, lastSeasonProgress: [] },
        { name: 'JAUR', rating: 54, lastSeasonProgress: [] },
        { name: 'AUGR', rating: 53, lastSeasonProgress: [] },
        { name: 'AYAC', rating: 52, lastSeasonProgress: [] },
        { name: 'UHRL', rating: 51, lastSeasonProgress: [] },
        { name: 'PIRT', rating: 50, lastSeasonProgress: [] },
        { name: 'CSTN', rating: 49, lastSeasonProgress: [] }
    ]
}


const peruvianLeague = {
    name: "Peruvian League",
    country: "peru",
    leagues: [
        division1,
        divisionB
    ]
}

export default peruvianLeague