const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();  

const port = process.env.PORT || 5555;

app.use(express.json());
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/vehicle",require("./routes/vehicleRoute"));
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
