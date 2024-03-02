"use client";
import { LOGIN_USER } from "@/lib/constants";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthtokens] = useState(null);
  const loginUser = async (e) => {
    e.preventDefault();
    console.log("form submited");
    console.log(e.target.username.value);
    console.log(e.target.password.value);

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
    console.log(data);
  };
  const contextData = {
    loginUser: loginUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
