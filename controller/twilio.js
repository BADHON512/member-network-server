const express=require('express')

const router=express.Router()


router.post("/badhon",(req,res)=>{
    const {name ,age}=req.body
    
    const accountSid = "ACcdf8af630716495dab0475d4ceed1b97";
    const authToken = "96736b374921093dff9e9b6bac41061e";
    const client = require('twilio')(accountSid, authToken);
    
    client.messages
      .create({
         body: 'Member-Network নাম =বাঁধন  আপনার ডিশ বিল =২০০ টাকা আদাইয়ের তারিখ = ৮/৮/২০২৩  dish line kata hobe kinto taka na dile',
         from: '+12187572165',
         to: '+8801712124128'
       })
      .then(message => console.log(message.sid)).catch((err)=>{
        console.log(err)
      });
})

module.exports=router