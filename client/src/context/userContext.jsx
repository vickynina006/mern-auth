import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function getUserData() {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get("http://localhost:4000/api/userdata");
      setUser(data);
      console.log("userdata:", data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("error getting user data:", err.response?.data?.message);
    }
  }
  useEffect(() => {
    async function getAuthState() {
      axios.defaults.withCredentials = true;
      try {
        await axios.get("http://localhost:4000/api/auth/is-account-verified");
        getUserData();
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        console.log("error", err.response);
      }
    }
    getAuthState();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        getUserData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
