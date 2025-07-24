const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-slate-900 p-8 xl:p-12 relative overflow-hidden">
      {/* Geometric pattern background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div> 
      
      <div className="max-w-md xl:max-w-lg text-center relative z-10 bg-white/5 backdrop-blur-sm rounded-3xl p-8 xl:p-10 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-3 gap-3 xl:gap-4 mb-8 xl:mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl xl:rounded-3xl bg-white/10 shadow-lg border border-white/20 backdrop-blur-sm ${
                i % 2 === 0 ? "animate-pulse" : ""
              } hover:bg-white/20 transition-all duration-300`}
            />
          ))}
        </div>
        <h2 className="text-2xl xl:text-3xl font-bold mb-4 xl:mb-6 text-white">
          {title}
        </h2>
        <p className="text-base xl:text-lg text-gray-300 leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;