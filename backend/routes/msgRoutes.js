const express = require("express");
const msgRouter = express.Router();
const { postMessage } = require("../controllers/messageController.js"); 

msgRouter.post("/", postMessage); 


module.exports = msgRouter;  