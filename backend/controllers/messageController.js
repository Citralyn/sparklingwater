const connectToDB = require("../dbconnection.js")

const postMessage = async (req, res) => {

    try {
        const ourDb = await connectToDB(); //start connection
        const collection = ourDb.collection("messages"); // make new if not exist

        const status = await collection.insertOne(req.body); // placing in

        res.status(200).json({
            message: "DATA INSERT GOOD"
        })


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = { postMessage }