const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
   const authHeader = req.header('Authorization');

   if (!authHeader) {
      return res
         .status(403)
         .json({ message: 'Доступ заборонено. Токен відсутній.' });
   }

   try {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
   } catch (err) {
      return res
         .status(401)
         .json({ message: 'Недійсний або прострочений токен' });
   }
};
