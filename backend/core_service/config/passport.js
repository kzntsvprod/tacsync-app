const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

const verifyCallback = async (identifier, profile, done) => {
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
};

passport.use(
   'steam-login',
   new SteamStrategy(
      {
         returnURL: `${process.env.BACKEND_URL}/api/users/steam/login/return`,
         realm: `${process.env.BACKEND_URL}/`,
         apiKey: process.env.STEAM_API_KEY,
      },
      verifyCallback
   )
);

passport.use(
   'steam-register',
   new SteamStrategy(
      {
         returnURL: `${process.env.BACKEND_URL}/api/users/steam/register/return`,
         realm: `${process.env.BACKEND_URL}/`,
         apiKey: process.env.STEAM_API_KEY,
      },
      verifyCallback
   )
);

passport.use(
   'steam-link',
   new SteamStrategy(
      {
         returnURL: `${process.env.BACKEND_URL}/api/users/steam/link/return`,
         realm: `${process.env.BACKEND_URL}/`,
         apiKey: process.env.STEAM_API_KEY,
      },
      verifyCallback
   )
);
