// Code  for mongoose config in backend
// Filename - backend/index.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://CPF_admin:CollaboralDamage@cunypantryfinder.3illj.mongodb.net/?retryWrites=true&w=majority&appName=CUNYPantryFinder";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

run().catch(console.dir);

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("Server is running!");
app.use(express.json());
app.use(cors());

const PORT = 5000;
 
app.get('/', (req, res) => {
    res.send("GET Request Called")
})
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});