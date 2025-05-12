const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // refers to the User model
    required: true,
  },
}, {
  timestamps: true, 
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
