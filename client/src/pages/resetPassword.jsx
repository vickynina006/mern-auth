import { useState } from "react";
import { useOtp } from "../utils/otpLogic";

const ResetPassword = () => {
  const [otp, setOtp] = useState(0);
  const [isOtpSent, setIsOtpSEnt] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleInput, handleKeyDown, inputRefs, handlePaste } = useOtp();
  return (
    <>
      <div className="min-h-screen bg-gray-400">
        {!isEmailSent && (
          <EmailResetForm
            title="Password Reset Email"
            description="please enter your email to receive OTP"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {isEmailSent && (
          <div className="flex justify-center px-10 py-20">
            <div className="w-full p-8 rounded-lg flex-col space-y-8 items-center bg-slate-900 md:p-10 md:w-[50%] lg:w-[30%]">
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-2xl max-w-full">
                  Password Reset OTP
                </h1>
                <p className="text-center text-slate-300">
                  Please input the OTP sent to your email address to continue.
                </p>
              </div>
              <form
                //   onSubmit={handleSubmit}
                className="gap-5 flex flex-col w-full"
              >
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
        )}

        {isOtpSent && (
          <EmailResetForm
            title="Password Reset"
            description="please enter your email new password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </div>
    </>
  );
};

export default ResetPassword;

export function EmailResetForm({
  title,
  description,
  type = "text",
  name,
  onChange,
}) {
  return (
    <div className="flex justify-center px-10 py-20">
      <div className="w-full p-8 rounded-lg flex-col space-y-8 items-center bg-slate-900 md:p-10 md:w-[50%] lg:w-[30%]">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-2xl max-w-full">{title}</h1>
          <p className="text-center text-slate-300">{description}</p>
        </div>
        <form className="gap-5 flex flex-col w-full">
          <input
            type={type}
            placeholder={name}
            value={name}
            name={name}
            onChange={onChange}
            className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
          />

          <button className="bg-linear-to-r from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
