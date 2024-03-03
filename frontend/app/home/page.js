"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import AuthPage from "../auth/page";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user ? (
        <div>
          <p>{`${user?.email}`}</p>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};
export default HomePage;
