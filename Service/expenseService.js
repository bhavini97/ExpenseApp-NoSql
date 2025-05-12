const Expense = require("../models/expense");
const User = require("../models/users");

// //insert expense data to expense table and Adds an expense for a user.

async function addExpense(userId, amount, category, description) {
  try {
    const expense = new Expense({ userId, amount, category, description });
    const savedExpense = await expense.save();

    // increment expense in userId
    // Update user's totalExpense
    await User.findByIdAndUpdate(userId, {
      $inc: { totalExpense: amount },
    });

    return savedExpense;
  } catch (err) {
    throw err;
  }
}

// getting all expenses
async function getExpenses(userId) {
  return await Expense.find({ userId });
}

// Delete expense and update user's totalExpense
async function deleteExpense(id) {
  try {
    console.log(id)
    const expense = await Expense.findById(id);
    if (!expense) throw new Error("Expense not found");

    // Delete the expense
    await Expense.findByIdAndDelete(id);

    // Deduct amount from user's totalExpense
    await User.findByIdAndUpdate(expense.userId, {
      $inc: { totalExpense: -expense.amount },
    });

    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = { addExpense, getExpenses, deleteExpense };
