const express = require("express");
const userRouter = express.Router();
const { getUser, postUser } = require("../controllers/userController");
// okay router - // instead of just using
// main app (express()) to process requests
// router like a mountable app


userRouter.get("/", getUser); // controllers somewhere else

userRouter.post("/", postUser); 

module.exports = userRouter; 