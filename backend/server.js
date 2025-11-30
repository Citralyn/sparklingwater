const express = require("express");
const app = express(); // create express object

const path = require("path");

require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware.js")
const userRouter = require("./routes/userRoutes.js")
const msgRouter = require("./routes/msgRoutes.js")

const cors = require("cors");
app.use(cors());

app.use(express.json()); //
// we can handle payloads with Content-type application/json


app.use(express.static(path.join(__dirname, "thestatic")));
// if ur serving files staticcally on server
// its whatever name 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "thestatic/index.html"));
});

app.get("/other", (req, res) => {
  res.sendFile(path.join(__dirname, "thestatic/other.html"));
});



app.use("/users", userRouter);

app.use("/msg", msgRouter)

app.get("/special_access", authMiddleware, (req, res) => {
    console.log("got in");
    res.status(200).json({ message: "Authorized!", user: req.user });; 
})


app.listen(3003, () => {
    console.log("this app is listening on port 3003")
})