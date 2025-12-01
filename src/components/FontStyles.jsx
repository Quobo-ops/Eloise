import React from 'react';

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

export default FontStyles;

