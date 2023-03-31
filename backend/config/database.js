const mongoose=require('mongoose')

require('dotenv').config();

//mongodb://localhost:27017
const connectDatabase = ()=>{
    mongoose.set("strictQuery", false);
    
    
    mongoose.connect("mongodb://127.0.0.1/shopit",({
            useNewUrlParser: true,
            useUnifiedTopology: true 
    })).then(con =>{
        console.log(`Mongodb Database connected with HOST: ${con.connection.host}`)
    })
    
}

module.exports=connectDatabase