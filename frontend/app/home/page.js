"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import AuthPage from "../auth/page";
import { useEffect, useState } from "react";
import Nav from "../components/navBar/NavBar";
import DataGridUsers from "@/app/components/DataGridUsers";

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
              <Nav />
              <DataGridUsers />
            </div>
          )
        : isClient && <AuthPage />}
    </div>
  );
};
export default HomePage;
