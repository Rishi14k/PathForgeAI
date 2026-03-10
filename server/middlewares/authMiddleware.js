const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
     const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({success:false,message:"Token required"})
    }
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()  
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Invalid token"})
    }
}

module.exports = authMiddleware