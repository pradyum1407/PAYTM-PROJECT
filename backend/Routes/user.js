const express = require("express")
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const Router = express.Router()
const { User, Account } = require("../Db")
const bcrypt = require("bcrypt")
const authmiddleware = require("../middleware")
require('dotenv').config();


//route to signup

Router.post("/signup", async (req, res) => {

    const { username, password, firstName, lastName } = req.body

    //zod input validation
    const userValidation = z.object({
        username: z.string().email(),
        password: z.string().min(6),
        firstName: z.string().max(30),
        lastName: z.string().max(30)
    })

    const validated = userValidation.safeParse({ username, password, firstName, lastName })

    console.log(validated);

    if (!validated.success) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    //database doesnt containing the same user 
    const verify = await User.findOne({ username: username })
    if (verify) {
        return res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
    }

    //hashed password using bcrypt
    const hash = await bcrypt.hash(password, 10) 


    //creating a user in the database after validation
    const userCreated = await User.create({
        username: username,
        password: hash,
        firstName: firstName,
        lastName: lastName
    })

    const userid = userCreated._id
    
    //generated the  account balance of user
    await Account.create({
        userid,
        balance:Math.floor(Math.random()*10000 + 1)
    })


    //generated a jwt token  
    if (userCreated) {
        const token = jwt.sign({ userid }, (process.env.JWT_SCERET))
        res.status(200).json({
            msg: "User  succesfully created",
            token: token
        })
    }

})

//-------------------------------------------------------------------------------------------
//route to signin 
Router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    //zod validation
    const signinBody = z.object({
        username: z.string().email(),
        password: z.string()
    })

    const validated = signinBody.safeParse({ username, password })


    if (!validated.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: username,
    });

    if (!user) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if (!ispasswordvalid) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    try {
        const token = jwt.sign({
            userid: user._id
        }, process.env.JWT_SCERET);

        res.status(200).json({
            message: "login succesfull",
            token: token
        })
        return;
    }
    catch (err) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }

})

//----------------------------------------------------------------------------------------------

//route to update the information of the user 

Router.put("/", authmiddleware, async (req, res) => {

    const { firstName, password, lastName } = req.body;
    console.log(req.body);
    
    //zod validation  
    const updateBody = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional()
    })
    
    const validated = updateBody.safeParse({ firstName, lastName, password })
    console.log(validated);

    if (!validated.success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }
    //get all the data in updateddata
    const updatedData = validated.data

    //hashing the new password 
    if (updatedData.password) {
        const hashedpassword = await bcrypt.hash(updatedData.password, 10)
        updatedData.password = hashedpassword;
    }

    //update the  user data in the database
    await User.updateOne({ _id: req.userid }, { $set: updatedData })

    res.status(200).json({
        msg: "updated succesfully"
    })
})
//-------------------------------------------------------------------------------------------------

Router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
console.log(filter);

    const users = await User.find( 
        {  
          $or: [{
              firstName: {
                  "$regex": filter
              }
          }, {    
              lastName: {
                  "$regex": filter
              }
          }]
    })
console.log(users);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = Router;