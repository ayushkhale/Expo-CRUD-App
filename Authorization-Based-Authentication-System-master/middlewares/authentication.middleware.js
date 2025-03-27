const { verifyJwtToken }= require('../services/jwtToken')
const secret= "AhishekGaneshe@92384rishi_ganeshe3284328"
const { redisClient }= require('../services/redis')


exports.AuthMiddlware= async (req, res, next)=>{
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

        let blacklisted
        try{
            blacklisted= await redisClient.get(token)
        }catch(err){
            console.error("Error in the redis token blacklist: ", err.message)
            throw err
        }

        if(blacklisted){
            return res.status(401).json({ success: false, message: 'Token is blacklisted.'})
        }

        let user
        try{
            user= await verifyJwtToken(token, secret)
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
            }
            return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
        }

        if(!user){
            return res.status(401).json({ success: false, message: 'Invalid or expired token.' })
        }

        req.user= user

        if(req.requiredRole){
            if(Array.isArray(req.requiredRole) && !req.requiredRole.includes(user.role)){
                return res.status(403).json({ success: false, message: 'Access denied.' })
            }
        }

        next()
    }catch(err){
        console.error("Error in the Token-authentication Middleware: " + err.message);
        return res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}