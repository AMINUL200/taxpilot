import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Login data:", formData);

        // Add your login API call here

        setIsLoading(false);

        // navigate("/dashboard");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5FCF9] via-[#EAF9F4] to-[#F8FCFA] py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#65D9BB]/20 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#087F5B]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center space-x-2 text-[#607773] hover:text-[#087F5B] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />

          <span className="font-medium">
            Back to Home
          </span>
        </button>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#DDEBE5]">

          {/* Logo and Title */}
          <div className="text-center mb-8">

            <div className="flex justify-center mb-4">

              <div className="p-3 bg-gradient-to-br from-[#087F5B] to-[#004646] rounded-2xl shadow-lg">

                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="white"
                    strokeWidth="3"
                  />

                  <path
                    d="M16 24L24 14L32 24L24 34L16 24Z"
                    fill="white"
                  />
                </svg>

              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#09263A] mb-2">
              Welcome Back
            </h2>

            <p className="text-[#687B78]">
              Sign in to continue to MySite
            </p>

          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Field */}
            <div>

              <CustomInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.email
                    ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                    : "border-[#D8E5E1] focus:ring-[#087F5B]/20 focus:border-[#087F5B]"
                }
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password Field */}
            <div>

              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className={
                  errors.password
                    ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                    : "border-[#D8E5E1] focus:ring-[#087F5B]/20 focus:border-[#087F5B]"
                }
              />

              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                  {errors.password}
                </p>
              )}

            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">

              <div className="flex items-center">

                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#087F5B] focus:ring-[#087F5B] border-[#C9D9D5] rounded cursor-pointer accent-[#087F5B]"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#607773] cursor-pointer"
                >
                  Remember me
                </label>

              </div>

              <div className="text-sm">

                <a
                  href="/forgot-password"
                  className="font-semibold text-[#087F5B] hover:text-[#005E45] transition-colors"
                >
                  Forgot password?
                </a>

              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-[#087F5B] to-[#004646] hover:from-[#005E45] hover:to-[#003737] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#087F5B] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>

                  <span>
                    Signing in...
                  </span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />

                  <span>
                    Sign In
                  </span>
                </>
              )}

            </button>

          </form>

          {/* Divider */}
          <div className="mt-6">

            <div className="relative">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DDEBE5]"></div>
              </div>

              <div className="relative flex justify-center text-sm">

                <span className="px-2 bg-white text-[#8A9B97]">
                  Or continue with
                </span>

              </div>

            </div>

          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">

            <p className="text-sm text-[#687B78]">
              Don't have an account?{" "}

              <a
                href="/register"
                className="font-semibold text-[#087F5B] hover:text-[#005E45] transition-colors"
              >
                Sign up now
              </a>

            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;