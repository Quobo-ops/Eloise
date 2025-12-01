import React, { useState, useEffect, useRef } from 'react';
import { X, Check, MapPin, Calendar, Ship, ChevronRight, MessageCircle, Send, Minus } from 'lucide-react';
import { generateResponse } from './chatbotKnowledge';

// --- Assets & Data ---

const TRIPS = {
  med: {
    title: "Mediterranean Magic",
    ship: "NCL's Epic",
    dates: "Oct 25 – Nov 1, 2026",
    route: "Rome to Barcelona",
    duration: "7 Days / 6 Nights",
    ports: ["Salerno", "Sicily", "Florence/Pisa", "Monaco", "Marseille"],
    pricing: [
      { type: 'Mini-Suite', price: '1,329.10' },
      { type: 'Balcony', price: '1,158.10' },
      { type: 'Interior', price: '833.55' }
    ],
    note: "Cabin rate only; port fees, packages, insurance priced separately",
    extras: ["Optional pre-tour in Rome", "Optional post-tour in Barcelona"]
  },
  zydeco: {
    title: "Geno Delafose Zydeco Cruise",
    ship: "Carnival Jubilee",
    dates: "Nov 15-22, 2025",
    pricing: [
      { type: 'Balcony', price: '1,328.00' },
      { type: 'Interior', price: '1,003.00' }
    ],
    extras: ["Exclusive Parties", "Group Photo", "$25 Credit"]
  }
};

// --- Data ---

const MAP_MARKERS = [
  { 
    id: 'marseille', 
    label: 'Marseille', 
    subtext: 'France', 
    x: 33.5, 
    y: 18.1,
    title: 'Marseille',
    description: 'France\'s oldest city and largest port on the Mediterranean. Explore the historic Vieux-Port, visit the stunning Basilique Notre-Dame de la Garde, and savor authentic bouillabaisse.',
    highlights: ['Vieux-Port Harbor', 'Notre-Dame de la Garde', 'Le Panier District', 'Calanques National Park'],
    video: '/videos/marseille.mp4'
  },
  { 
    id: 'monaco', 
    label: 'Monaco', 
    subtext: 'Villefranche-sur-Mer', 
    x: 36.7, 
    y: 17.0,
    title: 'Monaco',
    description: 'The glamorous principality on the French Riviera. Experience the legendary Monte Carlo Casino, the Prince\'s Palace, and the world-famous Grand Prix circuit.',
    highlights: ['Monte Carlo Casino', 'Prince\'s Palace', 'Oceanographic Museum', 'Monaco Grand Prix Circuit'],
    video: '/videos/monaco.mp4'
  },
  { 
    id: 'florence', 
    label: 'Florence & Pisa', 
    subtext: 'Livorno, Italy', 
    x: 43.2, 
    y: 18.5,
    title: 'Florence & Pisa',
    description: 'The cradle of the Renaissance. Marvel at Michelangelo\'s David, the Uffizi Gallery, and the iconic Leaning Tower of Pisa just a short journey away.',
    highlights: ['Uffizi Gallery', 'Duomo di Firenze', 'Leaning Tower of Pisa', 'Ponte Vecchio'],
    video: '/videos/florence.mov'
  },
  { 
    id: 'salerno', 
    label: 'Salerno', 
    subtext: 'Italy', 
    x: 50.1, 
    y: 34.8,
    title: 'Salerno',
    description: 'Gateway to the stunning Amalfi Coast. Discover medieval architecture, visit the ancient ruins of Pompeii, or take a scenic drive along one of the world\'s most beautiful coastlines.',
    highlights: ['Amalfi Coast', 'Pompeii & Herculaneum', 'Ravello Gardens', 'Salerno Cathedral'],
    video: '/videos/salerno.mp4'
  },
  { 
    id: 'sicily', 
    label: 'Sicily', 
    subtext: 'Messina, Italy', 
    x: 52.4, 
    y: 37.9,
    title: 'Sicily',
    description: 'The largest Mediterranean island, rich in Greek temples, Norman churches, and Baroque towns. Visit Mount Etna, Europe\'s most active volcano, and taste authentic Sicilian cuisine.',
    highlights: ['Mount Etna', 'Taormina', 'Valley of the Temples', 'Sicilian Street Food'],
    video: '/videos/sicily.mp4'
  },
];

