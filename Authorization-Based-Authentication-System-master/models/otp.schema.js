const mongoose= require('mongoose')


const otpschema= mongoose.Schema({
    email     : { type: String, required: true, unique: true},
    otp       : { type: Number, required: true },
    createdAt : { type: Date, default: Date.now(), expires: 120 }
},{ timestamps: true})


module.exports= mongoose.model('Otp', otpschema)