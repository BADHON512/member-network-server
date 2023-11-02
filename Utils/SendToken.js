
const SendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken()

    // option for cookie
    const option={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
        sameSite:"none",
        secure:true
    }
    res.status(statusCode).cookie('token',token,option).json({
        success:true,
        token,
        message: "Login successfully"
    })
}

module.exports=SendToken