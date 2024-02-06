const mongose = require("mongoose");

const connectDb = async () => {
    try{
        const username = "ps9956651";
        const password = encodeURIComponent("Vivek@123");
        const dbName = "faeBike-Demo"
        const connect = await mongose.connect(`mongodb+srv://${username}:${password}@prashantcluster.s8aciy7.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        console.log("Database connected:", connect.connection.host, connect.connection.name);
    }catch(e){
        console.error(e);
        process.exit(1);
    }
};

module.exports = connectDb;