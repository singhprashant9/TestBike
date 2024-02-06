const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:[true,"Please add the username"],
        unique:[true,"username address already taken"],
    },
    email:{
        type:String,
        require:[true,"Please add the email"],
        unique:[true,"email address is already taken"],
    },
    password:{
        type: String,
        require:[true,"Please add the password"],
    },
    deviceId:{
        type: String,
        require:[true,"Please add the password"],
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Users",userSchema)