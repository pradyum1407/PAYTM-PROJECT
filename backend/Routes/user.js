const express = require("express")
const { z } = require("zod")
const jwt = require("jsonwebtoken")
const Router = express.Router()
const { User } = require("../Db")
const bcrypt = require("bcrypt")
const authmiddleware = require("../middleware")
require('dotenv').config();


//route to signup

Router.post("/signup", async (req, res) => {

    const { username, password, firstname, lastname } = req.body

    //zod input validation
    const userValidation = z.object({
        username: z.string().email(),
        password: z.string().min(6),
        firstname: z.string().max(30),
        lastname: z.string().max(30)
    })

    const validated = userValidation.safeParse({ username, password, firstname, lastname })

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
        firstname: firstname,
        lastname: lastname
    })

    //generated a jwt token  
    const userid = userCreated._id
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

    const { firstname, password, lastname } = req.body;

    //zod validation  
    const updateBody = z.object({
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        password: z.string().optional()
    })

    const validated = updateBody.safeParse({ firstname, lastname, password })
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
    const filter = req.query.filter || ""

    if(!filter){
        return res.status(411).json({
            msg:"value cant be empty"
        })
    }
    try{

        const users = await User.find({
            $or: [{
                firstname: {
                    $regex: filter,
                    $options:"i"
                }
            },{
                lastname: {
                    $regex: filter,
                    $options:"i"
                }
            }
            ]
        })
    
        res.status(200).json({
            users:users.map(user =>({
                username:user.username,
                firstname:user.firstName,
                lastname:user.lastName,
                _id:user._id
            })) 
    
        })
    }
    catch(err){
        res.status(500).json({
            msg:"internal server error"
        })
    }
})
module.exports = Router;