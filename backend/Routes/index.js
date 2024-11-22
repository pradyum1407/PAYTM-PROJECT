const express=require("express")

const Router = express.Router();

const userRouter= require("./user")
const accountRouter=require("./account")


Router.use("/user",userRouter)
Router.use("/account",accountRouter)

module.exports= Router