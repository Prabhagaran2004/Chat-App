import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-slate-900/95 relative">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="home-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#home-grid)" />
        </svg>
      </div>
      <div className="flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] border border-white/10 backdrop-blur-sm">
          <div className="flex h-full rounded-2xl sm:rounded-3xl overflow-hidden">
            <Sidebar />
 
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;