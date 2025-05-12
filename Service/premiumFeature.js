const  Expense  = require("../models/expense");
const User = require("../models/users");
const FileDownload = require("../models/fileDownload");
/**
 * Retrieve expenses for a premium user with pagination.
 */
async function getExpenses(userId, page, limit) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const skip = (page - 1) * limit;

  const [expenses, total] = await Promise.all([
    Expense.find({ userId }).skip(skip).limit(limit).lean(),
    Expense.countDocuments({ userId }),
  ]);

  return {
    total,
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit),
    expenses,
  };
}

/**
 * Fetches leaderboard sorted by total expense.
 */
async function getLeaderboard(userId) {
  const user = await User.findById(userId);
  if (!user || !user.isPremium) {
    throw new Error("Access denied. Premium users only.");
  }

    const leaderboard = await User.find({}, "username totalExpense")
    .sort({ totalExpense: -1 })
    .lean();

  return leaderboard;
}

/**
 * Fetches user details including premium status.
 */
async function getUserDetails(userId) {
  if (!userId) throw new Error("User ID is missing!");

  const user = await User.findById(userId, "isPremium");
  if (!user) throw new Error("User not found!");

  return { isPremium: user.isPremium };
}

/**
 * Fetches list of downloaded files by a user.
 */
async function getDownloadedFiles(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  return await FileDownload.find({ userId })
    .sort({ downloadedAt: -1 })
    .lean();
}


module.exports = { getExpenses , getLeaderboard, getUserDetails,getDownloadedFiles};
