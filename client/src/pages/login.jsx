import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext";
import api from "../axios-api/axios";

const Login = () => {
  const [isLogin, setIslogin] = useState("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { getUserData } = useContext(userContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin === "login") {
        const { email, password } = formData;

        console.log("loginData", email, password);
        const { data } = await api.post("/api/auth/login", {
          email,
          password,
        });
        console.log(data);
        getUserData();
        // setIsAuthenticated(true);
        navigate("/");

        toast.success(data.message);
      } else {
        const { data } = await api.post("/api/auth/register", formData);
        setIslogin("login");

        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
              {isLogin === "login" ? "Login" : "Create account"}
            </h1>
            <p className="text-center">
              {isLogin === "login"
                ? "Please log in to your account"
                : "Create a new account"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="gap-5 flex flex-col">
            {isLogin !== "login" && (
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
              />
            )}
            <input
              type="text"
              placeholder="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
            />
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="outline-none bg-slate-700 rounded-full w-full px-3 py-1"
            />
            {isLogin === "login" && (
              <Link className="text-sm text-amber-500">forgot password?</Link>
            )}
            <div className="flex flex-col gap-2 ">
              {" "}
              <button className="bg-linear-to-r from-amber-500 to-amber-700 text-white py-1.5 px-8 rounded-full">
                {loading
                  ? "Loading..."
                  : isLogin === "login"
                    ? "Login"
                    : "Register"}
              </button>
            </div>
          </form>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
