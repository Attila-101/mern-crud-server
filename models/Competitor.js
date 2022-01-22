const mongoose = require('mongoose')

//mogoose schema for the data
const CompetitorSchema = new mongoose.Schema({
    competitorName: {
        type: String,
        required: false,
    },
    runningClub: {
        type: String,
        required: false,
    }, 
    distance: {
        type: Number,
        required: false,
    },
});

const Competitor = mongoose.model("Competitor", CompetitorSchema);
module.exports = Competitor;