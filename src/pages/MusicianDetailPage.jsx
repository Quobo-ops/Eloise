import React from 'react';

const MusicianDetailPage = ({ onBack }) => (
  <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-stretch">
      
      {/* Left - Artist Video */}
      <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up">
          Featured Artist
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden flex-grow animate-fade-up">
          <div className="aspect-[3/4] sm:aspect-[4/5] relative">
            <video 
              src="/geno-video.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale"
              poster="/geno-poster.jpg"
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
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-sans mb-1 sm:mb-2">
                The Creole Cowboy
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-white">
                Geno Delafose
              </h2>
              <p className="text-white/60 font-sans text-xs sm:text-sm mt-1 sm:mt-2">
                Keeping Zydeco Alive
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right - Artist Bio */}
      <div className="p-2 sm:p-4 lg:p-8 flex flex-col">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-sans mb-4 sm:mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          About the Artist
        </p>
        
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col flex-grow animate-fade-up overflow-y-auto max-h-[450px] sm:max-h-[500px] lg:max-h-[600px] custom-scrollbar" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4 sm:space-y-5">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-white mb-2 sm:mb-3">
                The Sound of Louisiana
              </h3>
              <div className="h-px w-12 sm:w-16 bg-amber-400/60 mb-3 sm:mb-4"></div>
            </div>
            
            <p className="text-white/90 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
              Geno Delafose stands as living proof that tradition and vitality are not opposites—that the old ways, played with fire and conviction, can pack dance floors from the bayou country of southwest Louisiana to concert halls across the world. Born February 6, 1971 in Eunice, Louisiana, he has created the sound known as nouveau zydeco, deeply rooted in traditional Creole forms with strong influences from Cajun, country, and blues.
            </p>
            
            <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed">
              His father was the legendary zydeco accordionist John Delafose. At age eight, Geno joined his father's band as a rubboard player and continued performing with them until his father's passing in 1994. The education was comprehensive—not just mechanics of rhythm and melody, but the philosophy of entertaining and the responsibility to the people who came to dance.
            </p>
            
            <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed hidden sm:block">
              In 1994, he debuted with the album French Rockin' Boogie on Rounder Records—the name that became his band's identity. He was nominated for a Grammy Award for his 2007 album Le Cowboy Creole, a title capturing his dual identity as authentically as his music does.
            </p>
            
            <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed hidden md:block">
              A 53-year-old accordion-playing, French-speaking cattle farmer, car hauler, and Evangeline Parish constable, he routinely juggles three to five gigs on most weekends. He divides his time between touring and operating his Double D Ranch outside Eunice, where he breeds cattle and raises quarter horses. To see Geno perform is to witness a man doing exactly what he was born to do.
            </p>
            
            {/* Highlights */}
            <div className="border-t border-white/20 pt-3 sm:pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans mb-2 sm:mb-3">Legacy</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Grammy Nominated', 'Le Cowboy Creole', 'French Rockin\' Boogie', 'Double D Ranch', 'Eunice, Louisiana', '30+ Years'].map((item, i) => (
                  <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-[10px] sm:text-xs text-amber-200/90 font-sans">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Back button */}
          <button 
            onClick={onBack}
            className="mt-4 sm:mt-6 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white font-sans transition-colors flex items-center gap-2 flex-shrink-0 py-2"
          >
            ← Back to Cruise Details
          </button>
        </div>
      </div>
      
    </div>
  </div>
);

export default MusicianDetailPage;

