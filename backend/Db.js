const  mongoose= require("mongoose");
require('dotenv').config();



mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

//  conn.on('connected',()=> console.log("connected"));
//  conn.on('disconnected',()=> console.log("disconnected"));



const Schema = new mongoose.Schema({

    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const User = mongoose.model("User", Schema)

module.exports=({User})