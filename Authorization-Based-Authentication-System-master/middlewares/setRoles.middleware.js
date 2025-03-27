exports.setRoleUser= async( req, res, next)=>{
    try{
        req.requiredRole = ['user']
        next()

    }catch(err){
        console.error("Error in Set Role user Middleware "+ err.message)
        return res.status(500).json({ success: false, message: "Internal Server Error."})
    }
}


exports.setRoleAdmin= async( req, res, next)=>{
    try{
        req.requiredRole = ['admin']
        next()

    }catch(err){
        console.error("Error in Set Role admin Middleware "+ err.message)
        return res.status(500).json({ success: false, message: "Internal Server Error."})
    }
}
