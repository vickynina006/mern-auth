import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import api from "../axios-api/axios";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, getUserData } = useContext(userContext);
  async function handleLogout() {
    try {
      await api.post("/api/auth/logout");
      // setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  async function handleVerification() {
    try {
      const res = await api.post("/api/auth/send-verify-otp");
      getUserData();
      if (res.status === 200) {
        navigate("/verify-email");
        toast.success(res.data.message);
      }
      return res.data.message;
    } catch (err) {
      console.error("Verification failed:", err);
    }
  }

  return (
    <header className="py-6 px-10 bg-gray-800 text-white flex items-center justify-between md:px-16">
      <h1 className="text-2xl font-bold">
        ACCOUNTS&<span className="text-amber-300">PARTNERS</span>
      </h1>
      <nav className="flex space-x-4">
        {isAuthenticated ? (
          <div className="relative group flex gap-4">
            <span className=" h-10 w-10 flex justify-center items-center rounded-full bg-amber-500">
              {user?.name[0].toUpperCase()}
            </span>
            <ul className=" flex-col gap-4 hidden group-hover:flex absolute top-10 right-0 bg-gray-800 p-4 rounded">
              <li onClick={handleLogout} className="cursor-pointer">
                Logout
              </li>
              {!user?.isVerified && (
                <li onClick={handleVerification} className="cursor-pointer">
                  Verify
                </li>
              )}
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 outline-1 outline-white rounded-full hover:bg-gray-700 "
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
