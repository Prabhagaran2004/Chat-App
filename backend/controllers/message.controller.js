const Message = require("../models/message.model")
const User = require("../models/user.model")


const getUsers =  async(req , res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.findById({_id : {$ne : loggedInUser}}).select('-password')
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsers controller", error);
        return res.status(500).json({ message: "Internal Server Error" } );
    }
    
}

const getMessages = async(req , res) => {
    try {
        const { id : userChatId } = req.params
        const myId = req.user._id
        const messages =  await Message.find({
            $or : [
                {senderId : myId , receiverId : userChatId},
                {senderId : userChatId , receiverId : myId}
            ]
        }) 

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller", error);
        return res.status(500).json({ message: "Internal Server Error" } );
    }
}

const sendMessage = async(req , res) => {
    try {
        const { text , image } = req.body
        const { id : receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;

        if(image){
            const uploadedImage = await cloudinary_js_config.uploader.upload(image)
            imageUrl = uploadedImage.secure_url;
        }
        const newMessages = new Messages({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessages.save()
        res.status(200).json(newMessages)
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        return res.status(500).json({ message: "Internal Server Error" } );
    }
}

module.exports = {getUsers , getMessages , sendMessage} 
