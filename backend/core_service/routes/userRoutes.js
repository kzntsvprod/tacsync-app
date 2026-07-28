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
router.post('/user/email', userController.verifyEmail);
router.delete('/profile', verifyToken, userController.deleteUser);
router.patch('/profile/password', verifyToken, userController.changePassword);
router.patch('/profile/email', verifyToken, userController.changeEmail);
router.patch('/profile/avatar', verifyToken, userController.changeAvatar);

//STEAM

//Log in через Steam

router.get(
   '/steam/login',
   passport.authenticate('steam-login', { session: false })
);

router.get(
   '/steam/login/return',
   passport.authenticate('steam-login', {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login`,
   }),
   userController.steamLoginCallback
);

//Sing in через Steam

router.get(
   '/steam/register',
   passport.authenticate('steam-register', { session: false })
);

router.get(
   '/steam/register/return',
   passport.authenticate('steam-register', {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login`,
   }),
   userController.steamRegisterCallback
);

router.post('/complete-steam', userController.completeSteamRegistration);
module.exports = router;
