import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 sm:px-6 lg:px-8 pt-20 max-w-5xl bg-slate-900/95 relative">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="settings-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#settings-grid)" />
        </svg>
      </div>
      <div className="space-y-6 relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Theme</h2>
          <p className="text-sm text-gray-300 font-medium">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm
                ${theme === t ? "bg-white/10 border border-white/20" : "hover:bg-white/10"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] sm:text-xs font-medium truncate w-full text-center text-gray-200">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Preview</h3>
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden bg-white/5 shadow-2xl backdrop-blur-sm">
          <div className="p-4 sm:p-6 bg-white/5">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-white/5 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden backdrop-blur-sm border border-white/10">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-200">John Doe</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 sm:p-6 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-white/5">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 sm:p-4 shadow-sm backdrop-blur-sm border border-white/20
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-white/10 text-gray-200"}
                        `}
                      >
                        <p className="text-sm sm:text-base">{message.content}</p>
                        <p
                          className={`
                            text-[10px] sm:text-xs mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-gray-400"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 sm:p-6 border-t border-white/10 bg-white/5">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      type="text"
                      className="input flex-1 pl-4 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-200 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-circle bg-white/20 hover:bg-white/30 border border-white/20 p-2 sm:p-2.5 text-gray-200 hover:text-white transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
                      <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;