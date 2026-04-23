import { useState } from "react";
import { useOtp } from "../utils/otpLogic";
import api from "../axios-api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emailSchema, newPasswordSchema } from "../validation/authSchema";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = step === "email" ? emailSchema : newPasswordSchema;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { handleInput, handleKeyDown, inputRefs, handlePaste } = useOtp();

  const handleEmailSubmit = async (data) => {
    if (isSubmitting) return;

    try {
      const res = await api.post("/api/auth/send-reset-otp", {
        email: data.email,
      });

      if (res.status === 200) {
        setEmail(data.email);
        toast.success(res.data.message);
        setStep("otp");
      }
    } catch (err) {
      const backendError = err.response?.data?.errors;

      if (backendError) {
        backendError.forEach((error) => {
          setError(error.field, { message: error.message });
        });
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const otpArray = inputRefs.current.map((ref) => ref.value);
    const otpValue = otpArray.join("");
    setOtp(otpValue);
    setStep("newPassword");
  };

  const handlePasswordReset = async (data) => {
    if (isSubmitting) return;

    try {
      const res = await api.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword: data.newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      const backendError = err.response?.data?.errors;

      if (backendError) {
        backendError.forEach((error) => {
          setError(error.field, { message: error.message });
        });
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center px-2 smx:px-8 md:px-0">
      {step === "email" && (
        <PasswordResetForm
          title="Password Reset Email"
          description="Please enter your registered email id"
          name="email"
          placeholder="Email"
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleEmailSubmit)}
          isSubmitting={isSubmitting}
        />
      )}

      {step === "otp" && (
        <form
          onSubmit={handleOtpSubmit}
          className="p-8 rounded-lg h-fit mt-44 flex flex-col space-y-8 items-center bg-slate-900 md:mt-40 md:p-10 md:w-[43%] lg:w-[34%] xl:w-[25%]"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-center text-2xl">
              Password Reset OTP
            </h1>
            <p className="text-center text-slate-300">
              Please input the 6-digit OTP sent to your email.
            </p>
          </div>

          <div
            className="flex justify-center gap-2 w-full"
            onPaste={handlePaste}
          >
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[i] = el)}
                  required
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onInput={(e) => handleInput(e, i)}
                  className="bg-slate-700 rounded-sm w-6 h-6 text-center md:w-8 md:h-8"
                />
              ))}
          </div>

          <button className="w-full py-1.5 px-8 rounded-full text-white bg-linear-to-r from-amber-500 to-amber-700 disabled:opacity-50">
            Verify OTP
          </button>
        </form>
      )}

      {step === "newPassword" && (
        <PasswordResetForm
          title="Password Reset"
          description="Please enter your new password"
          name="newPassword"
          placeholder="New Password"
          type="password"
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handlePasswordReset)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default ResetPassword;

export function PasswordResetForm({
  title,
  description,
  type = "text",
  placeholder,
  name,
  register,
  errors,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-8 rounded-lg h-fit mt-44 flex flex-col space-y-8 items-center bg-slate-900 md:p-10 md:w-[43%] lg:w-[34%] xl:w-[25%]"
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-center text-2xl">{title}</h1>
        <p className="text-center text-slate-300">{description}</p>
      </div>

      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
        />

        {errors?.[name] && (
          <p className="text-red-400 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="w-full py-1.5 px-8 rounded-full text-white bg-linear-to-r from-amber-500 to-amber-700"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
