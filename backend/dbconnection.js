const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
// I'll use my URI from atlas 

async function connectToDB() {
    if (!client.isConneted?.()) {
        await client.connect(); // guess just waiting
    }
    return client.db("newdatabase")

}

module.exports = connectToDB; 