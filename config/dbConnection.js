const mongoose = require('mongoose');
const dotenv = require('dotenv');


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to ",connect.connection.name ,"and the host is ", connect.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;