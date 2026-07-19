const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/verify', userController.verifyAndRegister);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getProfile);
router.post('/send-otp', userController.sendOtp);
router.delete('/profile', verifyToken, userController.deleteUser);
router.patch('/profile/password', verifyToken, userController.changePassword);
router.patch('/profile/avatar', verifyToken, userController.changeAvatar);
module.exports = router;
