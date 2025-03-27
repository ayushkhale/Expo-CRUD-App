const mongoose= require('mongoose')


const profileSchema= mongoose.Schema({
    userId  : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    fullName: { type: String, default: " "},
    age     : { type: Number},
    address : { type: String},
},  {timestamps: true} )

module.exports= mongoose.model('Profile', profileSchema)