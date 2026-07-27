const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

passport.use(
   new SteamStrategy(
      {
         returnURL: `${process.env.BACKEND_URL}/api/users/steam/return`,
         realm: `${process.env.BACKEND_URL}/`,
         apiKey: process.env.STEAM_API_KEY,
      },
      async (identifier, profile, done) => {
         try {
            const steamUser = {
               steam_id: profile.id,
               nickname: profile.displayName,
               avatar: profile.photos[2] ? profile.photos[2].value : '',
            };
            return done(null, steamUser);
         } catch (error) {
            console.error('Помилка Steam Strategy:', error);
            return done(error, false);
         }
      }
   )
);
