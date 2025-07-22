const express = require('express');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const app = express()
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 3000 || process.env.PORT
const connectDB = require('./lib/db');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}))
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth' , authRoutes)
app.use('/api/messages' , messageRoutes)

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});