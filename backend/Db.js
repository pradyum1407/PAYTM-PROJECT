const  mongoose= require("mongoose");
const { number } = require("zod");
require('dotenv').config();



mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({

    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const AccountSchema= new mongoose.Schema({
    
    userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    },
    balance:{
        type:Number,
        required:true
    }

})

const TransactionSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    Amount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    },

    date:{
        type:Date,
        default:Date.now
    },

})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account",AccountSchema)
const Transaction=mongoose.model("Transaction",TransactionSchema)
module.exports=({User,Account,Transaction})