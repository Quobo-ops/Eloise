import React from 'react';
import { MapPin, Calendar, Ship } from 'lucide-react';
import { TRIPS } from '../data/trips';
import { MAP_MARKERS } from '../data/mapMarkers';
import MapMarker from '../components/MapMarker';

const TripDetailPage = ({ activeMarker, setActiveMarker, handleMarkerClick }) => (
  <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 px-2 sm:px-4 items-stretch">
    
    {/* Map Container */}
    <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up">
        Select a destination
      </p>
      
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col flex-grow animate-fade-up">
        {/* Map */}
        <div className="relative flex-grow flex items-center justify-center">
          <div className="relative w-full">
            <img 
              src="/map.jpg" 
              alt="Mediterranean Map" 
              className="w-full h-auto object-contain rounded-lg sm:rounded-xl"
              loading="lazy"
            />
            
            {/* Map Markers */}
            <div className="absolute inset-0">
              {MAP_MARKERS.map((marker) => (
                <MapMarker
                  key={marker.id}
                  marker={marker}
                  isActive={activeMarker?.id === marker.id}
                  onClick={handleMarkerClick}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Map hint */}
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans mt-3 sm:mt-4 text-center">
          Tap on any marker to explore
        </p>
      </div>
    </div>
    
    {/* Content Container */}
    <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {activeMarker ? 'Destination Details' : 'Trip Overview'}
      </p>
      
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col flex-grow justify-between animate-fade-up gap-4 sm:gap-6" style={{ animationDelay: '0.2s' }}>
        {activeMarker ? (
          <>
            {/* Location Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display italic text-white mb-1 sm:mb-2">
                {activeMarker.title}
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] text-white/60 font-sans">
                {activeMarker.subtext}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-white/90 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
              {activeMarker.description}
            </p>
            
            {/* Highlights */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-3 sm:mb-4">
                Highlights
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeMarker.highlights.map((highlight, index) => (
                  <span 
                    key={index}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/80 font-sans"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Trip Header */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-white mb-1 sm:mb-2">
                {TRIPS.med.title}
              </h2>
              <p className="text-white/60 font-sans text-xs sm:text-sm">{TRIPS.med.route}</p>
            </div>
            
            {/* Trip Details */}
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
            
            {/* Description */}
            <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed max-w-lg">
              Explore the stunning Mediterranean coast with stops in France, Monaco, and Italy. Select a destination on the map to learn more about each port of call.
            </p>
            
            {/* Hint */}
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">
              Select a marker to view destination details
            </p>
          </>
        )}
      </div>
    </div>
    
  </div>
);

export default TripDetailPage;

