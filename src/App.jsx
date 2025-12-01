import React, { useState } from 'react';
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

// Data
import { MAP_MARKERS } from './data/mapMarkers';

// Components
import FontStyles from './components/FontStyles';
import Background from './components/Background';
import ChatButton from './components/ChatButton';
import ChatModal from './components/ChatModal';
import RegistrationFlow from './components/RegistrationFlow';

// Pages
import HomePage from './pages/HomePage';
import TripDetailPage from './pages/TripDetailPage';
import MusicianDetailPage from './pages/MusicianDetailPage';

// Main App
export default function TravelExperience() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'trip', or 'musician'
  const [activeMarker, setActiveMarker] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleMarkerClick = (marker) => {
    // Always select the clicked marker (no toggle off)
    setActiveMarker(marker);
  };

  const handleSelectTrip = (tripId) => {
    setCurrentView('trip');
    // Auto-select Marseille (first destination) when entering trip view
    setActiveMarker(MAP_MARKERS[0]);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setActiveMarker(null);
  };

  const handleMeetGeno = () => {
    setCurrentView('musician');
  };

  // Navigate to previous location on the map
  const handlePrevLocation = () => {
    if (currentView !== 'trip') return;
    const currentIndex = MAP_MARKERS.findIndex(m => m.id === activeMarker?.id);
    const prevIndex = currentIndex <= 0 ? MAP_MARKERS.length - 1 : currentIndex - 1;
    setActiveMarker(MAP_MARKERS[prevIndex]);
  };

  // Navigate to next location on the map
  const handleNextLocation = () => {
    if (currentView !== 'trip') return;
    const currentIndex = MAP_MARKERS.findIndex(m => m.id === activeMarker?.id);
    const nextIndex = currentIndex >= MAP_MARKERS.length - 1 ? 0 : currentIndex + 1;
    setActiveMarker(MAP_MARKERS[nextIndex]);
  };

  const handleChatToggle = () => {
    setIsChatOpen(prev => !prev);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatMessages([]); // Clear messages on close
  };

  const handleChatMinimize = () => {
    setIsChatOpen(false); // Minimize keeps messages
  };

  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-1.5 sm:p-3 md:p-6 font-sans safe-area-top safe-area-bottom">
      <FontStyles />
      
      {/* Main Container with rounded frame */}
      <div className="relative w-full h-full max-w-[1800px] bg-black rounded-xl sm:rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
        
        {/* Dynamic Background */}
        <Background activeMarker={currentView === 'trip' ? activeMarker : null} />

        {/* Main Content */}
        <div className="absolute inset-0 z-10 flex flex-col p-3 sm:p-6 md:p-12 lg:p-16">
          
          {/* Header */}
          <header className="flex justify-between items-start z-50 gap-2">
            <button onClick={handleGoHome} className="cursor-pointer group text-left min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg md:text-xl font-display italic text-white/80 group-hover:text-white transition-colors truncate">
                <span className="hidden sm:inline">Ellie David </span>
                <span className="sm:hidden">Le'Voyage </span>
                <span className="text-white/50 group-hover:text-white/70 hidden sm:inline">Events by Le'Voyage</span>
              </h1>
            </button>
            <button 
              onClick={() => setIsRegistering(true)} 
              className="bg-white/10 hover:bg-white hover:text-black backdrop-blur-md border border-white/30 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[7px] sm:text-[8px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 font-sans shadow-lg flex-shrink-0"
            >
              <span className="hidden sm:inline">Reserve Spot</span>
              <span className="sm:hidden">Reserve</span>
            </button>
          </header>

          {/* Center Content Area */}
          <main className="flex-1 relative flex items-start justify-center z-20 overflow-y-auto pt-2 sm:pt-4 -mx-1 px-1">
            {currentView === 'home' && (
              <HomePage onSelectTrip={handleSelectTrip} onMeetGeno={handleMeetGeno} />
            )}
            {currentView === 'trip' && (
              <TripDetailPage 
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
                handleMarkerClick={handleMarkerClick}
              />
            )}
            {currentView === 'musician' && (
              <MusicianDetailPage onBack={handleGoHome} />
            )}
          </main>

          {/* Footer */}
          <footer className="z-20 flex-shrink-0">
            <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-6 gap-2">
              <ChatButton onClick={handleChatToggle} isOpen={isChatOpen} />
              
              {/* Locations Navigation - only visible on trip view */}
              {currentView === 'trip' && (
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrevLocation}
                    className="
                      w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
                      bg-black/30 backdrop-blur-xl border border-white/10
                      hover:bg-black/40 hover:border-white/20
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-105
                      group
                    "
                    aria-label="Previous location"
                  >
                    <ChevronLeft size={14} className="text-white/70 group-hover:text-white transition-colors sm:w-4 sm:h-4" />
                  </button>
                  
                  {/* Locations Label */}
                  <div className="
                    px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl
                    bg-black/30 backdrop-blur-xl border border-white/10
                    flex items-center gap-1.5 sm:gap-2
                    font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-medium text-white/70
                  ">
                    <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                    <span className="hidden xs:inline">Locations</span>
                  </div>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={handleNextLocation}
                    className="
                      w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl
                      bg-black/30 backdrop-blur-xl border border-white/10
                      hover:bg-black/40 hover:border-white/20
                      flex items-center justify-center
                      transition-all duration-300
                      hover:scale-105
                      group
                    "
                    aria-label="Next location"
                  >
                    <ChevronRight size={14} className="text-white/70 group-hover:text-white transition-colors sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}
              
              <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 font-sans hidden sm:block">
                Ellie David • Events by Le'Voyage
              </p>
            </div>
          </footer>
        </div>

        {/* Chat Modal */}
        <ChatModal 
          isOpen={isChatOpen}
          onClose={handleChatClose}
          onMinimize={handleChatMinimize}
          messages={chatMessages}
          setMessages={setChatMessages}
        />
      </div>

      {/* Registration Modal */}
      {isRegistering && (
        <RegistrationFlow 
          onClose={() => setIsRegistering(false)} 
          initialTripId="med"
        />
      )}
    </div>
  );
}
