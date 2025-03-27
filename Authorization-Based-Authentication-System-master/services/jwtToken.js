const jwt= require('jsonwebtoken')


const secret= process.env.SECRET



exports.createJwtToken = async (id, username, role)=>{
    try{
        const token= jwt.sign({ id, username, role}, secret, {expiresIn: '3h'})
        return token
    }catch(err){
        console.error("Error creating JWT tokens", err.message)
        throw err
    }
}


exports.verifyJwtToken= async(token) =>{
    try{
        return jwt.verify(token, secret)
    }catch(err){
        console.error("Problem in verifing token: ", err.message)
        throw err
    }
}