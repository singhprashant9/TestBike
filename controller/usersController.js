const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUser =  asyncHandler(async (req,res) => {
    const {username,email,password,deviceId} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw Error("All field require");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw Error("User already Register!");
    }
    const bcryptPassword = await bcrypt.hash(password,10);
    const user = await User.create(
        {
            username,
            email,
            password:bcryptPassword,
            deviceId:deviceId
        }
    );
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    } else{
        res.status(400);
        throw Error("User data is Not valid");
    }
    res.json({message: "register the user"});
});

const loginUser = asyncHandler(async (req,res) => {
    const {username,password,deviceId} = req.body;
    if(!username || !password || !deviceId){
        res.status(400);
        throw Error("All fields Mandatory");
    }

    const user = await User.findOne({username});
     
    if(user && await bcrypt.compare(password,user.password)){
        const updateUserDeviceId = await User.updateOne({username:username},{$set: {deviceId:req.body.deviceId}});
        const jwtToken = jwt.sign({
            user: {
                username: user.username,
                email:user.email,
                deviceId:deviceId,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"8h"})
        res.status(200).json({jwtToken});
    }else{
        res.status(401);
        throw Error("username or password not valid");
    }

});

module.exports = {registerUser,loginUser};