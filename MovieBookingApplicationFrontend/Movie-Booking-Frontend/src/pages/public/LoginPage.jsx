import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Input from "../../components/Input";
import { loginApi } from "../../api/authApi";
import { AuthUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const glowRef = useRef(null);
  const navigate = useNavigate();
  const { login } = AuthUser();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!glowRef.current) return;

    gsap.fromTo(
      ".glow-bg",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, repeat: -1, yoyo: true }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form);
      const res = await loginApi(form);
      console.log(res);
      login(res.data.jwtToken, res.data.user);

      if (res.roles === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div ref={glowRef} className="relative py-10">
      <div className="absolute inset-0 glow-bg bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.25),transparent_60%)]" />

      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome Back
        </motion.h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter your name"
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#e50914] rounded-lg text-white font-semibold hover:bg-[#e50914]/90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#e50914] cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
