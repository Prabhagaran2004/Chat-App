import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full bg-slate-900/95 backdrop-blur-sm border-t border-white/10 relative">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 relative z-10">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-white/20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white/20 border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
              type="button"
            >
              <X className="w-4 h-4 text-gray-200" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 relative z-10">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input pl-4 pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl border-2 border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-200 bg-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-circle bg-white/10 hover:bg-white/20 border border-white/20 p-2 sm:p-2.5 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md ${imagePreview ? "text-emerald-500" : "text-gray-200 hover:text-white"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-circle bg-white/20 hover:bg-white/30 border border-white/20 p-2 sm:p-2.5 text-gray-200 hover:text-white transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;