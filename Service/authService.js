require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users"); 

const SECRET_KEY = process.env.JWT_SECRET_KEY;

/**
 * Register a new user
 */
async function addUser(username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields required");
  }

  try {
    
    // Create user only if the email doesn't exist
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists with the same email");
    }
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;

  } catch (err) {
    throw err;
  }
}

/**
 * Login an existing user
 */
async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("All fields required");
  }

  const user = await User.findOne({ email } );

  if (!user) {
    throw new Error("User not found");
  }

  // Verify password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id}, SECRET_KEY);
  return { token, userId: user._id };
}

module.exports = { addUser, loginUser };
