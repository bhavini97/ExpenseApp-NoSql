const authService = require("../Service/authService");
const path = require("path");
module.exports = {

  getSignUpPage: async(req,res)=>{
   return res.sendFile(path.join(__dirname, "..", "public", "form.html"));
  },

  getLoginPage: async(req,res)=>{
    return res.sendFile(path.join(__dirname, "..", "public", "login.html"));
  },

  addUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await authService.addUser(username, email, password);
      return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      console.error("Error registering user:", err);
      return res.status(400).json({ message: err.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token } = await authService.loginUser(email, password);
      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error("Error logging in:", err);
      return res.status(400).json({ message: err.message });
    }
  },
};
