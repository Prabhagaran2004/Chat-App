const express = require('express');
const { signup, login , logout , updateProfile , checkAuth } = require('../controllers/auth.controller');
const { protectRoute } = require('../middleware/auth.middleware');
const router = express.Router()

router.post('/signup' , signup)
router.post('/login' , login)
router.post('/logout' , logout)
router.put('/profile' , protectRoute , updateProfile)
router.get('/check-auth', protectRoute, checkAuth);

module.exports = router;