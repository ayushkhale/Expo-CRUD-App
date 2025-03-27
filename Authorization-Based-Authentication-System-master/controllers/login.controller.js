const { verifyPassword }= require('../services/passwordHashing')
const { createJwtToken }= require('../services/jwtToken')
const User= require('../models/user.schema')



exports.handlePostLogin= async (req, res)=>{
    try{
        const { username, password }= req.body
        let { role }= req.body

        if( !username || !password || !role){
            return res.status(400).json({ success: false, message: "All fields are required."})
        }

        const user= await User.findOne({ username: username, role: role, isActive: true})
        if(!user){
            const dummyHash= "$argon2d$v=19$m=12,t=3,p=1$ajUydGFhaWw4ZTAwMDAwMA$MRhztKGcPpp8tyzeH9LvDQ"
            await verifyPassword(dummyHash, password)
            return res.status(401).json({ success: false, message: "Incorrect username or password"})
        }

        let match
        try{
            match= await verifyPassword(user.password, password)
        }catch(err){
            console.error("Password verification function: ", err.message)
            throw err
        }

        if(!match){
            return res.status(401).json({ success: false, message: "Incorrect username or password"})
        } 

        const token= await createJwtToken(user._id, username, user.role)

        console.log(`${role} Logged in`)

        return res.status(200).json({ success: true, message: "Login Successfull", token: token})

    }catch(err){
        console.error("Error in user login API: ", err.message)
        return res.status(500).json({ success: false, message: "Internal Server Error."})
    }
}