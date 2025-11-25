import db from "../models/index.js";

const { User } = db;

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // ✅ check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // ✅ Normally: generate reset token + send email with nodemailer
    // For now: simple success response
    return res
      .status(200)
      .json({ message: "📩 Password reset link sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
