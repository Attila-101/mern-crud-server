//call express server, mongoose
const express = require('express');
//import mongoose library
const mongoose = require('mongoose')
//initializing the express server
const app = express();
const cors = require('cors');

const CompetitorModel = require("./models/Competitor");
require("dotenv").config();

//receive info in json format
app.use(express.json());

app.use(cors());

mongoose.connect("mongodb+srv://Runner:crud2022@competitorregistration.il0gt.mongodb.net/competitors?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {

    const competitorName = req.body.competitorName
    const runningClub = req.body.runningClub
    const distance = req.body.distance

    const competitor = new CompetitorModel({competitorName: competitorName, runningClub: runningClub, distance: distance});

    try {
      await competitor.save();  
    } catch(err) {
        console.log(err)
    }
});

//read route
app.get('/read', async (req, res) => {
    CompetitorModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)
    });
});

//update route
app.put('/update', async (req, res) => {
    const newDistance = req.body.newDistance;
    const id = req.body.id;

    try {
      await CompetitorModel.findById(id, (err, updatedDistance) => {
          updatedDistance.distance = newDistance
          updatedDistance.save();
          res.send("update");
      })
    } catch(err) {
        console.log(err)
    }
});

//delete route
app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;

    await CompetitorModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

app.listen(process.env.PORT || 3001, () => {
    console.log('You are connected!');
});