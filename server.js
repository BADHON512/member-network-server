
const ConnectDB = require("./ConnectDB")
const app=require("./app")
const cloudinary= require('cloudinary')




if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({path:"configs/.env"})
}



cloudinary.v2.config({
  cloud_name: 'djo5r2a5z',
  api_key: '324966877418363',
  api_secret: 'zU1HxmVnuBp5u0HFQqueexcEgos',
  secure: true,
});




app.get("/",(req,res)=>{
res.send("<h1>server is running badhon</h1>")
})
ConnectDB()
app.listen(5000,()=>{
    console.log(`server is running on http://localhost:5000 `)
})