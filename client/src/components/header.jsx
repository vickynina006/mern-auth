import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import api from "../axios-api/axios";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser, getUserData } =
    useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      navigate("/verify-email");
      const res = await api.post("/api/auth/send-verify-otp");
      getUserData();
      if (res.status === 200) {
        toast.success(res.data.message);
      }
      return toast.error(res.data.message);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  }

  return (
    <>
      <header className="py-6 px-4 bg-gray-800 text-white flex items-center justify-between smx:px-9 md:px-16 relative">
        <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
          ACCTS&<span className="text-amber-300">PARTNERS</span>
        </h1>
        <nav className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <div className="relative group flex gap-4">
              <span className="h-10 w-10 flex justify-center items-center rounded-full bg-amber-500">
                {user?.name[0]?.toUpperCase()}
              </span>
              <ul className="flex-col gap-4 hidden group-hover:flex absolute top-10 right-0 bg-gray-800 p-4 rounded">
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
              className="px-5 py-2 outline-1 outline-white rounded-full hover:bg-gray-700"
            >
              Login
            </Link>
          )}
        </nav>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-gray-800 text-white p-6">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <ul className="mt-12 space-y-4">
              {isAuthenticated ? (
                <>
                  <li className="flex items-center gap-2">
                    <span className="h-10 w-10 flex justify-center items-center rounded-full bg-amber-500">
                      {user?.name[0]?.toUpperCase()}
                    </span>
                    <span>{user?.name}</span>
                  </li>
                  {!user?.isVerified && (
                    <li
                      onClick={() => {
                        handleVerification();
                        setIsMenuOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                    >
                      Verify Email
                    </li>
                  )}
                  <li
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
