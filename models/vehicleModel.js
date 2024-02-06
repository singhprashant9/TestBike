const { default: mongoose } = require("mongoose");

const vehicleSchema = mongoose.Schema({
    register_number:{
        type:String,
        required: [true, "Please add the register number"],
    },
    name: {
        type:String,
        required: [true, "Please add the contact name"],
    },
    model: {
        type:String,
        required: [true, "Please add the model"],
    },
    description: {
        type:String,
        required: [true, "Please add the description"],
    },
    price: {
        type:String,
        required: [true, "Please add the price"],
    },
    logo: {
        type:String,
        required: [true, "Please add the logo"],
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Vehicle-Details",vehicleSchema);