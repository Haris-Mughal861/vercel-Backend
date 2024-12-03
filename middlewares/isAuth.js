const jwt = require('jsonwebtoken')

const isAuth = (req,res,next)=>{
    try{
    const accessToken = req.cookie.accessToken;
    if(!accessToken){
        const error = new Error('unathorized');
        error.statusCode = 400;
        throw error;
    }
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{
        if(err){
            return res.status(400).json({message:'invalid token'})
            }else{
                req.userId = decoded.id;
                req.userRole = decoded.role;
                req.userEmail = decoded.email;
            }
            next()

    })
    console.log(accessToken);
    
}catch(error){
    next(error);
}}
module.exports = isAuth;