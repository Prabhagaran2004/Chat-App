import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="border-b border-white/10 fixed w-full top-0 z-50 backdrop-blur-sm bg-slate-900/95 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
        <div className="flex items-center justify-between h-full">
          {/* Geometric pattern background for navbar */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="nav-grid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="20" fill="url(#nav-grid)" />
            </svg>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 relative z-10">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 hover:opacity-90 transition-all duration-200 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all duration-300 border border-white/20">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                Vaanga Pesalam
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
            {/* <Link
              to={"/settings"}
              className="btn btn-sm gap-1 sm:gap-2 transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-200 hover:text-white shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link> */}

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm gap-1 sm:gap-2 transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-200 hover:text-white shadow-sm hover:shadow-md backdrop-blur-sm"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-sm gap-1 sm:gap-2 transition-all duration-200 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 rounded-xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-red-300 hover:text-red-200 shadow-sm hover:shadow-md backdrop-blur-sm" 
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;