const User = require('../models/user');
const cloudinary=require('cloudinary');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
 
//Register a user => /api/v1/user 

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        
    })

    sendToken(user, 200, res)
})

//Login User=> /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter your email and password'))
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))

    }

    //Checks if password correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    sendToken(user, 200, res)
})

//Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    //create reset password url
    const resetURl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is as follow:\n\n${resetURl}\n\n If you have not requested this email then igonre it`

    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIt Password Recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Reset Password Token is Invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res)
})

//Get currently logged in user details => api/v1/me
exports.getUserProfile=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

//update password => api/v1/password/update
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    
    const user=await User.findById(req.user.id).select('+password');
    //Check previous user password
    const isMatched=await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old Password is incorrect',400));
    }
    user.password=req.body.password
    await user.save();
    sendToken(user,200,res);
})

//Update user Profile => api/v1/me/update
exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    //Update avatar: TODO

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true
    })
})


//Logout user=> /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})


//Admin Routes

//Get all users => /api/v1/admin/users

exports.allUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//Get user details => /api/v1/admin/user/:id

exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

//update user profile => /api/v1/admin/user/:id
exports.updateUser=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    //Update avatar: TODO

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true
    })
})

//Delete user => /api/v1/admin/user/:id

exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }
    //Remove avatar from cloudinery-TODO
    await user.remove();
    res.status(200).json({
        success:true,
        user
    })
})
