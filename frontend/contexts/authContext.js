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

  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();
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

    if (response.ok) {
      const decode = jwtDecode(data.access_token);
      setAuthTokens(data);
      setUser(decode);
      localStorage.setItem("authTokens", JSON.stringify(data));

      router.push("/home");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    router.push("/login");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
