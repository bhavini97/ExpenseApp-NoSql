const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  isPremium: {
    type: Boolean,
    default: false,
  },

  totalExpense: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
