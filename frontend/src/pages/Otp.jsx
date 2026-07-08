import { useState } from "react";
import { toast } from "react-toastify";
import AuthOtpPanel from "../components/auth/AuthOtpPanel";
import LoginPage from "./Login";
import { useShop } from "../context/ShopContext";

export default function OtpPage() {
  const { auth, verifyOtp } = useShop();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  if (!auth.pendingEmail) {
    return (
      <LoginPage message="Sign in first so we can send you to OTP verification." />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const cleanCode = code.trim();

    if (!cleanCode) {
      const message = "Please enter your OTP code.";
      setError(message);
      toast.error(message);
      return;
    }

    if (cleanCode.length < 4) {
      const message = "Your OTP code looks too short.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!verifyOtp(cleanCode)) {
      const message = "That code does not match. Enter 2026 for this local build.";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("Your Tell20 account is now active on this device.");
  };

  return (
    <AuthOtpPanel
      code={code}
      error={error}
      onCodeChange={(value) => {
        setCode(value);
        if (error) setError("");
      }}
      onSubmit={handleSubmit}
      pendingEmail={auth.pendingEmail}
    />
  );
}