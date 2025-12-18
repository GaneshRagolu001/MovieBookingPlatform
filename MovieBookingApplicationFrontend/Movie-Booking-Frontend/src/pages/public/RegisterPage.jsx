import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import { registerApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerApi(form);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Create Your Account
        </motion.h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter full name"
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Choose a password"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#e50914] rounded-lg text-white font-semibold hover:bg-[#e50914]/90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#e50914] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
