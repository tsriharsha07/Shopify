const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

//Process Stripe Payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors( async (req,res,next)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        
        metadata:{integration_check:'accept_a_payment'}
    })
        res.status(200).json({
            sucess:true,
            client_secret:paymentIntent.client_secret
        })
    
})
//Send stripe api key => /api/v1/stripeapi
exports.sendStripeAPI = catchAsyncErrors( async (req,res,next)=>{
    
        res.status(200).json({
            sucess:true,
            stripeapikey:process.env.STRIPE_API_KEY
        })
    
})