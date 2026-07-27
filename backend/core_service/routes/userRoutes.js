const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/verify', userController.verifyAndRegister);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getProfile);
router.post('/send-otp', userController.sendOtp);
router.post('/send-reset-otp', userController.sendResetOtp);
router.post('/reset-password', userController.resetPassword);
router.delete('/profile', verifyToken, userController.deleteUser);
router.patch('/profile/password', verifyToken, userController.changePassword);
router.patch('/profile/email', verifyToken, userController.changeEmail);
router.patch('/profile/avatar', verifyToken, userController.changeAvatar);
router.get('/steam', passport.authenticate('steam', { session: false }));
router.post('/complete-steam', userController.completeSteamRegistration);
router.get(
   '/steam/return',
   passport.authenticate('steam', {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login`,
   }),
   userController.steamAuthCallback
);
module.exports = router;
