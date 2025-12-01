import React from 'react';

const MapMarker = ({ marker, isActive, onClick }) => (
  <button
    onClick={() => onClick(marker)}
    aria-label={`${marker.label}, ${marker.subtext}`}
    className={`
      absolute -translate-x-1/2 -translate-y-1/2 group
      w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
      rounded-full transition-transform duration-300
      ${isActive ? 'z-30 scale-110' : 'z-20 hover:scale-125 hover:z-40 active:scale-110'}
    `}
    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
  >
    {/* Outer pulse ring - mustard yellow (visual only, extends beyond button) */}
    {!isActive && <span className="absolute w-4 h-4 rounded-full marker-pulse pointer-events-none" />}
    
    {/* Inner pulse ring - mustard yellow */}
    {!isActive && <span className="absolute w-4 h-4 rounded-full marker-ping pointer-events-none" />}
    
    {/* Main dot */}
    <span 
      className={`
        relative rounded-full border-2 transition-all duration-300 pointer-events-none
        ${isActive 
          ? 'w-3.5 h-3.5 bg-white border-white shadow-[0_0_20px_6px_rgba(255,255,255,0.9)] marker-dot-active' 
          : 'w-3.5 h-3.5 bg-[#D4AF37] border-[#D4AF37] marker-dot group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_16px_4px_rgba(255,255,255,0.8)]'
        }
      `} 
    />
    
    {/* Label tooltip - hover only on desktop, hidden on mobile since we show details below */}
    <span 
      className="
        absolute left-1/2 -translate-x-1/2 top-full mt-2 
        whitespace-nowrap pointer-events-none
        transition-all duration-200 ease-out
        opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
        hidden sm:block
      "
    >
      <span className="block bg-black/30 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg">
        <span className="block text-white text-xs font-medium tracking-wide">{marker.label}</span>
        <span className="block text-white/60 text-[10px]">{marker.subtext}</span>
      </span>
    </span>
  </button>
);

export default MapMarker;

