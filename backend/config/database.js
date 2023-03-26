const mongoose=require('mongoose')

require('dotenv').config();


const connectDatabase = ()=>{
    mongoose.set("strictQuery", false);
    
    
    mongoose.connect("mongodb://localhost:27017/shopit",({
            useNewUrlParser: true,
            useUnifiedTopology: true
    })).then(con =>{
        console.log(`Mongodb Database connected with HOST: ${con.connection.host}`)
    })
    
}

module.exports=connectDatabase