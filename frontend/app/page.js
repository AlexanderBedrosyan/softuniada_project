"use client";
import RegistrationForm from "./components/forms/registrationForm";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RegistrationForm />
    </main>
  );
}
