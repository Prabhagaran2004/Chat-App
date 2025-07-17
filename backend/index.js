const express = require('express');
const authRoutes = require('./routes/auth.route');
const app = express()
const dotenv = require('dotenv');
const PORT = 3000 || process.env.PORT
const connectDB = require('./lib/db');



dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth' , authRoutes)

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});