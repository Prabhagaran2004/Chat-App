const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const cloudinary = require('../lib/cloudinary');
const {generateToken} = require('../lib/utils');

const signup = async(req , res) => {
    const { fullName , email, password } = req.body;
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({ message : " Please fill all the fields"})
        }
        
        if( password.length < 8 ) {
            return res.status(400).json({ message : "Password should be in 8 characters"})
        }
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ message : "User already exists"}) 
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password , salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPass
        });
        if(newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                message : "User created successfully"
            })
        }

    } catch (error) {
        console.log("Error in Signup Controller: ");
        
        return res.status(500).json({ message : error.message });
    }
}
const login = async(req , res) => {
    const { email , password } = req.body
    try {
        if(!email || !password){
            return res.status(400).json({ message : " Please fill all the fields"})
        }
        const user = await User.findOne({ email : email })

        if(!user){
            return res.status(400).json({ message : "User does not exists"})
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({ message : "Invalid Password"})
        }

        generateToken(user._id, res)

        return res.status(200).json({
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            message : "User logged in successfully"
        })
        
    } catch (error) {
        console.log("Error in Login Controller: " , error);
        return res.status(500).json({ message : error.message })
    }
}
const logout = async(req , res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0})
        return res.status(200).json({
            message : "User logged out successfully"
        }) 
    } catch (error) {
        console.log("Error in logout controller");
        return res.status(500).json({ error: "Something went wrong" });
    }
}
const updateProfile = async(req , res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if(!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }

        const uploadedPic = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate( userId , { profilePic : uploadedPic.secure_url }, { new: true });

        res.status(200).json({updatedUser, message: "Profile updated successfully"});
    } catch (error) {
        console.log("Error in updateProfile controller: ", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error);
        return res.status(500).json({ error: "Internal server error" });  
    }
}




module.exports = {signup , login, logout , updateProfile , checkAuth};