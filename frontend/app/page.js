"use client";
import RegistrationForm from "./components/forms/registrationForm";
import { NextUIProvider } from "@nextui-org/system";
// import {useSession}
// const {data, status} = useSession()
// if (status == authenticated) {
// redirect to homepage  
} 
export default function Home() {
  return (
    <main className="">
      <RegistrationForm />
    </main>
  );
}
