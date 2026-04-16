import { userModel } from "../models/userModel.js";
export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, isVerified } = user;
    // console.log("userdata", { name, email, isVerified });
    return res.status(200).json({ name, email, isVerified });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
