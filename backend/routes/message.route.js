const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const router = express.Router()
const {getUsers , getMessages , sendMessage} = require('../controllers/message.controller');
 
router.get('/users' , protectRoute , getUsers)
router.get('/:id' , protectRoute , getMessages)
router.post('/send/:id' , protectRoute , sendMessage)

module.exports = router; 