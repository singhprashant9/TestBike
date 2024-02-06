const express = require("express");
const { createVehicle,getVehicle, updateVehicle, deleteVehicle, getAllVehicle, bulkInsertVehicle, pagination } = require("../controller/vehicleDetailController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
router.use(validateToken);

router.post("/create",createVehicle);
router.post("/bulkCreate",bulkInsertVehicle);
router.get("/vehicleDetails",getVehicle);
router.get("/getAllVehicle",getAllVehicle);
router.get("/getPaginatedVehicle",pagination);
router.put("/updateVehicleDetails",updateVehicle);
router.delete("/deleteVehicleDetails",deleteVehicle);


module.exports = router
