const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({

    //  todo --------------------------- / --------------------------------

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },

    level: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },


    //  todo --------------------------- / --------------------------------

    badge: {
        type: String,
    },
    quote: {
        type: String,
    },
    feedback: {
        type: String,
    },

    active: {
        type: String
    },

    //  todo --------------------------- / --------------------------------

    monthly_offline_tournament: [{
        name: {
            type: String,
        },
        score: {
            type: Number,
        },
        totalRounds: {
            type: Number,
        },
        rank: {
            type: Number
        }
    }],
    monthly_online_tournament: [{
        name: {
            type: String,
        },
        score: {
            type: Number,
        },
        totalRounds: {
            type: Number,
        },
        rank: {
            type: Number
        }
    }],
    official_tournament: [{
        name: {
            type: String,
        },
        score: {
            type: Number,
        },
        totalRounds: {
            type: Number,
        },
        rank: {
            type: Number
        }
    }],

    //  todo --------------------------- Stats --------------------------------

    beginner_stats: [{
        month: {
            type: String
        },
        piece_movement: {
            type: Number
        },
        rules: {
            type: Number
        },
        free_flow: {
            type: Number
        }
    }],
    basic_stats: [{
        month: {
            type: String
        },
        opening: {
            type: Number
        },
        middlegame: {
            type: Number
        },
        endgame: {
            type: Number
        },
        tactics: {
            type: Number
        },
        blunder_prevention: {
            type: Number
        },

        calculation: {
            type: Number
        },
        notation: {
            type: Number
        },
    }],
    intermediate_stats: [{
        month: {
            type: String
        },
        opening: {
            type: Number
        },
        middlegame: {
            type: Number
        },
        endgame: {
            type: Number
        },
        tactics: {
            type: Number
        },
        blunder_prevention: {
            type: Number
        },

        attack: {
            type: Number
        },
        defence: {
            type: Number
        },

    }],
    advance_stats: [{
        month: {
            type: String
        },
        opening: {
            type: Number
        },
        middlegame: {
            type: Number
        },
        endgame: {
            type: Number
        },
        tactics: {
            type: Number
        },
        blunder_prevention: {
            type: Number
        },

        positional_concepts: {
            type: Number
        },
    }],


    //  todo --------------------------- OTHER STATS --------------------------------

    stats_playstyle: {
        agressive: { type: Number },
        creative: { type: Number },
        tactical: { type: Number },

        solid: { type: Number },
        positional: { type: Number },
        defensive: { type: Number },

        default: { type: Number },
    }

    //  todo --------------------------- / --------------------------------
})

module.exports = mongoose.model("players", playerSchema)