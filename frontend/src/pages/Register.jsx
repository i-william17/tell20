import { useState } from "react";
import { toast } from "react-toastify";
import AuthRegisterPanel from "../components/auth/AuthRegisterPanel";
import { useShop } from "../context/ShopContext";

export default function RegisterPage({ redirectTo = "/" }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });

  const { registerCustomer } = useShop();

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter.");
      return;
    }

    if (!/\d/.test(password)) {
      toast.error("Password must include at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error("Password must include at least one symbol.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!form.acceptTerms) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    const result = registerCustomer(
      {
        ...form,
        fullName,
        email,
        phone,
        password,
        confirmPassword
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
    <AuthRegisterPanel
      form={form}
      onChange={updateField}
      onSubmit={handleSubmit}
    />
  );
}