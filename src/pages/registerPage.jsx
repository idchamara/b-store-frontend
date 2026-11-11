
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {

    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() ||
        !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    setLoading(true);

    try {

      const user = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password
      };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/user",
        user
      );

      console.log("Registration successful", response.data);

      toast.success("Registration successful!");

      navigate("/login");

    } catch (error) {

      console.log("Registration Failed:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="w-full min-h-screen bg-[url(/Login-bg.jpg)] bg-cover bg-center flex justify-center items-center p-4 relative">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Registration Card */}
      <div className="relative w-full max-w-[430px] min-h-[600px] bg-red-950/30 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.15)] flex flex-col justify-center items-center p-7">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">
          Registration
        </h1>

        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col items-center"
        >

          {/* First Name & Last Name */}
          <div className="w-full flex gap-3 mb-4">

            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-1/2 h-[48px] px-4 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
            />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-1/2 h-[48px] px-4 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
            />

          </div>

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full h-[48px] px-4 mb-4 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          {/* Password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full h-[48px] px-4 mb-4 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          {/* Confirm Password */}
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full h-[48px] px-4 mb-5 bg-black/20 border border-red-400/30 rounded-xl text-white placeholder-gray-300 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          />

          {/* Terms & Conditions */}
          <div className="w-full flex items-center gap-2 mb-6">

            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="accent-red-600 cursor-pointer"
            />

            <label className="text-gray-200 text-xs cursor-pointer">
              I agree to the Terms & Conditions.
            </label>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-red-700 hover:bg-red-600 disabled:bg-gray-600 rounded-xl text-white font-bold text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-gray-300 text-xs mt-7 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-red-500 hover:text-red-400 font-bold ml-1 transition"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}
