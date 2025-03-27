const { hashPassword }= require('../services/passwordHashing')
const { sendSignUpOTP }= require('../services/emailServices')
const mongoose= require('mongoose')
const User= require('../models/user.schema')
const OTP= require('../models/otp.schema')
const validator= require('validator')
const crypto= require('crypto') 



exports.handlePostDataForSignUp= async (req, res)=>{
    const session= await mongoose.startSession()
    try{
        session.startTransaction()
        const { username, password, confirmPassword, email, role } = req.body

                if (!username || !password || !confirmPassword || !email || !role) {
                    await session.abortTransaction()
                    return res.status(400).json({ success: false, message: "All fields are required." })
                }
        
                if (!validator.isEmail(email)) {
                    await session.abortTransaction()
                    return res.status(400).json({ success: false, message: "Invalid email format." })
                }
        
                if (password !== confirmPassword) {
                    await session.abortTransaction()
                    return res.status(400).json({ success: false, message: "Passwords do not match." })
                }

        const hashedPassword= await hashPassword(password)
        
        const existingUser= await User.findOne({
            $or : [{ email }, {username}]
        })

        if (existingUser) {
            await session.abortTransaction()
            return res.status(400).json({ success: false, message: "Email or Username already exists." })
        }
        
        const otp= crypto.randomInt(100000, 999999)

        try{
            await User.create([{
                username: username,
                password: hashedPassword,
                email: email,
                role: role,
                isActive: false
            }], { session })

        }catch(err){
            console.error("Error in New User Creation function: ", err.message)
            throw err
        }
        
        try{
            await OTP.create([{
                email : email,
                otp : otp,
                createdAt: new Date() 
            }], { session })

        }catch(err){
            console.error("Error in New User Creation function: ", err.message)
            throw err
        }

        await sendSignUpOTP(email, otp)
        console.log(`OTP sent successfully for ${role} Sign-Up.`)
        
        await session.commitTransaction()

        return res.status(200).json({ success: true, message: `OTP sent successfully to ${email}`, email: email })

    }catch(err){
        if (session && session.inTransaction()) {
            await session.abortTransaction()
        }
        console.error("Error in sending Email for sign-up: " + err.message)
        return res.status(500).json({ success: false, message: "Internal server error." })

    }finally{
        if(session){
            await session.endSession()
        }
    }
}