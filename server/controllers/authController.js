import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { generateOtp } from "../config/generateOtp.js";

export const register = async (req, res) => {
  const { name, email, password } = req.validatedBody;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedpassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const mailerOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Our Accounts and Partners",
      text: `Hello ${name}, Welcome to Accounts and Partners. Your account has been successfully created.`,
    };
    await transporter.sendMail(mailerOptions);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.validatedBody;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  return res.status(200).json({ message: "Logout successful" });
};

export const sendVerifyOtp = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userModel.findById(userId);
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }
    const otp = generateOtp();
    user.verifyOtp = otp;
    user.verifyOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Email",
      text: `Your verification OTP is ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;
  try {
    if (!userId || !otp) {
      return res.status(400).json({ message: "missing details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verifyOtpExpiry < Date.now()) {
      return res.status(410).json({ messsage: "Expired OTP" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ messsage: "Invalid OTP" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiry = 0;

    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    res.status(200).json({ message: "User is authenticated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.validatedBody;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Your password reset OTP is ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.validatedBody;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtpExpiry < Date.now()) {
      return res.status(410).json({ message: "Expired OTP" });
    }
    const hashedpassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedpassword;
    user.resetOtp = "";
    user.resetOtpExpiry = 0;

    await user.save();

    return res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
