const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected via Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

module.exports = { connectToMongo };
