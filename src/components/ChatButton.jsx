import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton = ({ onClick, isOpen }) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Minimize chat" : "Open chat"}
    className={`
      w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl
      bg-black/30 backdrop-blur-xl border
      ${isOpen ? 'border-white/30 bg-black/40' : 'border-white/10 hover:border-white/20'}
      hover:bg-black/40
      flex items-center justify-center
      transition-all duration-300
      hover:scale-105
      group
      relative
      flex-shrink-0
    `}
  >
    <MessageCircle size={16} className={`${isOpen ? 'text-white' : 'text-white/80'} group-hover:text-white transition-colors sm:w-[18px] sm:h-[18px]`} />
    
    {/* Tooltip - only show when chat is closed and on larger screens */}
    {!isOpen && (
      <span className="
        absolute bottom-full mb-2
        whitespace-nowrap pointer-events-none
        bg-black/30 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg
        text-white/90 text-xs font-medium
        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200
        hidden sm:block
      ">
        Chat with us
      </span>
    )}
  </button>
);

export default ChatButton;

