const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const forgotPasswordRequestSchema = new mongoose.Schema({
  _id: {
    type: String, // UUID as string
    default: uuidv4,
  },
  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const ForgotPasswordRequest = mongoose.model('ForgotPasswordRequest', forgotPasswordRequestSchema);

module.exports = ForgotPasswordRequest;
