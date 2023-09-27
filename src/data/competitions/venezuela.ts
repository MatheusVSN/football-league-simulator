const division1 = {
    name: "Venezuela I",
    relegation: 4,
    relegationType: 2,
    level: 1,
    teams: [
        { name: 'DPTC', rating: 77, lastSeasonProgress: [] },
        { name: 'ACPC', rating: 76, lastSeasonProgress: [] },
        { name: 'CARF', rating: 75, lastSeasonProgress: [] },
        { name: 'CARB', rating: 74, lastSeasonProgress: [] },
        { name: 'PRTG', rating: 73, lastSeasonProgress: [] },
        { name: 'METF', rating: 72, lastSeasonProgress: [] },
        { name: 'DLGU', rating: 71, lastSeasonProgress: [] },
        { name: 'ESTM', rating: 70, lastSeasonProgress: [] },
        { name: 'DRZU', rating: 69, lastSeasonProgress: [] },
        { name: 'MONS', rating: 68, lastSeasonProgress: [] },
        { name: 'ANGF', rating: 67, lastSeasonProgress: [] },
        { name: 'ZAMR', rating: 66, lastSeasonProgress: [] },
        { name: 'HCMN', rating: 65, lastSeasonProgress: [] },
        { name: 'UCVE', rating: 64, lastSeasonProgress: [] },
        { name: 'MINR', rating: 63, lastSeasonProgress: [] }
    ]
}

const divisionBA = {
    name: "Venezuela 2A",
    level: 2,
    teams: [
        { name: 'MRTG', rating: 60, lastSeasonProgress: [] },
        { name: 'DNPL', rating: 59, lastSeasonProgress: [] },
        { name: 'FNAI', rating: 58, lastSeasonProgress: [] },
        { name: 'BLVR', rating: 57, lastSeasonProgress: [] },
        { name: 'PTRE', rating: 56, lastSeasonProgress: [] },
        { name: 'ACAN', rating: 55, lastSeasonProgress: [] },
        { name: 'ATLC', rating: 54, lastSeasonProgress: [] },
        { name: 'NVES', rating: 53, lastSeasonProgress: [] }
    ]
}

const divisionBB = {
    name: "Venezuela 2B",
    level: 2,
    teams: [
        { name: 'UREN', rating: 60, lastSeasonProgress: [] },
        { name: 'ATVG', rating: 59, lastSeasonProgress: [] },
        { name: 'YRCY', rating: 58, lastSeasonProgress: [] },
        { name: 'TTNS', rating: 57, lastSeasonProgress: [] },
        { name: 'HRFL', rating: 56, lastSeasonProgress: [] },
        { name: 'FRNT', rating: 55, lastSeasonProgress: [] },
        { name: 'TRJL', rating: 54, lastSeasonProgress: [] },
        { name: 'FNDL', rating: 53, lastSeasonProgress: [] }
    ]
}


const venezuelanLeague = {
    name: "Venezuelan League",
    country: "venezuela",
    leagues: [
        division1,
        divisionBA,
        divisionBB
    ]
}

export default venezuelanLeague