const express=require("express")
const twilio = require("./controller/twilio")
const user = require("./controller/user")
const Bill = require("./controller/Bill")
const CustomError= require("./Utils/CustomError")
const cors= require('cors')
const cookieParser= require('cookie-parser')

const app= express()

app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended:false,limit: '1mb'}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser())

app.use("/api/v2",twilio)
app.use("/api/v2",user)
app.use("/api/v2",Bill)

app.use(CustomError)
module.exports= app