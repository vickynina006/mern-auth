import { useContext, useState } from "react";
import api from "../axios-api/axios";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";
import { useOtp } from "../utils/otpLogic";
import { useNavigate } from "react-router-dom";
// import OtpForm from "../components/otpForm";

const VerifyEmail = () => {
  const { getUserData } = useContext(userContext);
  const navigate = useNavigate();

  const { handleInput, handleKeyDown, inputRefs, handlePaste } = useOtp();
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const otpArray = inputRefs.current.map((ref) => ref.value);
    const otp = otpArray.join("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/verify-email", { otp });
      if (res.status === 200) {
        toast.success(res.data.message);
        getUserData();
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.messages || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-400 flex justify-center px-2 smx:px-8 md:px-0">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg h-fit mt-44 flex-col space-y-8 items-center bg-slate-900 md:mt-40 md:p-10 md:w-[43%] lg:w-[34%] xl:w-[25%]"
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-2xl max-w-full">Email Verification</h1>
          <p className="text-center text-slate-300">
            Please verify your email address to continue.
          </p>
        </div>

        <div className="flex justify-center gap-2 w-full" onPaste={handlePaste}>
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
                className="bg-slate-700 rounded-sm w-6 h-6 text-center smx:w-7 smx:h-7 md:w-8 md:h-8"
              />
            ))}
        </div>

        <button className="bg-linear-to-r w-full from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full">
          Verify email
        </button>
      </form>
    </div>

    // <OtpForm
    //   title="Email Verification"
    //   description="Please verify your email address to continue."
    //   buttonText="Verify email"
    //   onPaste={handlePaste}
    //   onSubmit={handleSubmit}
    //   onKeyDown={(e) => handleKeyDown(e, i)}
    //   onInput={(e) => handleInput(e, i)}
    //   ref={(el) => (inputRefs.current[i] = el)}
    //   s
    // />
  );
};

export default VerifyEmail;
