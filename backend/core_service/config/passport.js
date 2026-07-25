const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const User = require('../models/User'); // Вкажіть правильний шлях до вашої моделі

passport.use(
   new SteamStrategy(
      {
         returnURL: `${process.env.BACKEND_URL}/api/users/steam/return`,
         realm: `${process.env.BACKEND_URL}/`,
         apiKey: process.env.STEAM_API_KEY,
      },
      async (identifier, profile, done) => {
         try {
            const steamId = profile.id;
            let user = await User.findOne({ steam_id: steamId });

            if (!user) {
               user = new User({
                  steam_id: steamId,
                  nickname: profile.displayName,
                  avatar: profile.photos[2] ? profile.photos[2].value : '',
               });
               await user.save();
            }

            return done(null, user);
         } catch (error) {
            console.error('Помилка Steam Strategy:', error);
            return done(error, false);
         }
      }
   )
);
