import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900/95 backdrop-blur-sm relative">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nochat-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#nochat-grid)" />
        </svg>
      </div>
      <div className="max-w-md text-center space-y-6 sm:space-y-8 relative z-10">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg border border-white/20 animate-bounce backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
            >
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Welcome to Vaanga Pesalam!</h2>
        <p className="text-sm sm:text-base text-gray-300 font-medium">
          Arimugam Illatha Uraiyadal Aayul Natpin Thodakkam!!!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;