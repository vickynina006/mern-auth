import { createContext, useEffect } from "react";
import { useState } from "react";
import api from "../axios-api/axios";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function getUserData() {
    try {
      const res = await api.get("/api/userdata");
      if (res.status === 200) {
        setUser(res.data);
      }

      return res.data.message;
    } catch (err) {
      console.log("error getting user data:", err.message);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  // useEffect(() => {
  //   async function getAuthState() {
  //     axios.defaults.withCredentials = true;
  //     try {
  //       await api.get("/api/auth/is-auth");
  //       getUserData();
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //       console.log("error", err.response);
  //     }
  //   }
  //   getAuthState();
  // }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        getUserData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
