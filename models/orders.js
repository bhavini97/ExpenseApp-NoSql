const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },

  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILURE'],
    default: 'PENDING',
  }
}, {
  timestamps: true, 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
