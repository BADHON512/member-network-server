
const express = require("express");
const ErrorHandler = require("../Middleware/ErrorHandle");
const User = require("../model/user");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Bill = require("../model/collectBill");

const router = express.Router();

router.post('/bill-post',CatchAsyncError(async(req,res,next)=>{
   
    try {
 
        const bill = await Bill.create(req.body);
       
  
        res.status(200).json({
          success: true,
          bill,
          message: "Bill submitted",
        });
      } catch (error) {
  
        if (error.code === 11000) {
          // Handle duplicate key error
          const message = `Duplicate key error: ${Object.keys(error.keyPattern)} Entered`;
          return next(new ErrorHandler(message, 400));
        } else {
          // Handle other errors
          return next(new ErrorHandler(error.message, 400));
        }

     
      
      }
}))

router.get('/get-dis-users',CatchAsyncError(async(req,res,next)=>{
  try {
    const users=await Bill.find()
    res.status(201).json({
      success:true,
      users
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}))


module.exports=router;