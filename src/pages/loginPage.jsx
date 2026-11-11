
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {

    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user/login",
        {
          email: email.trim(),
          password: password
        }
      );

      console.log("Login successful", response.data);

      toast.success("Login successful!");

      localStorage.setItem("token", response.data.token);

      const user = response.data.user;

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {

      console.log("Login Failed:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="w-full min-h-screen bg-[url(/Login-bg.jpg)] bg-cover bg-center flex justify-center items-center p-4 relative">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-[430px] min-h-[500px] bg-red-950/30 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col justify-center items-center p-7">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-10 tracking-wide">
          Login Your Account
        </h1>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center"
        >

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full h-[50px] px-4 mb-5 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-[50px] px-4 mb-7 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-red-700 hover:bg-red-600 disabled:bg-gray-600 rounded-xl text-white font-bold text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 cursor-pointer"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-gray-300 text-xs mt-8 text-center">

          Don't have an account yet?

          <Link
            to="/register"
            className="text-red-500 hover:text-red-400 font-bold ml-1 transition"
          >
            Register Now
          </Link>

        </p>

      </div>

    </div>
  );
}
