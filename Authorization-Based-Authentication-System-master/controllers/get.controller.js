const { verifyJwtToken }= require('../services/jwtToken')
const { redisClient }= require('../services/redis')


const secret= process.env.SECRET

exports.handleUserGetReq= async( req, res)=>{
    try{
        return res.status(200).json({ success: true, message: "User API.Authorization Passed."})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}


exports.handleAdminGetReq= async( req, res)=>{
    try{
        return res.status(200).json({ success: true, message: "Admin API.Authorization Passed."})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}


exports.handleGetLogout= async (req,res)=>{
    try{
        const authHeader= req.headers['authorization']
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Authorization header is missing.' })
        }

        if(!authHeader.startsWith('Bearer ')){
            return res.status(401).json({ success: false, message: 'Invalid authorization format. Expected Bearer token.' })
        }

        const token= authHeader.slice(7)
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token is missing.' });
        }

        let user
        try{
            user= await verifyJwtToken(token, secret)
        }catch(err){
            console.error("Token verification failed:", err.message)
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
            }
            return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
        }

        try {
            const expirationTime = user.exp - Math.floor(Date.now() / 1000)
            if (expirationTime > 0) {
                await redisClient.set(token, 'blacklisted', 'EX', expirationTime)
            }
        } catch (err) {
            console.error("Error storing token in Redis blacklist:", err.message);
            return res.status(500).json({ success: false, message: "Internal Server Error." })
        }

        console.log(`${req.user.role} Logged out successfully.`)
        return res.status(200).json({ success: true, message: `${req.user.role} Logged out successfully.` })

    }catch(err){
        console.error("Error in student logout function:", err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}



