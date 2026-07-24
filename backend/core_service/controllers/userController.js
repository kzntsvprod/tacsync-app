const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const axios = require('axios');

const SECRET_KEY = process.env.JWT_SECRET;
const STEAM_KEY = process.env.STEAM_API_KEY;

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
         <div style="background-color: #000000; padding: 60px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 480px; margin: 0 auto; background-color: #050505; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
               
               <!-- Логотип / Назва -->
               <div style="margin-bottom: 32px; font-weight: 700; font-size: 16px; letter-spacing: 3px; color: #ffffff;">
                  TACSYNC
               </div>

               <!-- Стилізований бейдж -->
               <div style="display: inline-block; padding: 6px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 10px; font-weight: 600; letter-spacing: 0.15em; color: #a0a0a0; text-transform: uppercase; margin-bottom: 24px;">
                  Security System
               </div>

               <!-- Заголовок -->
               <h1 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 500; letter-spacing: -0.5px; color: #ffffff;">
                  Авторизація
               </h1>

               <!-- Опис -->
               <p style="margin: 0 0 32px 0; color: #888888; font-size: 15px; line-height: 1.6; font-weight: 300;">
                  Використайте цей одноразовий код для входу в систему. Нікому не передавайте ці дані.
               </p>

               <!-- Блок з кодом (імітація віджета) -->
               <div style="background: linear-gradient(145deg, #0a0a0c, #050505); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; margin-bottom: 32px;">
                  <div style="font-size: 46px; font-weight: 400; letter-spacing: 16px; color: #ffffff; text-align: center; margin-right: -16px;">
                     ${otpCode}
                  </div>
               </div>

               <!-- Футер листа -->
               <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
                  <p style="margin: 0 0 8px 0; color: #555555; font-size: 12px; font-weight: 300;">
                     Код дійсний протягом <span style="color: #888888;">5 хвилин</span>.
                  </p>
                  <p style="margin: 0; color: #444444; font-size: 12px; font-weight: 300;">
                     Якщо ви не робили цей запит, просто проігноруйте цей лист.
                  </p>
               </div>

            </div>
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

exports.sendResetOtp = async (req, res) => {
   try {
      const { email } = req.body;

      console.log(email);

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
         return res.status(404).json({ message: 'Користувача не знайдено' });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      otpStore.set(email, {
         code: otpCode,
         expiresAt: Date.now() + 5 * 60 * 1000,
      });

      const emailHtml = `
         <div style="background-color: #000000; padding: 60px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
            <div style="max-width: 480px; margin: 0 auto; background-color: #050505; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
               
               <!-- Логотип / Назва -->
               <div style="margin-bottom: 32px; font-weight: 700; font-size: 16px; letter-spacing: 3px; color: #ffffff;">
                  TACSYNC
               </div>

               <!-- Стилізований бейдж -->
               <div style="display: inline-block; padding: 6px 14px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 10px; font-weight: 600; letter-spacing: 0.15em; color: #a0a0a0; text-transform: uppercase; margin-bottom: 24px;">
                  Security System
               </div>

               <!-- Заголовок -->
               <h1 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 500; letter-spacing: -0.5px; color: #ffffff;">
                  Відновлення пароля
               </h1>

               <!-- Опис -->
               <p style="margin: 0 0 32px 0; color: #888888; font-size: 15px; line-height: 1.6; font-weight: 300;">
                  Використайте цей одноразовий код для відновлення пароля в системі. Нікому не передавайте ці дані.
               </p>

               <!-- Блок з кодом (імітація віджета) -->
               <div style="background: linear-gradient(145deg, #0a0a0c, #050505); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; margin-bottom: 32px;">
                  <div style="font-size: 46px; font-weight: 400; letter-spacing: 16px; color: #ffffff; text-align: center; margin-right: -16px;">
                     ${otpCode}
                  </div>
               </div>

               <!-- Футер листа -->
               <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
                  <p style="margin: 0 0 8px 0; color: #555555; font-size: 12px; font-weight: 300;">
                     Код дійсний протягом <span style="color: #888888;">5 хвилин</span>.
                  </p>
                  <p style="margin: 0; color: #444444; font-size: 12px; font-weight: 300;">
                     Якщо ви не робили цей запит, просто проігноруйте цей лист.
                  </p>
               </div>

            </div>
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

exports.verifyAndRegister = async (req, res) => {
   const { steamId } = req.body;

   const steamIdRegex = /^7656119[0-9]{10}$/;
   const STEAM_API_URL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${steamId}`;

   if (!steamIdRegex.test(steamId)) {
      return res.status(400).json({
         message:
            'Невірний формат Steam ID. Це має бути число з 17 цифр (SteamID64).',
      });
   }

   try {
      const response = await axios.get(STEAM_API_URL);
      const players = response.data.response.players;

      if (players.length === 0) {
         return res.status(404).json({
            message: 'Акаунт Steam з таким ID не знайдено.',
         });
      }

      res.status(200).json({ message: 'Steam ID дійсний!' });
   } catch (error) {
      console.error('Помилка Steam API:', error);
      res.status(500).json({
         message: 'Помилка перевірки Steam ID на сервері.',
      });
   }
};

exports.register = async (req, res) => {
   try {
      const { nickname, email, password, otp } = req.body;

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

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!passwordRegex.test(password)) {
         return res.status(400).json({
            message:
               'Пароль занадто простий! Має бути від 8 символів, містити хоча б одну велику та одну маленьку літеру.',
         });
      }

      const newUser = new User({ nickname, email, password });
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

exports.resetPassword = async (req, res) => {
   try {
      const { email, otp, newPassword } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: 'Користувача не знайдено' });
      }

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

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!passwordRegex.test(newPassword)) {
         return res.status(400).json({
            message:
               'Новий пароль занадто простий! Має бути від 8 символів, містити хоча б одну велику та одну маленьку літеру.',
         });
      }

      user.password = newPassword;

      await user.save();

      res.status(200).json({ message: 'Пароль успішно вдновлено' });
   } catch (error) {
      console.error('Помилка зміни пароля:', error);
      res.status(500).json({ message: 'Помилка сервера під час зміни пароля' });
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
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      );

      res.json({
         token,
         user: {
            _id: user._id,
            nickname: user.nickname,
            email: user.email,
            avatar: user.avatar,
            steam_id: user.steam_id,
            level: user.level,
            reputation: user.reputation,
            synergy: user.synergy,
         },
      });
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

