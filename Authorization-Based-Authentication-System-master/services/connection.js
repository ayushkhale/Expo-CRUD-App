const mongoose= require('mongoose')
const { redisClient }= require('../services/redis')


const URL= process.env.MONGO_LIVE


exports.handleMongooseConnection= async()=>{
    try{
        await mongoose.connect(URL)
        console.log("✅ Mongo DB connected")
    }catch(err){
        console.error("❌ Failed To Connect TO Mongoose Database")
        throw err
    }
}


exports.handleRedisConnection= async()=>{
    try{
        await redisClient.connect()
        console.log("✅ Redis connected")
    }catch(err){
        console.error("❌ Failed To Connect TO Redis")
        throw err
    }
}