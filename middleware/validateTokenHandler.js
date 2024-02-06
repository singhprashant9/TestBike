const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next) => {
    try{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    let decodedJwt;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            decodedJwt = decoded;
            
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized ot token is missing");
        }
    }else{
        res.status(401);
        throw new Error("User is not Authorized or token is missing");
    }
    const userData = await User.findOne({username: decodedJwt.user.username});

        if(userData && userData.deviceId === decodedJwt.user.deviceId){
            res.user = decodedJwt.user;
            next();
        }else{
            res.status(400);
            throw Error("User is logged out");
        }
    }catch(e){
        res.status(401);
        throw new Error(`${e} User is not Authorized or token is missing`);
    }
    
});

module.exports = validateToken;