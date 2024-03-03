"use client";
import { jwtDecode } from "jwt-decode";
import { LOGIN_USER } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { getUserFromLocalStorage } from "@/lib/getUserFromStorage";
import { getAuthTokensFromLocalStorage } from "@/lib/getAutToken";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserFromLocalStorage());
  const [authTokens, setAuthTokens] = useState(() =>
    getAuthTokensFromLocalStorage()
  );
  const [wrongPassword, setWrongPassword] = useState();

  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${LOGIN_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle non-successful response status (e.g., 400, 401, etc.)
        throw new Error(data.message || "Login failed");
      }

      const decode = jwtDecode(data.access_token);
      setAuthTokens(data);
      setUser(decode);
      setWrongPassword(false);
      localStorage.setItem("authTokens", JSON.stringify(data));

      router.push("/home");
    } catch (error) {
      // Handle fetch or other errors
      console.error("Login failed:", error.message);
      // You might want to set some state here to indicate the error to the user
      setWrongPassword(wrongPassword);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    router.push("/log-in");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    wrongPassword: wrongPassword,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
