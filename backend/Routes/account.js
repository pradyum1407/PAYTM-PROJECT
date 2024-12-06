const express = require("express")
const { Account } = require("../Db")
const { default: mongoose } = require("mongoose")
const authmiddleware = require("../middleware")
const Router = express.Router()

//endpoint for user to get their balance check

Router.get("/balance", authmiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userid: req.userid });
        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }
        res.status(200).json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching balance" });
    }
});


//endpoint for user to transfer money to diffrent account

Router.post("/transfer", authmiddleware, async (req, res) => {
    //created a session 
    const session = await mongoose.startSession();

    //start the transaction
    session.startTransaction();
    try {

        const { to, amount } = req.body;

        if (!to || amount <= 0) {
            await session.abortTransaction();
            return res.json({
                msg: "invalid transfer detail"
            })
        }
        //fetching the accounts from the db

        //this is account of sender 
        const account = await Account.findOne({ userid: req.userid }).session(session)
        console.log(account);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(404).json({
                msg: "insufficent balance"
            })
        }

        // this is the account of the recipent
        const toaccount = await Account.findOne({ userid: to }).session(session)
        console.log(toaccount);

        if (!toaccount) {
            await session.abortTransaction();
            return res.status(404).json({
                msg: "invalid account"
            })
        }

        //perform the transaction
        await Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session)
        await Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session)

        //commit the whole transaction
        await session.commitTransaction();

        //upddating the user
        res.json({
            msg: "Transfer succesfull"
        })

    } catch (err) {
        await session.abortTransaction()
        console.log(err)
        res.json({
            msg: "Error while doing transaction"
        })
    } finally {
        await session.endSession()
    }

})



module.exports = Router