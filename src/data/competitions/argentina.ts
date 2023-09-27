const division1 = {
    name: "Argentina 1",
    relegation: 4,
    relegationType: 2,
    level: 1,
    teams: [
        { name: 'RIV', rating: 90, lastSeasonProgress: [] },
        { name: 'TAL', rating: 89, lastSeasonProgress: [] },
        { name: 'SAN', rating: 88, lastSeasonProgress: [] },
        { name: 'LAN', rating: 87, lastSeasonProgress: [] },
        { name: 'EST', rating: 86, lastSeasonProgress: [] },
        { name: 'DEF', rating: 85, lastSeasonProgress: [] },
        { name: 'BOC', rating: 84, lastSeasonProgress: [] },
        { name: 'ROS', rating: 83, lastSeasonProgress: [] },
        { name: 'GOD', rating: 82, lastSeasonProgress: [] },
        { name: 'ARG', rating: 81, lastSeasonProgress: [] },
        { name: 'ATL', rating: 80, lastSeasonProgress: [] },
        { name: 'RAC', rating: 79, lastSeasonProgress: [] },
        { name: 'BEL', rating: 78, lastSeasonProgress: [] },
        { name: 'NEW', rating: 77, lastSeasonProgress: [] },
        { name: 'BAR', rating: 76, lastSeasonProgress: [] },
        { name: 'TIG', rating: 75, lastSeasonProgress: [] },
        { name: 'PLA', rating: 74, lastSeasonProgress: [] },
        { name: 'IACC', rating: 73, lastSeasonProgress: [] },
        { name: 'SARM', rating: 72, lastSeasonProgress: [] },
        { name: 'USF', rating: 71, lastSeasonProgress: [] },
        { name: 'BAN', rating: 70, lastSeasonProgress: [] },
        { name: 'GIM', rating: 69, lastSeasonProgress: [] },
        { name: 'CTR', rating: 68, lastSeasonProgress: [] },
        { name: 'IND', rating: 67, lastSeasonProgress: [] },
        { name: 'VEL', rating: 66, lastSeasonProgress: [] },
        { name: 'HUR', rating: 65, lastSeasonProgress: [] },
        { name: 'COL', rating: 64, lastSeasonProgress: [] },
        { name: 'ARS', rating: 63, lastSeasonProgress: [] }
    ]
}

const divisionB1 = {
    name: "Argentina 2A",
    level: 2,
    teams: [
        { name: 'ALMBR', rating: 75, lastSeasonProgress: [] },
        { name: 'SMTUC', rating: 74, lastSeasonProgress: [] },
        { name: 'AGROP', rating: 73, lastSeasonProgress: [] },
        { name: 'DEPMO', rating: 72, lastSeasonProgress: [] },
        { name: 'SMJUA', rating: 71, lastSeasonProgress: [] },
        { name: 'TEMPE', rating: 70, lastSeasonProgress: [] },
        { name: 'ESTRC', rating: 69, lastSeasonProgress: [] },
        { name: 'DEFBE', rating: 68, lastSeasonProgress: [] },
        { name: 'GIMME', rating: 67, lastSeasonProgress: [] },
        { name: 'DEFUN', rating: 66, lastSeasonProgress: [] },
        { name: 'NCHIC', rating: 65, lastSeasonProgress: [] },
        { name: 'ATGUE', rating: 64, lastSeasonProgress: [] },
        { name: 'ALVAR', rating: 63, lastSeasonProgress: [] },
        { name: 'ALLBO', rating: 62, lastSeasonProgress: [] },
        { name: 'PATRO', rating: 61, lastSeasonProgress: [] },
        { name: 'ALMAG', rating: 60, lastSeasonProgress: [] },
        { name: 'GUBRO', rating: 59, lastSeasonProgress: [] },
        { name: 'SANTE', rating: 58, lastSeasonProgress: [] },
        { name: 'FLAND', rating: 57, lastSeasonProgress: [] }
    ]
}

const divisionB2 = {
    name: "Argentina 2B",
    level: 2,
    teams: [
        { name: 'CHACJ', rating: 75, lastSeasonProgress: [] },
        { name: 'INRIV', rating: 74, lastSeasonProgress: [] },
        { name: 'DEPMA', rating: 73, lastSeasonProgress: [] },
        { name: 'ATRAF', rating: 72, lastSeasonProgress: [] },
        { name: 'QUILM', rating: 71, lastSeasonProgress: [] },
        { name: 'BROAD', rating: 70, lastSeasonProgress: [] },
        { name: 'FERRO', rating: 69, lastSeasonProgress: [] },
        { name: 'DEPRI', rating: 68, lastSeasonProgress: [] },
        { name: 'DEPMY', rating: 67, lastSeasonProgress: [] },
        { name: 'MITRE', rating: 66, lastSeasonProgress: [] },
        { name: 'GIMJJ', rating: 65, lastSeasonProgress: [] },
        { name: 'ESTUD', rating: 64, lastSeasonProgress: [] },
        { name: 'ATLAN', rating: 63, lastSeasonProgress: [] },
        { name: 'RACCO', rating: 62, lastSeasonProgress: [] },
        { name: 'ALDOS', rating: 61, lastSeasonProgress: [] },
        { name: 'CHAFE', rating: 60, lastSeasonProgress: [] },
        { name: 'TRISU', rating: 59, lastSeasonProgress: [] },
        { name: 'VIDAL', rating: 58, lastSeasonProgress: [] }
    ]
}

const argentinianLeague = {
    name: "Argentinian League",
    country: "argentina",
    leagues: [
        division1,
        divisionB1,
        divisionB2
    ]
}

export default argentinianLeague