exports.deleteUser = async (req, res) => {
   try {
      const user = await User.findByIdAndDelete(req.user.userId);

      if (!user)
         return res.status(404).json({ message: 'Користувача не знайдено' });

      res.status(200).json({ message: 'Користувача успішно видалено' });
   } catch (error) {
      res.status(500).json({ message: 'Помилка видалення користувача' });
   }
};

exports.changePassword = async (req, res) => {
   try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
         return res
            .status(400)
            .json({ message: 'Будь ласка, введіть старий та новий пароль' });
      }

      const user = await User.findById(req.user.userId);
      if (!user) {
         return res.status(404).json({ message: 'Користувача не знайдено' });
      }

      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
         return res.status(400).json({ message: 'Невірний старий пароль' });
      }

      if (oldPassword === newPassword) {
         return res
            .status(400)
            .json({ message: 'Новий пароль має відрізнятися від старого' });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!passwordRegex.test(newPassword)) {
         return res.status(400).json({
            message:
               'Новий пароль занадто простий! Має бути від 8 символів, містити хоча б одну велику та одну маленьку літеру.',
         });
      }

      user.password = newPassword;

      await user.save();

      res.status(200).json({ message: 'Пароль успішно змінено' });
   } catch (error) {
      console.error('Помилка зміни пароля:', error);
      res.status(500).json({ message: 'Помилка сервера під час зміни пароля' });
   }
};

exports.changeEmail = async (req, res) => {
   try {
      const { password, newEmail } = req.body;

      if (!password || !newEmail) {
         return res
            .status(400)
            .json({ message: 'Будь ласка, введіть пароль та новий Email' });
      }

      const user = await User.findById(req.user.userId);
      if (!user) {
         return res.status(404).json({ message: 'Користувача не знайдено' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Невірний пароль' });
      }

      if (user.email === newEmail.toLowerCase().trim()) {
         return res
            .status(400)
            .json({ message: 'Новий Email збігається з поточним' });
      }

      const emailExists = await User.findOne({
         email: newEmail.toLowerCase().trim(),
      });
      if (emailExists) {
         return res
            .status(400)
            .json({ message: 'Цей Email вже використовується іншим акаунтом' });
      }

      user.email = newEmail.toLowerCase().trim();
      await user.save();

      res.status(200).json({
         message: 'Email успішно змінено',
         email: user.email,
      });
   } catch (error) {
      console.error('Помилка зміни email:', error);
      res.status(500).json({ message: 'Помилка сервера під час зміни Email' });
   }
};

exports.changeAvatar = async (req, res) => {
   try {
      const { avatar } = req.body;

      if (!avatar) {
         return res.status(400).json({ message: 'Зображення не передано' });
      }

      if (!avatar.startsWith('data:image/jpeg;base64,')) {
         return res.status(400).json({
            message: 'Недопустимий формат! Можна завантажувати лише JPEG.',
         });
      }

      const base64Data = avatar.replace(/^data:image\/jpeg;base64,/, '');

      const buffer = Buffer.from(base64Data, 'base64');
      const fileSizeInBytes = buffer.byteLength;

      if (fileSizeInBytes > 2 * 1024 * 1024) {
         return res.status(400).json({
            message: 'Файл занадто великий! Максимальний розмір 2 МБ.',
         });
      }

      const user = await User.findById(req.user.userId);

      if (!user) {
         return res.status(404).json({ message: 'Користувача не знайдено' });
      }

      user.avatar = avatar;
      await user.save();

      res.status(200).json({
         message: 'Аватарку успішно оновлено',
         avatar: user.avatar,
      });
   } catch (error) {
      console.error('Помилка оновлення аватарки:', error);
      res.status(500).json({
         message: 'Помилка сервера під час збереження аватарки',
      });
   }
};
