const express = require('express');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 3000 || process.env.PORT
const connectDB = require('./lib/db');
const cookieParser = require('cookie-parser');
const { app , server } = require('./lib/socket');

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}))
dotenv.config();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/auth' , authRoutes)
app.use('/api/messages' , messageRoutes) 

server.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});