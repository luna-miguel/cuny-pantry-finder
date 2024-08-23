// Code  for mongoose config in backend
// Filename - backend/index.js
const mongoose = require('mongoose');
const School = require("./models/school.js"); 
require ("dotenv").config();

const uri = process.env.REACT_APP_MONGO_DB_URL;
async function run() {

    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    data = await School.find();
    console.log(JSON.parse(JSON.stringify(data)));
}

run().catch(console.dir);

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const PORT = process.env.REACT_APP_PORT || 5000;
 
app.get('/', (req, res) => {
    res.send("GET Request Called")
})

app.get('/school-info', (req, res) => {
  res.send(data);
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});