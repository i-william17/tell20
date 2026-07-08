import { useState } from "react";
import { toast } from "react-toastify";
import AuthLoginPanel from "../components/auth/AuthLoginPanel";
import { useShop } from "../context/ShopContext";

export default function LoginPage({
  redirectTo = "/",
  message = "Sign in with your username and password. We will verify you with OTP next."
}) {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const { loginCustomer } = useShop();

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = form.username.trim();
    const password = form.password;

    if (!username || !password) {
      toast.error("Please enter your username and password.");
      return;
    }

    const result = loginCustomer(
      {
        username,
        password
      },
      redirectTo
    );

    if (result.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AuthLoginPanel
      form={form}
      message={message}
      onChange={updateField}
      onSubmit={handleSubmit}
    />
  );
}