// --- Components ---

// Chat Modal Component
const ChatModal = ({ isOpen, onClose, onMinimize, messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    // Get value from ref (DOM) or state - handles both manual typing and automation
    const messageText = inputRef.current?.value?.trim() || input.trim();
    if (!messageText) return;
    
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    if (inputRef.current) inputRef.current.value = ''; // Clear DOM directly too
    setIsTyping(true);

    // Generate response using knowledge base
    setTimeout(() => {
      const responseText = generateResponse(messageText);
      const aiMessage = { 
        role: 'assistant', 
        content: responseText 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[88px] left-[72px] md:left-[104px] z-[90] animate-fade-up">
      <div className="w-[320px] md:w-[360px] bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[420px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle size={14} className="text-white/80" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white font-sans">Le'Voyage Assistant</h3>
              <p className="text-[10px] text-white/50 font-sans">Ask me anything about your trip</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={onMinimize}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Minimize chat"
            >
              <Minus size={14} className="text-white/60 hover:text-white" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={14} className="text-white/60 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px] max-h-[320px]">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={20} className="text-white/40" />
              </div>
              <p className="text-white/60 text-sm font-sans mb-2">Welcome to Le'Voyage!</p>
              <p className="text-white/40 text-xs font-sans">Ask about destinations, pricing, or anything else.</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-sans ${
                  msg.role === 'user' 
                    ? 'bg-white/20 text-white rounded-br-md' 
                    : 'bg-white/5 text-white/90 rounded-bl-md border border-white/10'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          className="p-4 border-t border-white/10"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 border border-white/10 focus-within:border-white/20 transition-colors">
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white text-sm font-sans placeholder:text-white/30 focus:outline-none"
            />
            <button 
              type="submit"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Send message"
            >
              <Send size={16} className="text-white/80" />
            </button>
          </div>
          <p className="text-[9px] text-white/30 text-center mt-2 font-sans">
            Ask me anything about your trip!
          </p>
        </form>
      </div>
    </div>
  );
};

// Chat Bot Button Component
const ChatButton = ({ onClick, isOpen }) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Minimize chat" : "Open chat"}
    className={`
      w-12 h-12 rounded-2xl
      bg-black/30 backdrop-blur-xl border
      ${isOpen ? 'border-white/30 bg-black/40' : 'border-white/10 hover:border-white/20'}
      hover:bg-black/40
      flex items-center justify-center
      transition-all duration-300
      hover:scale-105
      group
      relative
    `}
  >
    <MessageCircle size={18} className={`${isOpen ? 'text-white' : 'text-white/80'} group-hover:text-white transition-colors`} />
    
    {/* Tooltip - only show when chat is closed */}
    {!isOpen && (
      <span className="
        absolute bottom-full mb-2
        whitespace-nowrap pointer-events-none
        bg-black/30 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg
        text-white/90 text-xs font-medium
        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200
      ">
        Chat with us
      </span>
    )}
  </button>
);

// Map Marker Component
const MapMarker = ({ marker, isActive, onClick }) => (
  <button
    onClick={() => onClick(marker)}
    aria-label={`${marker.label}, ${marker.subtext}`}
    className={`
      absolute -translate-x-1/2 -translate-y-1/2 group
      w-5 h-5 flex items-center justify-center
      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
      rounded-full transition-transform duration-300
      ${isActive ? 'z-30 scale-110' : 'z-20 hover:scale-125 hover:z-40'}
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
    
    {/* Label tooltip - hover only */}
    <span 
      className="
        absolute left-1/2 -translate-x-1/2 top-full mt-2 
        whitespace-nowrap pointer-events-none
        transition-all duration-200 ease-out
        opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
      "
    >
      <span className="block bg-black/30 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-lg">
        <span className="block text-white text-xs font-medium tracking-wide">{marker.label}</span>
        <span className="block text-white/60 text-[10px]">{marker.subtext}</span>
      </span>
    </span>
  </button>
);

// Video Background Component
const Background = ({ activeMarker }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState('/background.mp4');

  // Determine which video to play
  const targetVideo = activeMarker?.video || '/background.mp4';

  useEffect(() => {
    // Fade transition when video changes
    if (targetVideo !== currentVideo) {
      setCurrentVideo(targetVideo);
    }
  }, [targetVideo, currentVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [currentVideo]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        key={currentVideo}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        src={currentVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-10" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
    </div>
  );
};

const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
      
      .font-display { 
        font-family: 'Cormorant Garamond', serif; 
        font-weight: 300;
      }
      .font-sans { font-family: 'Montserrat', sans-serif; }
      
      /* Stronger glow for readability on photos */
      .text-glow {
        text-shadow: 
          0 0 30px rgba(255,255,255,0.6),
          0 0 10px rgba(0,0,0,0.5);
      }
      
      .text-shadow-hard {
        text-shadow: 0 2px 8px rgba(0,0,0,0.9);
      }

      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-up {
        animation: fadeSlideUp 0.8s ease-out forwards;
      }

      /* Eye-catching marker pulse animation - mustard yellow */
      @keyframes marker-pulse {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(3.5); opacity: 0; }
      }
      @keyframes marker-ping {
        0% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(2); opacity: 0.3; }
        100% { transform: scale(3); opacity: 0; }
      }
      @keyframes marker-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes marker-glow {
        0%, 100% { box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.6); }
        50% { box-shadow: 0 0 16px 6px rgba(212, 175, 55, 0.9); }
      }
      .marker-pulse {
        animation: marker-pulse 2s ease-out infinite;
        background: rgba(212, 175, 55, 0.5);
      }
      .marker-ping {
        animation: marker-ping 1.5s ease-out infinite 0.5s;
        background: rgba(212, 175, 55, 0.3);
      }
      .marker-dot {
        animation: marker-bounce 2s ease-in-out infinite, marker-glow 2s ease-in-out infinite;
      }
      .marker-dot-active {
        animation: none;
      }
    `}
  </style>
);

const RegistrationFlow = ({ onClose, initialTripId }) => {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState('opacity-0 translate-y-4');
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: ''
  });
  const tripDetails = TRIPS[initialTripId] || TRIPS.med;

  useEffect(() => { 
    const timer = setTimeout(() => setFade('opacity-100 translate-y-0'), 100);
    return () => clearTimeout(timer);
  }, [step]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setFade('opacity-0 -translate-y-4');
    setTimeout(() => { 
      setStep(prev => prev + 1); 
      setFade('opacity-0 translate-y-4'); 
    }, 400);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/eventsbylevoyage@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Reservation Request - ${tripDetails.title}`,
          Trip: tripDetails.title,
          Dates: tripDetails.dates,
          'Full Name': formData.fullName,
          'Date of Birth': formData.dateOfBirth,
          'Phone': formData.phone,
          'Email': formData.email,
          'Selected Cabin': selectedCabin || 'Not selected',
          'Cabin Price': `$${getPrice()}`
        })
      });
      
      if (response.ok) {
        handleNext();
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getPrice = () => {
    const cabin = tripDetails.pricing.find(p => p.type === selectedCabin);
    return cabin ? cabin.price : "0.00";
  };

  const questions = [
    {
      id: 'intro',
      component: (
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display italic text-white/90">{tripDetails.title}</h2>
          <div className="h-px w-16 bg-white/20 mx-auto"></div>
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-sans">{tripDetails.dates}</p>
          <button 
            onClick={handleNext} 
            className="mt-8 px-10 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors uppercase text-[9px] font-bold tracking-[0.2em] font-sans shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Start Booking
          </button>
        </div>
      )
    },
    {
      id: 'guest',
      title: 'Primary Guest',
      component: (
        <div className="space-y-8 w-full max-w-md">
          <div className="group">
            <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Full Legal Name <span className="normal-case tracking-normal opacity-70">(As it appears on your passport)</span></label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors text-xl font-display placeholder:text-white/10" 
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="group">
               <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Date of Birth</label>
               <input 
                 type="text" 
                 value={formData.dateOfBirth}
                 onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                 placeholder="MM/DD/YYYY"
                 className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-sans text-sm placeholder:text-white/20" 
               />
            </div>
            <div className="group">
               <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Mobile Phone</label>
               <input 
                 type="tel" 
                 value={formData.phone}
                 onChange={(e) => handleInputChange('phone', e.target.value)}
                 className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-sans text-sm" 
               />
            </div>
          </div>
          <div className="group">
             <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Email Address</label>
             <input 
               type="email" 
               value={formData.email}
               onChange={(e) => handleInputChange('email', e.target.value)}
               className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-sans text-sm" 
             />
          </div>
        </div>
      )
    },
    {
      id: 'stateroom',
      title: "Select Stateroom",
      component: (
        <div className="space-y-4 w-full max-w-md font-sans">
          {tripDetails.pricing.map(option => (
            <button 
              key={option.type} 
              onClick={() => setSelectedCabin(option.type)} 
              className={`w-full border px-6 py-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                selectedCabin === option.type 
                  ? 'bg-white/10 border-white/60' 
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <span className="font-light tracking-wider text-xs uppercase">{option.type}</span>
              <span className="text-sm font-semibold tracking-wide">${option.price}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'summary',
      title: "Review Details",
      component: (
        <div className="space-y-6 w-full max-w-md">
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
              <span className="font-display text-2xl italic text-white/90">{tripDetails.title}</span>
            </div>
            <div className="space-y-3 text-sm opacity-70 font-sans tracking-wide">
              <div className="flex justify-between">
                <span>Guest</span>
                <span>{formData.fullName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span>{formData.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone</span>
                <span>{formData.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                <span>{selectedCabin || 'No cabin selected'}</span>
                <span>${getPrice()}</span>
              </div>
            </div>
          </div>
          <div className="text-center pt-4">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold uppercase text-[9px] tracking-[0.2em] rounded-full hover:scale-[1.02] transition-transform font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Reservation Request'}
            </button>
            <p className="text-[9px] mt-5 opacity-30 uppercase tracking-widest font-sans">Ellie David • Le'Voyage</p>
          </div>
        </div>
      )
    },
    {
      id: 'done',
      component: (
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border border-green-400/20 flex items-center justify-center mx-auto mb-8 bg-green-900/10 backdrop-blur-md">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-4xl font-display italic mb-4 text-white/90">Request Received.</h2>
          <p className="opacity-50 text-xs mb-12 font-sans tracking-wide leading-relaxed max-w-xs mx-auto">We will check availability and call you shortly to confirm.</p>
          <button 
            onClick={onClose} 
            className="text-[9px] uppercase tracking-[0.2em] border-b border-white/20 pb-1 hover:border-white transition-colors text-white/60 hover:text-white font-sans"
          >
            Return Home
          </button>
        </div>
      )
    }
  ];

  const currentQ = questions[step];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl text-white flex flex-col items-center justify-center">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 p-4 opacity-50 hover:opacity-100 transition-opacity"
      >
        <X size={20}/>
      </button>
      <div className={`w-full max-w-xl px-8 transition-all duration-500 transform ${fade}`}>
        {currentQ.title && (
          <h3 className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30 mb-12 text-center font-sans">
            {currentQ.title}
          </h3>
        )}
        <div className="flex flex-col items-center">{currentQ.component}</div>
        {step > 0 && step < questions.length - 1 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setStep(s => s - 1)} 
              className="text-[9px] uppercase tracking-[0.2em] opacity-30 hover:opacity-80 transition-opacity font-sans"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ onSelectTrip, onMeetGeno }) => (
  <div className="w-full max-w-[1400px] mx-auto px-4">
    
    {/* Main Hero Title */}
    <div className="text-center mb-4 md:mb-6 animate-fade-up">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-display italic text-white mb-3 text-glow">
        Geno Delafose Zydeco Cruise 2025
      </h1>
      <div className="h-px w-24 bg-amber-400/60 mx-auto mb-4"></div>
      <button
        onClick={onMeetGeno}
        className="px-6 py-2.5 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 hover:border-amber-400 rounded-full text-amber-200 hover:text-white text-sm font-sans font-medium tracking-wide transition-all duration-300 hover:scale-105"
      >
        Meet Geno
      </button>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
    
      {/* Left Container - About */}
      <div className="p-4 lg:p-8 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up">
          Welcome to
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col flex-grow justify-between animate-fade-up">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic text-white mb-6">
                Le'Voyage
              </h2>
              <div className="h-px w-16 bg-white/40 mb-6"></div>
              <p className="text-white/90 font-sans text-base md:text-lg leading-relaxed mb-4 max-w-lg">
                Your personal gateway to curated travel experiences. Browse past adventures and discover upcoming journeys — all thoughtfully managed, scheduled, and organized by Ellie.
              </p>
              <p className="text-white/70 font-sans text-sm leading-relaxed max-w-lg">
                From Mediterranean cruises to exotic destinations, every trip is crafted with care to create unforgettable memories.
              </p>
            </div>
            
            {/* Services */}
            <div className="border-t border-white/20 pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-4">What We Offer</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span className="font-sans text-sm">Group Cruises</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span className="font-sans text-sm">Custom Itineraries</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span className="font-sans text-sm">Cabin Selection</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span className="font-sans text-sm">Travel Planning</span>
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="border-t border-white/20 pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-3">Need Help?</p>
              <p className="text-white font-sans text-lg font-medium">Chat with us</p>
              <p className="text-white/50 font-sans text-sm">Click the chat icon below to get started</p>
            </div>
          </div>
      </div>
    
    {/* Right Container - Upcoming Trip Card */}
    <div className="p-4 lg:p-8 flex flex-col">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        Upcoming Journey
      </p>
      
      {/* Trip Card */}
      <button 
        onClick={() => onSelectTrip('med')}
        className="w-full text-left group flex-grow flex animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="relative w-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col flex-grow justify-between transition-all duration-300 hover:bg-black/40 hover:border-white/20 hover:scale-[1.02]">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl md:text-4xl font-display italic text-white mb-1">
                  {TRIPS.med.title}
                </h3>
                <p className="text-white/70 font-sans text-sm font-medium">{TRIPS.med.route}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ChevronRight size={20} />
              </div>
            </div>
            
            {/* Card Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Calendar size={16} className="text-white/60 flex-shrink-0" />
                <span className="font-sans text-sm">{TRIPS.med.dates}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Ship size={16} className="text-white/60 flex-shrink-0" />
                <span className="font-sans text-sm">{TRIPS.med.ship} • {TRIPS.med.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={16} className="text-white/60 flex-shrink-0" />
                <span className="font-sans text-sm">{TRIPS.med.ports.join(' • ')}</span>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="border-t border-white/20 pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-4">Cabin Options</p>
              <div className="grid grid-cols-3 gap-2">
                {TRIPS.med.pricing.map((option) => (
                  <div key={option.type} className="text-center">
                    <p className="text-white font-display text-xl">${option.price}</p>
                    <p className="text-white/50 font-sans text-[10px] uppercase tracking-wider">{option.type}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/40 font-sans text-[10px] mt-4 italic">{TRIPS.med.note}</p>
            </div>
            
            {/* Extras */}
            <div className="flex flex-wrap gap-2">
              {TRIPS.med.extras.map((extra, i) => (
                <span key={i} className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/70 font-sans">
                  {extra}
                </span>
              ))}
            </div>
            
            {/* Hover hint */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans group-hover:text-white/70 transition-colors">
              Click to explore destinations →
            </p>
          </div>
        </button>
      </div>
    
    </div>
  </div>
);

// Trip Detail Page Component
const TripDetailPage = ({ activeMarker, setActiveMarker, handleMarkerClick }) => (
  <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 px-4 items-stretch">
    
    {/* Map Container */}
    <div className="p-4 lg:p-8 flex flex-col">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up">
        Select a destination
      </p>
      
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col flex-grow animate-fade-up">
        {/* Map */}
        <div className="relative flex-grow flex items-center justify-center">
          <div className="relative w-full">
            <img 
              src="/map.jpg" 
              alt="Mediterranean Map" 
              className="w-full h-auto object-contain rounded-xl"
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
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans mt-4 text-center">
          Click on any marker to explore
        </p>
      </div>
    </div>
    
    {/* Content Container */}
    <div className="p-4 lg:p-8 flex flex-col">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {activeMarker ? 'Destination Details' : 'Trip Overview'}
      </p>
      
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col flex-grow justify-between animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {activeMarker ? (
          <>
            {/* Location Header */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-white mb-2">
                {activeMarker.title}
              </h2>
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/60 font-sans">
                {activeMarker.subtext}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-white/90 font-sans text-base md:text-lg leading-relaxed max-w-lg">
              {activeMarker.description}
            </p>
            
            {/* Highlights */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-4">
                Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {activeMarker.highlights.map((highlight, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80 font-sans"
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
              <h2 className="text-4xl md:text-5xl font-display italic text-white mb-2">
                {TRIPS.med.title}
              </h2>
              <p className="text-white/60 font-sans text-sm">{TRIPS.med.route}</p>
            </div>
            
            {/* Trip Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Calendar size={16} className="text-white/60" />
                <span className="font-sans text-sm">{TRIPS.med.dates}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Ship size={16} className="text-white/60" />
                <span className="font-sans text-sm">{TRIPS.med.ship} • {TRIPS.med.duration}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={16} className="text-white/60" />
                <span className="font-sans text-sm">{TRIPS.med.ports.join(' • ')}</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-white/70 font-sans text-base leading-relaxed max-w-lg">
              Explore the stunning Mediterranean coast with stops in France, Monaco, and Italy. Select a destination on the map to learn more about each port of call.
            </p>
            
            {/* Hint */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">
              Select a marker to view destination details
            </p>
          </>
        )}
      </div>
    </div>
    
  </div>
);

// Musician Detail Page Component
const MusicianDetailPage = ({ onBack }) => (
  <div className="w-full max-w-[1400px] mx-auto px-4 py-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      
      {/* Left - Artist Video */}
      <div className="p-4 lg:p-8 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up">
          Featured Artist
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex-grow animate-fade-up">
          <div className="aspect-[4/5] relative">
            <video 
              src="/geno-video.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale"
            />
            {/* Smooth blur gradient - uses mask to fade the blur */}
            <div 
              className="absolute inset-0 backdrop-blur-md"
              style={{
                maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-sans mb-2">
                The Creole Cowboy
              </p>
              <h2 className="text-4xl md:text-5xl font-display italic text-white">
                Geno Delafose
              </h2>
              <p className="text-white/60 font-sans text-sm mt-2">
                Keeping Zydeco Alive
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right - Artist Bio */}
      <div className="p-4 lg:p-8 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          About the Artist
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col flex-grow animate-fade-up overflow-y-auto max-h-[600px]" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl md:text-3xl font-display italic text-white mb-3">
                The Sound of Louisiana
              </h3>
              <div className="h-px w-16 bg-amber-400/60 mb-4"></div>
            </div>
            
            <p className="text-white/90 font-sans text-sm md:text-base leading-relaxed">
              Geno Delafose stands as living proof that tradition and vitality are not opposites—that the old ways, played with fire and conviction, can pack dance floors from the bayou country of southwest Louisiana to concert halls across the world. Born February 6, 1971 in Eunice, Louisiana, he has created the sound known as nouveau zydeco, deeply rooted in traditional Creole forms with strong influences from Cajun, country, and blues.
            </p>
            
            <p className="text-white/70 font-sans text-sm leading-relaxed">
              His father was the legendary zydeco accordionist John Delafose. At age eight, Geno joined his father's band as a rubboard player and continued performing with them until his father's passing in 1994. The education was comprehensive—not just mechanics of rhythm and melody, but the philosophy of entertaining and the responsibility to the people who came to dance.
            </p>
            
            <p className="text-white/70 font-sans text-sm leading-relaxed">
              In 1994, he debuted with the album French Rockin' Boogie on Rounder Records—the name that became his band's identity. He was nominated for a Grammy Award for his 2007 album Le Cowboy Creole, a title capturing his dual identity as authentically as his music does.
            </p>
            
            <p className="text-white/70 font-sans text-sm leading-relaxed">
              A 53-year-old accordion-playing, French-speaking cattle farmer, car hauler, and Evangeline Parish constable, he routinely juggles three to five gigs on most weekends. He divides his time between touring and operating his Double D Ranch outside Eunice, where he breeds cattle and raises quarter horses. To see Geno perform is to witness a man doing exactly what he was born to do.
            </p>
            
            {/* Highlights */}
            <div className="border-t border-white/20 pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-3">Legacy</p>
              <div className="flex flex-wrap gap-2">
                {['Grammy Nominated', 'Le Cowboy Creole', 'French Rockin\' Boogie', 'Double D Ranch', 'Eunice, Louisiana', '30+ Years'].map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-xs text-amber-200/90 font-sans">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Back button */}
          <button 
            onClick={onBack}
            className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white font-sans transition-colors flex items-center gap-2 flex-shrink-0"
          >
            ← Back to Cruise Details
          </button>
        </div>
      </div>
      
    </div>
  </div>
);

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
    // Auto-select Monaco (first destination) when entering trip view
    setActiveMarker(MAP_MARKERS.find(m => m.id === 'monaco') || MAP_MARKERS[0]);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setActiveMarker(null);
  };

  const handleMeetGeno = () => {
    setCurrentView('musician');
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
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-3 md:p-6 font-sans">
      <FontStyles />
      
      {/* Main Container with rounded frame */}
      <div className="relative w-full h-full max-w-[1800px] bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
        
        {/* Dynamic Background */}
        <Background activeMarker={currentView === 'trip' ? activeMarker : null} />

        {/* Main Content */}
        <div className="absolute inset-0 z-10 flex flex-col p-6 md:p-12 lg:p-16">
          
          {/* Header */}
          <header className="flex justify-between items-start z-50">
            <button onClick={handleGoHome} className="cursor-pointer group text-left">
              <h1 className="text-lg md:text-xl font-display italic text-white/80 group-hover:text-white transition-colors">
                Ellie David <span className="text-white/50 group-hover:text-white/70">Le'Voyage</span>
              </h1>
            </button>
            <button 
              onClick={() => setIsRegistering(true)} 
              className="bg-white/10 hover:bg-white hover:text-black backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-full text-[8px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 font-sans shadow-lg"
            >
              Reserve Spot
            </button>
          </header>

          {/* Center Content Area */}
          <main className="flex-1 relative flex items-start justify-center z-20 overflow-y-auto pt-4">
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
          <footer className="z-20">
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <ChatButton onClick={handleChatToggle} isOpen={isChatOpen} />
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/70 font-sans">
                Ellie David • Le'Voyage
              </p>
              {/* Spacer to keep text centered */}
              <div className="w-12"></div>
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
