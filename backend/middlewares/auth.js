//Checks if user is authenticated or not
const User=require('../models/user')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require('jsonwebtoken')

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.cookies

    if(!token){
        return next(new ErrorHandler('Login first to access this resource',401))
    }
    
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next()

})

//Handlinf users roles

exports.authorizeRoles=(...roles)=>{
    
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403))
        }
        next()
    }
}