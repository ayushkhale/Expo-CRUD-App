const mongoose= require('mongoose')
const User= require('../models/user.schema')
const OTP= require('../models/otp.schema')
const Profile= require('../models/profile.schema')
const validator= require('validator')



exports.handlePostOTPSubmission= async (req, res)=>{
    let { email, otp } = req.body
    otp = parseInt(otp, 10);
    if (!Number.isInteger(otp)) {
        return res.status(400).json({ success: false, message: "Invalid OTP format." });
    }

    const session= await mongoose.startSession()
    try{
        session.startTransaction()

        if ( !email ) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format." })
        }

        const otpDoc = await OTP.findOne({ email })

        if (!otpDoc) {
            const inactiveUser = await User.findOne({ email, isActive: false })
            if (inactiveUser) {
                await User.deleteOne({ email, isActive: false })
            }
            return res.status(400).json({ succes: false, message: 'Invalid OTP or OTP expired.' })
        }

        if (otpDoc.otp !== otp) {
            return res.status(400).json({ succes: false, message: 'Invalid OTP or OTP expired.'})
        }

        try{
            const updatedUser = await User.findOneAndUpdate(
                { email },
                { $set: { isActive: true } },
                { session, new: true, projection: "_id" }
            )

            if (!updatedUser) {
                throw new Error("User activation failed.")
            }
            
            await Profile.create([{
                userId : updatedUser._id,
                fullName : null,
                age : null,
                address: null
            }], { session })

            await OTP.deleteMany({ email }, { session })

        }catch(err){
            console.error("Error in verifying OTP.", err.message)
            throw err
        }
        
        console.info("OTP verified. Registration complete")
        await session.commitTransaction()

        return res.status(200).json({ success: true, message: 'OTP verified. Registration complete.' })

    }catch(err){
        if (session && session.inTransaction()) {
            await session.abortTransaction()
        }
        console.error('Error verifying OTP.'+ err.message)
        return res.status(500).json({ success: false, message: 'Error verifying OTP.' })
    }finally{
        if(session){
            await session.endSession()
        }
    }
}