import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-slate-900 grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 relative bg-slate-900 overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="login-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#login-grid)" />
            </svg>
          </div>
          <div className="absolute top-10 right-10 w-48 h-48 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 border border-white/5 rounded-full"></div>
          <div className="absolute top-1/3 left-1/4 w-24 h-24 border border-white/15 rounded-full"></div>
        </div>
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 relative z-10">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/20">
                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
                Vaanga Vaanga
              </h1>
              <p className="text-sm sm:text-base text-gray-300 font-medium">Sign in Pannitu Ponga</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-gray-200 text-sm sm:text-base">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input w-full pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-200 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-2">
                <span className="label-text font-semibold text-gray-200 text-sm sm:text-base">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full pl-12 pr-12 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-200 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-200" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn w-full py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span className="text-sm sm:text-base">Loading...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Sign in</span>
              )}
            </button>
          </form>

          <div className="text-center pt-4 sm:pt-6">
            <p className="text-sm sm:text-base text-gray-300">
              Account Illaya?{" "}
              <Link to="/signup" className="font-semibold text-white hover:text-gray-200 transition-colors duration-200 hover:underline border-b border-white/30 hover:border-white/50">
                Create Pannunga
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Vanakam!"}
        subtitle={"Sign in pannunga,Kavalaigala paraka vidunga"}
      />
    </div>
  );
};

export default LoginPage;
