const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const SECRET_KEY = process.env.JWT_SECRET;

const otpStore = new Map();

exports.sendOtp = async (req, res) => {
   try {
      const { email } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res
            .status(400)
            .json({ message: 'Цей email вже зареєстровано' });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      otpStore.set(email, {
         code: otpCode,
         expiresAt: Date.now() + 5 * 60 * 1000,
      });

      const emailHtml = `
         <div style="font-family: Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 40px; text-align: center; border-radius: 10px;">
            <h1 style="color: #ffffff;">TACSYNC</h1>
            <p style="color: #a0a0a0; font-size: 16px;">Ваш код для підтвердження доступу:</p>
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; display: inline-block; margin: 20px 0;">
               <h2 style="margin: 0; font-size: 32px; letter-spacing: 5px; color: #ffffff;">${otpCode}</h2>
            </div>
            <p style="color: #a0a0a0; font-size: 14px;">Код дійсний 5 хвилин.</p>
         </div>
      `;

      await sendEmail({
         email: email,
         subject: 'Код підтвердження TACSYNC',
         html: emailHtml,
      });

      res.status(200).json({ message: 'Код успішно відправлено на пошту' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Помилка при надсиланні листа' });
   }
};

exports.register = async (req, res) => {
   try {
      const { nickname, email, steam_id, password, otp } = req.body;

      const storedOtpData = otpStore.get(email);

      if (!storedOtpData) {
         return res.status(400).json({
            message:
               'Код не знайдено або термін його дії минув. Спробуйте ще раз.',
         });
      }
      if (storedOtpData.code !== otp) {
         return res.status(400).json({ message: 'Невірний код підтвердження' });
      }
      if (Date.now() > storedOtpData.expiresAt) {
         otpStore.delete(email);
         return res.status(400).json({ message: 'Час дії коду минув' });
      }

      const newUser = new User({ nickname, email, steam_id, password });
      await newUser.save();

      res.status(201).json({ message: 'Користувача успішно створено!' });
   } catch (error) {
      if (error.code === 11000) {
         return res.status(400).json({
            message: 'Користувач з таким Email або Steam ID вже існує',
         });
      }
      res.status(500).json({
         message: 'Помилка реєстрації',
         error: error.message,
      });
   }
};

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ message: 'Невірний Email або пароль' });
      }

      const token = jwt.sign(
         { userId: user._id, steam_id: user.steam_id },
         SECRET_KEY,
         { expiresIn: '24h' }
      );
      res.json({ token, nickname: user.nickname });
   } catch (error) {
      res.status(500).json({
         message: 'Помилка сервера',
         error: error.message,
      });
   }
};

exports.getProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user.userId).select('-password');
      res.json(user);
   } catch (error) {
      res.status(500).json({ message: 'Помилка отримання профілю' });
   }
};
