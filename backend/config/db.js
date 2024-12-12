const mongoose = require("mongoose")
require('dotenv').config({path:'./config/.env'})

const connectDB = async (db) => {
    try{        
        await mongoose.connect(
            process.env.MONGO_URI,
            {serverSelectionTimeoutMS: 5000},
            {dbName: db}
        )
        console.log("Data base connected successfully")
        return true        
    } catch (err) {
        console.error("Data base connection error: ", err)
        return false
    }
}

const closeDB = async () => {
    await mongoose.connection.close()
    console.log("Data base connection closed")
}

module.exports = {connectDB, closeDB}