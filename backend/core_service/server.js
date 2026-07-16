require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);

const startServer = async () => {
   await connectDB();

   app.listen(PORT, () => {
      console.log(`Сервер працює на http://localhost:${PORT}`);
   });
};

startServer();
