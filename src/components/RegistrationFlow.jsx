import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { TRIPS } from '../data/trips';

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
        <div className="text-center space-y-6 md:space-y-8 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-white/90">{tripDetails.title}</h2>
          <div className="h-px w-16 bg-white/20 mx-auto"></div>
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-60 font-sans">{tripDetails.dates}</p>
          <button 
            onClick={handleNext} 
            className="mt-6 md:mt-8 px-8 md:px-10 py-3 md:py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors uppercase text-[9px] font-bold tracking-[0.2em] font-sans shadow-[0_0_20px_rgba(255,255,255,0.3)]"
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
        <div className="space-y-6 md:space-y-8 w-full max-w-md px-4 md:px-0">
          <div className="group">
            <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Full Legal Name <span className="normal-case tracking-normal opacity-70 hidden sm:inline">(As it appears on your passport)</span></label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-3 md:py-2 focus:outline-none focus:border-white transition-colors text-lg md:text-xl font-display placeholder:text-white/10" 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="group">
               <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Date of Birth</label>
               <input 
                 type="text" 
                 value={formData.dateOfBirth}
                 onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                 placeholder="MM/DD/YYYY"
                 className="w-full bg-transparent border-b border-white/20 py-3 md:py-2 focus:outline-none focus:border-white font-sans text-base md:text-sm placeholder:text-white/20" 
               />
            </div>
            <div className="group">
               <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Mobile Phone</label>
               <input 
                 type="tel" 
                 value={formData.phone}
                 onChange={(e) => handleInputChange('phone', e.target.value)}
                 className="w-full bg-transparent border-b border-white/20 py-3 md:py-2 focus:outline-none focus:border-white font-sans text-base md:text-sm" 
               />
            </div>
          </div>
          <div className="group">
             <label className="text-[9px] uppercase tracking-widest opacity-40 mb-2 block font-sans">Email Address</label>
             <input 
               type="email" 
               value={formData.email}
               onChange={(e) => handleInputChange('email', e.target.value)}
               className="w-full bg-transparent border-b border-white/20 py-3 md:py-2 focus:outline-none focus:border-white font-sans text-base md:text-sm" 
             />
          </div>
        </div>
      )
    },
    {
      id: 'stateroom',
      title: "Select Stateroom",
      component: (
        <div className="space-y-3 md:space-y-4 w-full max-w-md font-sans px-4 md:px-0">
          {tripDetails.pricing.map(option => (
            <button 
              key={option.type} 
              onClick={() => setSelectedCabin(option.type)} 
              className={`w-full border px-4 md:px-6 py-4 md:py-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
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
        <div className="space-y-4 md:space-y-6 w-full max-w-md px-4 md:px-0">
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 md:pb-6 mb-4 md:mb-6">
              <span className="font-display text-xl md:text-2xl italic text-white/90">{tripDetails.title}</span>
            </div>
            <div className="space-y-3 text-sm opacity-70 font-sans tracking-wide">
              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Guest</span>
                <span className="truncate text-right">{formData.fullName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Email</span>
                <span className="truncate text-right">{formData.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="flex-shrink-0">Phone</span>
                <span className="truncate text-right">{formData.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 mt-3">
                <span>{selectedCabin || 'No cabin selected'}</span>
                <span>${getPrice()}</span>
              </div>
            </div>
          </div>
          <div className="text-center pt-2 md:pt-4">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold uppercase text-[9px] tracking-[0.2em] rounded-full hover:scale-[1.02] transition-transform font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Reservation Request'}
            </button>
            <p className="text-[9px] mt-4 md:mt-5 opacity-30 uppercase tracking-widest font-sans">Ellie David • Events by Le'Voyage</p>
          </div>
        </div>
      )
    },
    {
      id: 'done',
      component: (
        <div className="text-center px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-green-400/20 flex items-center justify-center mx-auto mb-6 sm:mb-8 bg-green-900/10 backdrop-blur-md">
            <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic mb-3 sm:mb-4 text-white/90">Request Received.</h2>
          <p className="opacity-50 text-xs mb-8 sm:mb-12 font-sans tracking-wide leading-relaxed max-w-xs mx-auto">We will check availability and call you shortly to confirm.</p>
          <button 
            onClick={onClose} 
            className="text-[9px] uppercase tracking-[0.2em] border-b border-white/20 pb-1 hover:border-white transition-colors text-white/60 hover:text-white font-sans py-2 px-4"
          >
            Return Home
          </button>
        </div>
      )
    }
  ];

  const currentQ = questions[step];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl text-white flex flex-col items-center justify-center overflow-y-auto safe-area-top safe-area-bottom">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-4 opacity-50 hover:opacity-100 transition-opacity z-10"
      >
        <X size={20}/>
      </button>
      <div className={`w-full max-w-xl px-4 md:px-8 py-16 md:py-8 transition-all duration-500 transform ${fade}`}>
        {currentQ.title && (
          <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30 mb-8 md:mb-12 text-center font-sans">
            {currentQ.title}
          </h3>
        )}
        <div className="flex flex-col items-center">{currentQ.component}</div>
        {step > 0 && step < questions.length - 1 && (
          <div className="flex justify-center mt-8 md:mt-12">
            <button 
              onClick={() => setStep(s => s - 1)} 
              className="text-[9px] uppercase tracking-[0.2em] opacity-30 hover:opacity-80 transition-opacity font-sans py-2 px-4"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationFlow;

