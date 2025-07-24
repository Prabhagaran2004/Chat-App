import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers(); 
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-white/10 bg-slate-900/95 backdrop-blur-sm flex flex-col transition-all duration-200 relative">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sidebar-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#sidebar-grid)" />
        </svg>
      </div>
      <div className="border-b border-white/10 w-full p-4 sm:p-5 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          <span className="font-semibold text-gray-200 text-base sm:text-lg hidden lg:block">Nanbargal</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm rounded-md border-white/20 bg-white/10 text-white focus:ring-white/10 focus:ring-2"
            />
            <span className="text-sm text-gray-300 font-medium">Online mattum</span>
          </label>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 relative z-10">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 sm:p-4 flex items-center gap-3 sm:gap-4
              hover:bg-white/10 transition-all duration-200 backdrop-blur-sm
              ${selectedUser?._id === user._id ? "bg-white/10 ring-1 ring-white/20" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border border-white/20"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 
                  rounded-full ring-2 ring-slate-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-semibold text-gray-200 text-base truncate">{user.fullName}</div>
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 text-sm sm:text-base py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;