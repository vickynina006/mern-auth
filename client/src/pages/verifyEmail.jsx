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
    <div className="min-h-screen bg-gray-400">
      {" "}
      <div className="flex justify-center px-10 py-20">
        <div className="w-full p-8 rounded-lg flex-col space-y-8 items-center bg-slate-900 md:p-10 md:w-[50%] lg:w-[30%]">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-2xl max-w-full">
              Email Verification
            </h1>
            <p className="text-center text-slate-300">
              Please verify your email address to continue.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="gap-5 flex flex-col w-full">
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
                    className=" bg-slate-700 rounded-sm w-5 h-5 text-center sm:w-7 sm:h-7 md:w-10 md:h-10"
                  />
                ))}
            </div>

            <button className="bg-linear-to-r from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full">
              Verify email
            </button>
          </form>
        </div>
      </div>
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
