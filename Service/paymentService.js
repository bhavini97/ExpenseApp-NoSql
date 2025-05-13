const User = require("../models/users");
const Order = require("../models/orders");
const cashfreeService = require("../Service/cashfreeService");

/**
 * Create a payment order and return session ID.
 */
async function createPaymentOrder(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const orderId = `ORDER_${Date.now()}`; // Generate unique order ID

  // Getting service id from cashfree services file
  const paymentSessionId = await cashfreeService.createOrder(orderId, userId);

  await Order.create({
    order_id: orderId,
    user_id: userId,
    status: "PENDING",
  });

  return { paymentSessionId, orderId };
}

/**
 * Get payment status and update order/user status accordingly.
 */
async function getPaymentStatus(orderId) {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  try {
    // Fetching order status from Cashfree service
    const order_status = await cashfreeService.getPaymentStatus(orderId);
    console.log(order_status);

    if (!order_status) {
      throw new Error(
        "Error while retrieving order status from CashfreeService"
      );
    }

    if (order_status !== "PENDING") {
      const order = await Order.findOne({ order_id: orderId });
      if (!order) {
        throw new Error("Order not found");
      }

      // Update premium status of the user only if order is successful
      if (order_status === "SUCCESS") {
        await User.findByIdAndUpdate(order.user_id, { isPremium: true });
        console.log(`User ${order.user_id} is now premium`);
      }

      // Update order status in the Order table
      const result = await Order.updateOne(
        { order_id: orderId },
        { status: order_status }
      );

      if (result.nModified > 0) {
        console.log("Order status updated successfully");
      } else {
        throw new Error(
          "Payment successful but encountered error while changing order status in database"
        );
      }

      return  order_status;
    }
    return  order_status
    
  } catch (err) {
    throw err;
  }
}

module.exports = { createPaymentOrder, getPaymentStatus };
