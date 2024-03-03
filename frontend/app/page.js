"use client";
import RegistrationForm from "./components/forms/registrationForm";
import { useContext } from "react";

import AuthContext from "@/contexts/authContext";
export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main>
      <RegistrationForm />
    </main>
  );
}
