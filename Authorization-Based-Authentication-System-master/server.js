require('dotenv').config()
const express= require('express')
const cors= require('cors')
const { handleMongooseConnection, handleRedisConnection }= require('./services/connection')
const USER= require('./routes/normal.routes')

const PORT= process.env.PORT
const app= express()


handleMongooseConnection()
handleRedisConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use("/", USER)

app.listen(PORT, ()=>{ console.log(`✅ Server started on ${PORT}`)})