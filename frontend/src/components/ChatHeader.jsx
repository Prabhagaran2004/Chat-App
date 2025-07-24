import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 sm:p-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm relative shadow-lg">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chatheader-grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="20" fill="url(#chatheader-grid)" />
        </svg>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-gray-200 text-base sm:text-lg">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          className="btn btn-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-2 sm:p-2.5 text-gray-200 hover:text-white transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md"
          onClick={() => setSelectedUser(null)}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;