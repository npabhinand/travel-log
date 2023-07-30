const Router = require("express");
const getAllUsers = require("../controllers/user-controllers"); 
const signup=require("../controllers/user-controllers")

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup",signup);

module.exports = userRouter;
