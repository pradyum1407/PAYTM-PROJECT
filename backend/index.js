const express= require("express")
const cors = require("cors")
const Port=3000;
const mainRouter= require("../backend/Routes/index");
const app=express()

//middlewares
app.use(express.json());
app.use(cors());
app.use("/app/v1",mainRouter);

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
})