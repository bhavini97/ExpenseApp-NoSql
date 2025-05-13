const paymentService = require("../Service/paymentService");
const path = require("path");
module.exports = {

  makePaymentPage: async(req,res)=>{
    return res.sendFile(path.join(__dirname, "..", "public", "Cashfree","payment.html"));
  },

  postPaymentOrder: async (req, res) => {
    try {
      const { paymentSessionId, orderId } = await paymentService.createPaymentOrder(req.user.userId);
      res.status(200).json({ paymentSessionId, orderId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getPaymentStatus: async (req, res) => {
    try {
      console.log("token extracted here:" , req.user.userId)
      const response = await paymentService.getPaymentStatus(req.params.orderId);
      console.log("Response:", response); 
      res.status(200).json(response);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err.message });
    }
  },
};
