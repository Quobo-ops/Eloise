import React from 'react';
import { MapPin, Calendar, Ship, ChevronRight } from 'lucide-react';
import { TRIPS } from '../data/trips';

const HomePage = ({ onSelectTrip, onMeetGeno }) => (
  <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4">
    
    {/* Main Hero Title */}
    <div className="text-center mb-4 md:mb-6 animate-fade-up">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display italic text-white mb-3 text-glow px-2">
        Geno Delafose Zydeco Cruise 2025
      </h1>
      <div className="h-px w-16 sm:w-24 bg-amber-400/60 mx-auto mb-3 sm:mb-4"></div>
      <button
        onClick={onMeetGeno}
        className="px-5 sm:px-6 py-2 sm:py-2.5 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 hover:border-amber-400 rounded-full text-amber-200 hover:text-white text-xs sm:text-sm font-sans font-medium tracking-wide transition-all duration-300 hover:scale-105"
      >
        Meet Geno
      </button>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-stretch">
    
      {/* Left Container - About */}
      <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up">
          Welcome to
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col flex-grow justify-between animate-fade-up gap-4 sm:gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display italic text-white mb-4 sm:mb-6">
                Events by Le'Voyage
              </h2>
              <div className="h-px w-12 sm:w-16 bg-white/40 mb-4 sm:mb-6"></div>
              <p className="text-white/90 font-sans text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 max-w-lg">
                Your personal gateway to curated travel experiences. Browse past adventures and discover upcoming journeys — all thoughtfully managed, scheduled, and organized by Ellie.
              </p>
              <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed max-w-lg hidden sm:block">
                From Mediterranean cruises to exotic destinations, every trip is crafted with care to create unforgettable memories.
              </p>
            </div>
            
            {/* Services */}
            <div className="border-t border-white/20 pt-4 sm:pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-3 sm:mb-4">What We Offer</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                  <span className="font-sans text-xs sm:text-sm">Group Cruises</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                  <span className="font-sans text-xs sm:text-sm">Custom Itineraries</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                  <span className="font-sans text-xs sm:text-sm">Cabin Selection</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 rounded-full flex-shrink-0"></span>
                  <span className="font-sans text-xs sm:text-sm">Travel Planning</span>
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="border-t border-white/20 pt-4 sm:pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-2 sm:mb-3">Need Help?</p>
              <p className="text-white font-sans text-base sm:text-lg font-medium">Chat with us</p>
              <p className="text-white/50 font-sans text-xs sm:text-sm">Click the chat icon below to get started</p>
            </div>
          </div>
      </div>
    
    {/* Right Container - Upcoming Trip Card */}
    <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        Upcoming Journey
      </p>
      
      {/* Trip Card */}
      <button 
        onClick={() => onSelectTrip('med')}
        className="w-full text-left group flex-grow flex animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="relative w-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col flex-grow justify-between transition-all duration-300 hover:bg-black/40 hover:border-white/20 hover:scale-[1.02] gap-4 sm:gap-6">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-white mb-1 truncate">
                  {TRIPS.med.title}
                </h3>
                <p className="text-white/70 font-sans text-xs sm:text-sm font-medium">{TRIPS.med.route}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </div>
            </div>
            
            {/* Card Details */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-white/80">
                <Calendar size={14} className="text-white/60 flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="font-sans text-xs sm:text-sm">{TRIPS.med.dates}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-white/80">
                <Ship size={14} className="text-white/60 flex-shrink-0 sm:w-4 sm:h-4" />
                <span className="font-sans text-xs sm:text-sm">{TRIPS.med.ship} • {TRIPS.med.duration}</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-white/80">
                <MapPin size={14} className="text-white/60 flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                <span className="font-sans text-xs sm:text-sm leading-relaxed">{TRIPS.med.ports.join(' • ')}</span>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="border-t border-white/20 pt-4 sm:pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-3 sm:mb-4">Cabin Options</p>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {TRIPS.med.pricing.map((option) => (
                  <div key={option.type} className="text-center">
                    <p className="text-white font-display text-base sm:text-lg md:text-xl">${option.price}</p>
                    <p className="text-white/50 font-sans text-[8px] sm:text-[10px] uppercase tracking-wider">{option.type}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/40 font-sans text-[9px] sm:text-[10px] mt-3 sm:mt-4 italic hidden sm:block">{TRIPS.med.note}</p>
            </div>
            
            {/* Extras */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {TRIPS.med.extras.map((extra, i) => (
                <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/70 font-sans">
                  {extra}
                </span>
              ))}
            </div>
            
            {/* Hover hint */}
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans group-hover:text-white/70 transition-colors">
              Tap to explore destinations →
            </p>
          </div>
        </button>
      </div>
    
    </div>
  </div>
);

export default HomePage;

