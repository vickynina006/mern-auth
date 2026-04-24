import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";
import api from "../axios-api/axios";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login = () => {
  const [isLogin, setIslogin] = useState("login");

  const schema = isLogin === "login" ? loginSchema : registerSchema;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { getUserData } = useContext(userContext);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      if (isLogin === "login") {
        const { email, password } = formData;

        const { data } = await api.post("/api/auth/login", {
          email,
          password,
        });

        await getUserData();
        navigate("/");

        toast.success(data.message);
      } else {
        const { data } = await api.post("/api/auth/register", formData);
        setIslogin("login");

        toast.success(data.message);
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
  }

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center px-2 smx:px-8 md:px-0">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-lg h-fit mt-44 flex-col space-y-6 items-center bg-slate-900 md:mt-40 md:p-10 md:w-[45%] lg:w-[36%] xl:w-[27%]"
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-2xl max-w-full">
            {isLogin === "login" ? "Login" : "Create account"}
          </h1>
          <p className="text-center">
            {isLogin === "login"
              ? "Please log in to your account"
              : "Create a new account"}
          </p>
        </div>

        {isLogin !== "login" && (
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
        <div>
          {" "}
          <input
            type="text"
            placeholder="email"
            {...register("email")}
            className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          {" "}
          <input
            type="password"
            placeholder="password"
            {...register("password")}
            className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {isLogin === "login" && (
            <Link to="/reset-password" className="text-sm text-amber-500 ">
              forgot password?
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          {" "}
          <button
            className={`hover:bg-amber-600 bg-linear-to-r w-full from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full ${
              isSubmitting || !isValid
                ? "cursor-not-allowed "
                : " cursor-pointer"
            }`}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting
              ? "Loading..."
              : isLogin === "login"
                ? "Login"
                : "Register"}
          </button>
        </div>

        <div className="flex gap-2 justify-center">
          <p className="text-sm">
            {isLogin === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <a
            className="text-sm text-amber-500 cursor-pointer"
            onClick={() =>
              setIslogin(isLogin === "login" ? "register" : "login")
            }
          >
            {isLogin === "login" ? "Register" : "Login"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
