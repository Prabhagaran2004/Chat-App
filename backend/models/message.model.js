const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receicerId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text : {
        type : String
    },
    image : {
        type : String
    }, 
}, { timestamps: true });

const Message = monoogse.model ('Message', messageSchema);

module.exports = Message;