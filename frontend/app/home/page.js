"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import AuthPage from "../auth/page";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [isClient, setIsclient] = useState(false);
  useEffect(() => {
    setIsclient(true);
  });

  return (
    <div>
      {user
        ? isClient && (
            <div>
              <p>{`${user?.email}`}</p>{" "}
            </div>
          )
        : isClient && <AuthPage />}
    </div>
  );
};
export default HomePage;
