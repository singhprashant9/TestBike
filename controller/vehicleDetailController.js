const asyncHandler = require("express-async-handler");
const Vehicle = require("../models/vehicleModel");

const createVehicle = asyncHandler(async (req,res) => {
    const {register_number,name,model,description,price,logo} = req.body;
    if(!register_number || !name || !model || !description || !price || !logo){
        res.status(400);
        throw Error("All fields require");
    }

    const vehicle = await Vehicle.create({register_number,name,model,description,price,logo});
    console.log(`Vehicle detail created ${vehicle}`);
    if(vehicle){
        res.status(201).json({_id:vehicle.id,name:vehicle.name});
    } else{
        res.status(400);
        throw Error("User data is Not valid");
    }
}); 

const getVehicle = asyncHandler(async (req,res) => {
    var query = require('url').parse(req.url,true).query;
    console.log(query);
    const vehicle = await Vehicle.find({register_number:query.register_number});
    if(!vehicle){
        res.status(404);
        throw new Error("Vehicle not found");
    }
    res.status(200).json(vehicle);
});

const getAllVehicle = asyncHandler(async (req,res) => {
    const vehicle = await Vehicle.find();
    if(!vehicle){
        res.status(404);
        throw new Error("Vehicle not found");
    }
    res.status(200).json(vehicle);
});

const updateVehicle = asyncHandler(async (req,res) => {
    var query = require('url').parse(req.url,true).query;
    console.log(req.body);

    const vehicle = await Vehicle.find({register_number:query.register_number});
    if(!vehicle){
        res.status(404);
        throw new Error("Vehicle not found");
    }
    try{
        const updateVehicle = await Vehicle.findOneAndUpdate({register_number:query.register_number},req.body,{new:true});
        res.status(200).json(updateVehicle);
    }catch(e){
        res.status(400);
        throw Error(`Something went wrong in update ${e}`);
    }

});


const deleteVehicle = asyncHandler(async (req,res) => {
    var query = require('url').parse(req.url,true).query;
    console.log(req.body);

    const vehicle = await Vehicle.find({register_number:query.register_number});
    if(!vehicle){
        res.status(404);
        throw new Error("Vehicle not found");
    }
    try{
        const deleteVehicle = await Vehicle.findOneAndDelete({register_number:query.register_number});
        res.status(200).json(deleteVehicle);

    }catch(e){
        res.status(400);
        throw Error(`Something went wrong in update ${e}`);
    }
});

const bulkInsertVehicle = asyncHandler(async (req, res) => {
    const vehicles = req.body;

    // Validate the array structure
    if (!Array.isArray(vehicles)) {
        res.status(400);
        throw new Error("Invalid request format. Expecting an array of vehicles.");
    }

    // Filter out invalid documents
    const validVehicles = vehicles.filter(({ register_number, name, model, description, price, logo }) => 
        register_number && name && model && description && price && logo
    );
    
    // Check if any vehicles are missing fields
    if (validVehicles.length !== vehicles.length) {
        res.status(400);
        throw new Error("All fields are required for each vehicle");
    }

    // Insert valid documents in bulk
    if (validVehicles.length > 0) {
        await Vehicle.insertMany(validVehicles);
        res.status(200).json({ message: "Vehicles inserted successfully" });
    } else {
        res.status(400);
        throw new Error("All fields require for at least one vehicle");
    }
});

const pagination = asyncHandler(async (req,res) => {
    // console.log(res.query.page)
    try{
    var query = require('url').parse(req.url,true).query;
    console.log(query);

    let page = Number(query.page) || 1;
    let limit = Number(query.limit) || 3;

    let skip = (page - 1) * limit;

    const vehicle = await Vehicle.find().skip(skip).limit(limit);

    res.status(200).json(vehicle);
    }catch(e){
        res.status(400);
        throw Error(`Something went wrong ${e}`);
    }



});


module.exports = {createVehicle,getVehicle,updateVehicle,deleteVehicle,getAllVehicle,bulkInsertVehicle,pagination};