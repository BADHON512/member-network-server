const { default: mongoose } = require("mongoose");

const CollectBillSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Inter your customer name'],
       
    },
    price:{
        type:String,
        required:[true,'Inter your bill'],

    },
    description:{
        type:String,
     
    },
    user:{
        type:Object,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date(Date.now())
    },
    type:{
        type:String,
        required:true
    }


},{})

const Bill= new mongoose.model("Bill",CollectBillSchema)

module.exports= Bill