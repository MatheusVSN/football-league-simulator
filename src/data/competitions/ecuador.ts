const division1 = {
    name: "Pro league",
    relegation: 2,
    relegationType: 1,
    level: 1,
    teams: [
        { name: 'MURU', rating: 80, lastSeasonProgress: [] },
        { name: 'LDQU', rating: 79, lastSeasonProgress: [] },
        { name: 'DELF', rating: 78, lastSeasonProgress: [] },
        { name: 'TUNI', rating: 77, lastSeasonProgress: [] },
        { name: 'BASC', rating: 76, lastSeasonProgress: [] },
        { name: 'UCAT', rating: 75, lastSeasonProgress: [] },
        { name: 'DCUE', rating: 74, lastSeasonProgress: [] },
        { name: 'CUMB', rating: 73, lastSeasonProgress: [] },
        { name: 'IDVA', rating: 72, lastSeasonProgress: [] },
        { name: 'ELNA', rating: 71, lastSeasonProgress: [] },
        { name: 'GUCI', rating: 70, lastSeasonProgress: [] },
        { name: 'OREN', rating: 69, lastSeasonProgress: [] },
        { name: 'EMEL', rating: 68, lastSeasonProgress: [] },
        { name: 'AUCS', rating: 67, lastSeasonProgress: [] },
        { name: 'LIEC', rating: 66, lastSeasonProgress: [] },
        { name: 'GUAL', rating: 65, lastSeasonProgress: [] }
    ]
}

const division2 = {
    name: "Division B",
    level: 2,
    teams: [
        { name: 'MACA', rating: 65, lastSeasonProgress: [] },
        { name: 'IMBA', rating: 64, lastSeasonProgress: [] },
        { name: 'MANT', rating: 63, lastSeasonProgress: [] },
        { name: 'INDJ', rating: 62, lastSeasonProgress: [] },
        { name: 'CUNI', rating: 61, lastSeasonProgress: [] },
        { name: 'VATO', rating: 60, lastSeasonProgress: [] },
        { name: 'NDOC', rating: 59, lastSeasonProgress: [] },
        { name: 'CHAC', rating: 58, lastSeasonProgress: [] },
        { name: 'AMEQ', rating: 57, lastSeasonProgress: [] },
        { name: 'BULV', rating: 56, lastSeasonProgress: [] }
    ]
}


const ecuadorianLeague = {
    name: "Ecuadorian League",
    country: "ecuador",
    leagues: [
        division1,
        division2
    ]
}

export default ecuadorianLeague