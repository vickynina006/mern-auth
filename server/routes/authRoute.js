import express from "express";
import {
  login,
  register,
  logout,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
  isAuthenticated,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
import { validate } from "../middleware/validationAuth.js";
import {
  loginSchema,
  registerSchema,
  emailSchema,
  resetPasswordSchema,
} from "../../shared/validation/authSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-email", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", validate(emailSchema), sendResetOtp);
authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword,
);

export default authRouter;
