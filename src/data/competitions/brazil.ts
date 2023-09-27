const divisionA = {
    name: "Division A",
    relegation: 4,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'BOTA', rating: 90, lastSeasonProgress: [] },
        { name: 'PALM', rating: 88, lastSeasonProgress: [] },
        { name: 'GREM', rating: 87, lastSeasonProgress: [] },
        { name: 'FLAM', rating: 86, lastSeasonProgress: [] },
        { name: 'BRAG', rating: 85, lastSeasonProgress: [] },
        { name: 'FLUM', rating: 84, lastSeasonProgress: [] },
        { name: 'ATH-PR', rating: 83, lastSeasonProgress: [] },
        { name: 'FORT', rating: 82, lastSeasonProgress: [] },
        { name: 'ATL-MG', rating: 81, lastSeasonProgress: [] },
        { name: 'CUIA', rating: 80, lastSeasonProgress: [] },
        { name: 'CRUZ', rating: 79, lastSeasonProgress: [] },
        { name: 'INTL', rating: 78, lastSeasonProgress: [] },
        { name: 'SAOP', rating: 77, lastSeasonProgress: [] },
        { name: 'CORI', rating: 76, lastSeasonProgress: [] },
        { name: 'BAHI', rating: 75, lastSeasonProgress: [] },
        { name: 'GOIA', rating: 74, lastSeasonProgress: [] },
        { name: 'SANT', rating: 73, lastSeasonProgress: [] },
        { name: 'VASCO', rating: 72, lastSeasonProgress: [] },
        { name: 'AME-MG', rating: 71, lastSeasonProgress: [] },
        { name: 'CORIT', rating: 70, lastSeasonProgress: [] }
    ]
}

const divisionB = {
    name: "Division B",
    level: 2,
    teams: [
        { name: 'VIT-BA', rating: 75, lastSeasonProgress: [] },
        { name: 'SPORT', rating: 74, lastSeasonProgress: [] },
        { name: 'GUARA', rating: 73, lastSeasonProgress: [] },
        { name: 'NOVO', rating: 72, lastSeasonProgress: [] },
        { name: 'VILA', rating: 71, lastSeasonProgress: [] },
        { name: 'CRICI', rating: 70, lastSeasonProgress: [] },
        { name: 'JUVE', rating: 69, lastSeasonProgress: [] },
        { name: 'ATL-GO', rating: 68, lastSeasonProgress: [] },
        { name: 'CRB-AL', rating: 67, lastSeasonProgress: [] },
        { name: 'CEA-CE', rating: 66, lastSeasonProgress: [] },
        { name: 'MIRA', rating: 65, lastSeasonProgress: [] },
        { name: 'BOTA-SP', rating: 64, lastSeasonProgress: [] },
        { name: 'ABC-RN', rating: 63, lastSeasonProgress: [] },
        { name: 'AMER-RN', rating: 62, lastSeasonProgress: [] },
        { name: 'REMO-PA', rating: 61, lastSeasonProgress: [] },
        { name: 'SAMPA-SP', rating: 60, lastSeasonProgress: [] },
        { name: 'BRUSQ-SC', rating: 59, lastSeasonProgress: [] },
        { name: 'OPER-PR', rating: 58, lastSeasonProgress: [] },
        { name: 'NAUTI-PE', rating: 57, lastSeasonProgress: [] },
        { name: 'CSA-AL', rating: 56, lastSeasonProgress: [] }
    ]
}

const brazilianLeague = {
    name: "Brazilian League",
    country: "brazil",
    leagues: [
        divisionA,
        divisionB
    ]
}

export default brazilianLeague