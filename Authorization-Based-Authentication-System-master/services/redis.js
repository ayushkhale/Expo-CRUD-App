const { createClient }= require('@redis/client')
const redisURL= process.env.REDIS_LOCAL


exports.redisClient= createClient({
    url : redisURL
})