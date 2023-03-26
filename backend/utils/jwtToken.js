//Create and send token and save in cookie

const sendToken=(user,statusCode,res)=>{
    //Create Jwt Token
    const token=user.getJWtToken();

    //Options for cookies
    const options={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    })
}

module.exports=sendToken