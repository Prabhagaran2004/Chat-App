const mongoose = require('mongoose');


const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;