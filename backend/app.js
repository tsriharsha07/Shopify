const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const errorMiddleware=require('./middlewares/errors')
const bodyparser=require('body-parser')
const dotenv=require('dotenv')

dotenv.config({path:'backend/config/config.env'})

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload())


const products=require('./routes/product')
const auth=require('./routes/auth')
const order=require('./routes/order')
const payment=require('./routes/payment')

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)


app.use(errorMiddleware)

module.exports=app