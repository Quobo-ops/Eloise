// Le'Voyage Chatbot Knowledge Base
// This document contains all the information the chatbot can reference

export const CHATBOT_KNOWLEDGE = {
  // Company Information
  company: {
    name: "Le'Voyage",
    tagline: "Your personal gateway to curated travel experiences",
    owner: "Ellie David",
    description: "Le'Voyage specializes in organizing group cruises and curated travel experiences. Every trip is thoughtfully managed, scheduled, and organized to create unforgettable memories.",
    services: [
      "Group Cruises",
      "Custom Itineraries", 
      "Cabin Selection",
      "Travel Planning"
    ]
  },

  // Featured Artist - Geno Delafose
  artist: {
    name: "Geno Delafose",
    nickname: "The Creole Cowboy",
    title: "Zydeco Legend",
    born: "February 6, 1971",
    birthplace: "Eunice, Louisiana",
    band: "French Rockin' Boogie",
    instruments: ["Button Accordion", "Piano Accordion", "Rubboard"],
    grammyNomination: "Le Cowboy Creole (2007)",
    ranch: "Double D Ranch",
    roles: ["Musician", "Cattle Farmer", "Car Hauler", "Evangeline Parish Constable"],
    father: "John Delafose (legendary zydeco accordionist)",
    bio: {
      short: "Geno Delafose is a Grammy-nominated zydeco musician known as 'The Creole Cowboy,' keeping authentic Louisiana Creole music alive with his band French Rockin' Boogie.",
      medium: "Born in Eunice, Louisiana, Geno Delafose carries the torch of authentic Zydeco music. Following his legendary father John Delafose, he joined the family band at age 8 and has spent over three decades electrifying audiences with his accordion mastery. His band French Rockin' Boogie blends traditional Creole music with blues, R&B, and country influences.",
      full: "Geno Delafose stands as living proof that tradition and vitality are not opposites. Born February 6, 1971 in Eunice, Louisiana, he has created the sound known as nouveau zydeco, deeply rooted in traditional Creole forms. His father was the legendary John Delafose, and at age eight Geno joined as rubboard player. In 1994, he debuted with French Rockin' Boogie on Rounder Records. He was Grammy-nominated for Le Cowboy Creole in 2007. A 53-year-old accordion-playing, French-speaking cattle farmer on Double D Ranch, he routinely juggles three to five gigs on most weekends."
    },
    highlights: [
      "Grammy Nominated for Le Cowboy Creole",
      "French Rockin' Boogie band leader",
      "Double D Ranch cattle farmer",
      "30+ years performing",
      "Son of legendary John Delafose",
      "Fluent French speaker",
      "Evangeline Parish Constable"
    ]
  },

  // Current Trips
  trips: {
    mediterranean: {
      name: "Mediterranean Magic",
      ship: "NCL's Epic",
      dates: "October 25 – November 1, 2026",
      duration: "7 Days / 6 Nights",
      route: "Rome to Barcelona",
      ports: ["Salerno", "Sicily", "Florence/Pisa", "Monaco", "Marseille"],
      pricing: {
        miniSuite: { price: "$1,329.10", description: "Spacious suite with premium amenities" },
        balcony: { price: "$1,158.10", description: "Private balcony with ocean views" },
        interior: { price: "$833.55", description: "Comfortable interior cabin" }
      },
      note: "Cabin rate only; port fees, packages, and insurance are priced separately",
      extras: [
        "Optional pre-tour in Rome",
        "Optional post-tour in Barcelona"
      ],
      destinations: {
        salerno: {
          name: "Salerno",
          country: "Italy",
          description: "Gateway to the stunning Amalfi Coast. Discover medieval architecture, visit the ancient ruins of Pompeii, or take a scenic drive along one of the world's most beautiful coastlines.",
          highlights: ["Amalfi Coast", "Pompeii & Herculaneum", "Ravello Gardens", "Salerno Cathedral"],
          detailedGuide: `Salerno occupies one of those rare positions in Italian travel—a city of genuine substance and beauty that most tourists rush past in their haste to reach the famous villages clinging to cliffs beyond. This oversight is the informed traveler's gain. Where the Amalfi Coast villages can feel overwhelmed by crowds, Salerno remains authentically southern Italian: a working port city where nonni play cards in shaded piazzas, where fish markets explode with the morning's catch, where the passeggiata along the waterfront promenade is performed with genuine local participation.

The Lungomare Trieste stretches for over a kilometer along the Gulf of Salerno, one of Italy's finest seaside promenades and the soul of the city's public life. Palm trees line the walkway, Belle Époque lampposts glow at dusk, and the views across the Tyrrhenian Sea toward the mountainous Amalfi peninsula create a backdrop of staggering beauty.

The medieval centro storico reveals itself through the Via dei Mercanti, a narrow pedestrian artery that once served as the city's commercial heart. Small shops sell local ceramics, limoncello, leather goods, and the anchovy products for which the nearby town of Cetara is famous. At its eastern end, the 11th-century Duomo di San Matteo rises unexpectedly, housing the crypt of Saint Matthew the Apostle himself.

The Castello di Arechi crowns the hill above the city, a Lombard and later Norman fortress offering panoramic views—the city's grid of streets below, the port where ferries depart for Amalfi and Positano, the distant silhouette of Capri on clear days.

As a base for exploring the entire region—the Amalfi Coast, Paestum's Greek temples, Pompeii, even Naples—Salerno offers excellent restaurants serving scialatielli ai frutti di mare at prices half what you'd pay in Positano, plus efficient ferry connections that let you explore without fighting traffic on the terrifying coastal road.`
        },
        sicily: {
          name: "Sicily",
          port: "Messina",
          country: "Italy", 
          description: "The largest Mediterranean island, rich in Greek temples, Norman churches, and Baroque towns. Visit Mount Etna, Europe's most active volcano, and taste authentic Sicilian cuisine.",
          highlights: ["Mount Etna", "Taormina", "Valley of the Temples", "Sicilian Street Food"],
          detailedGuide: `Messina greets every traveler who crosses from the Italian mainland with a declaration of arrival—the narrow strait that separates Calabria from Sicily has marked the threshold to this island world since antiquity. Homer placed Scylla and Charybdis in these waters, and even today the currents swirl with unusual force as the Tyrrhenian and Ionian seas collide.

The city presents broad avenues, Liberty-style architecture, and a rational grid—a city of resilience, of determined rebirth after the catastrophic 1908 earthquake. The Duomo di Messina anchors the central piazza, but the real marvel is the astronomical clock of the campanile, the largest and most complex in the world. At noon each day, crowds gather for the twelve-minute mechanical spectacle—a lion roars, a rooster crows, figures parade past in delightfully excessive Sicilian fashion.

The Strait of Messina itself deserves contemplation. The waterfront promenade provides views across to the Italian mainland, and the Regional Museum houses two Caravaggios—the Raising of Lazarus and the Adoration of the Shepherds—that alone justify a visit.

Messina functions brilliantly as a base for northeastern Sicily's wonders. Taormina, with its Greek theater and views of Etna and sea, lies just forty minutes south. Mount Etna—Europe's tallest and most active volcano—offers hiking, cable car ascents, and wine tasting on its fertile slopes. The markets bustle with Sicilian abundance—swordfish steaks, wild fennel, blood oranges, ricotta still warm from production.`
        },
        florence: {
          name: "Florence & Pisa",
          port: "Livorno",
          country: "Italy",
          description: "The cradle of the Renaissance. Marvel at Michelangelo's David, the Uffizi Gallery, and the iconic Leaning Tower of Pisa just a short journey away.",
          highlights: ["Uffizi Gallery", "Duomo di Firenze", "Leaning Tower of Pisa", "Ponte Vecchio"],
          detailedGuide: `Florence does not simply display art and history—it embodies them so completely that walking its streets feels like moving through a living museum where the Renaissance never ended. Every cobblestone carries the weight of genius: Brunelleschi, Michelangelo, Botticelli, Dante, the Medici dynasty that bankrolled an artistic revolution.

The Duomo—Santa Maria del Fiore—anchors the city with Brunelleschi's terracotta dome, an engineering feat that seemed impossible when completed in 1436. Climbing the 463 steps brings you face-to-face with Vasari's frescoes before emerging onto views where all of Florence spreads beneath you: the Arno glinting silver, terracotta rooftops punctuated by bell towers and cypress trees.

The Uffizi Gallery houses perhaps the greatest collection of Renaissance painting ever assembled. Botticelli's Birth of Venus stops visitors in their tracks, the goddess rising from seafoam in colors that seem to glow from within. Crossing the Ponte Vecchio afterward, lined with jewelers since the 16th century, you reach the Palazzo Pitti and Boboli Gardens.

Michelangelo's David at the Galleria dell'Accademia transcends its reputation—seventeen feet of Carrara marble transformed into human form with such anatomical precision the figure seems to breathe.

Pisa's Campo dei Miracoli earns its name through four white marble monuments rising from an emerald lawn. The Leaning Tower is genuinely startling in person, its tilt more dramatic than photographs suggest, and climbing its 294 spiral steps creates a disorienting thrill. The Duomo beside it holds Giovanni Pisano's Gothic masterpiece pulpit, and the Baptistery's acoustics produce otherworldly resonance.`
        },
        monaco: {
          name: "Monaco",
          port: "Villefranche-sur-Mer",
          country: "Monaco/France",
          description: "The glamorous principality on the French Riviera. Experience the legendary Monte Carlo Casino, the Prince's Palace, and the world-famous Grand Prix circuit.",
          highlights: ["Monte Carlo Casino", "Prince's Palace", "Oceanographic Museum", "Monaco Grand Prix Circuit"],
          detailedGuide: `Arriving on the French Riviera feels like stepping into a postcard where the Mediterranean shimmers in impossible shades of turquoise against dramatic coastal cliffs. Monaco and Villefranche-sur-Mer sit just a few kilometers apart yet offer remarkably different experiences—one a glittering sovereign city-state of wealth and spectacle, the other a quiet fishing village frozen in time.

Monaco demands to be experienced on foot, winding through its vertical maze of escalators, tunnels, and hairpin walkways. The Monte Carlo Casino square buzzes with energy—supercars idle at valet stands while tourists and residents sip espresso at the Café de Paris, watching the theater of wealth unfold. Walking the Formula 1 circuit through the streets gives you an appreciation for just how impossibly tight and treacherous this legendary race truly is.

The old town of Monaco-Ville, perched on "The Rock," offers a gentler pace—the Prince's Palace, the Oceanographic Museum founded by Jacques Cousteau, and narrow lanes lined with restaurants serving socca and pissaladière. The changing of the guard at 11:55 each morning draws crowds, and the views from the palace square across Port Hercule are worth lingering over.

Villefranche-sur-Mer provides the antidote to Monaco's intensity. Its deep natural harbor has sheltered ships since antiquity, and the waterfront today remains wonderfully unspoiled. The ochre and coral-painted buildings cascade down to a pebble beach, and the covered Rue Obscure, a 13th-century vaulted passageway, feels like discovering a secret. The Chapelle Saint-Pierre, decorated by Jean Cocteau with dreamlike frescoes, is a small treasure. Lunch at a waterfront restaurant—fresh grilled fish, a crisp rosé, the sun warming your shoulders—becomes an indelible travel memory.`
        },
        marseille: {
          name: "Marseille",
          country: "France",
          description: "France's oldest city and largest port on the Mediterranean. Explore the historic Vieux-Port, visit the stunning Basilique Notre-Dame de la Garde, and savor authentic bouillabaisse.",
          highlights: ["Vieux-Port Harbor", "Notre-Dame de la Garde", "Le Panier District", "Calanques National Park"],
          detailedGuide: `Marseille is not a city that reveals itself gently—it grabs you by the collar and pulls you into its chaos, its beauty, its contradictions. As France's oldest city, founded by Greek sailors around 600 BC, it carries 2,600 years of history while pulsing with the raw energy of a modern Mediterranean port. This is not the manicured Riviera of designer boutiques; this is a working city where fishing boats still unload their catch each morning and where a dozen languages fill the air in any given market.

The Vieux-Port remains the city's beating heart, a natural harbor ringed by cafés and watched over by imposing forts. The daily fish market on the Quai des Belges is theater itself—weathered fishermen hawk the morning's catch of rascasse, sea bream, and the small rockfish essential for authentic bouillabaisse. The Norman Foster-designed mirrored canopy creates an otherworldly experience, reflecting water and sky.

Rising above everything is Notre-Dame de la Garde, the basilica crowned by a golden Madonna that Marseillais call "La Bonne Mère." The climb rewards you with a 360-degree panorama—terracotta rooftops tumbling toward the sea, the wild limestone ridges of the Calanques stretching toward Cassis. Inside, walls are covered with ex-votos left by sailors thanking the Virgin for protection at sea.

Le Panier, the city's oldest neighborhood, has transformed into a vibrant quarter of street art and artisan workshops. The Vieille Charité, a 17th-century almshouse, now houses museums of Mediterranean archaeology and African art.

The Calanques National Park offers one of Europe's most dramatic coastal landscapes—narrow inlets carved into white limestone cliffs plunging into crystalline blue water. The hike to Calanque de Sugiton takes you from urban grit to primordial wilderness within an hour.

Eating in Marseille is cultural archaeology. Bouillabaisse must be ordered in advance and eaten ceremonially—broth served first with rouille and croutons, fish following on a separate platter. Beyond this famous dish lies cuisine shaped by immigration: Armenian lahmacun, Algerian couscous, Senegalese mafé, Italian panisses.`
        }
      }
    }
  },

  // Booking Information
  booking: {
    process: [
      "Browse available trips and select your preferred journey",
      "Choose your cabin type based on your preferences and budget",
      "Click 'Reserve Spot' to start the booking process",
      "Fill in guest information including name, date of birth, and contact details",
      "Review your booking details",
      "Complete your deposit to secure your reservation"
    ],
    depositInfo: "A deposit is required to secure your cabin. Final payment details will be provided after booking.",
    cancellationPolicy: "Please inquire about our cancellation policy when booking.",
    groupDiscounts: "Group rates may be available for parties of 8 or more travelers."
  },

  // Frequently Asked Questions
  faq: [
    {
      question: "What's included in the cabin price?",
      answer: "The cabin price includes your accommodation, meals at the main dining rooms and buffet, entertainment, and access to ship amenities. Port fees, drink packages, specialty dining, shore excursions, and travel insurance are priced separately."
    },
    {
      question: "What's the difference between cabin types?",
      answer: "Interior cabins are windowless but comfortable and budget-friendly. Balcony cabins feature a private outdoor space with ocean views. Mini-Suites offer extra space and premium amenities for a more luxurious experience."
    },
    {
      question: "Are shore excursions included?",
      answer: "Shore excursions are not included in the cabin price but can be booked separately. You're also free to explore ports independently."
    },
    {
      question: "What about travel insurance?",
      answer: "Travel insurance is highly recommended and can be purchased separately. It typically covers trip cancellation, medical emergencies, and lost luggage."
    },
    {
      question: "Can I book for a group?",
      answer: "Absolutely! Le'Voyage specializes in group travel. Group rates may be available for parties of 8 or more."
    },
    {
      question: "What documents do I need?",
      answer: "You'll need a valid passport for international cruises. Some destinations may require visas. Check entry requirements for each country on your itinerary."
    },
    {
      question: "How do I get to the departure port?",
      answer: "The Mediterranean Magic cruise departs from Rome (Civitavecchia port). Optional pre-tour packages in Rome are available, or you can arrange your own transportation to the port."
    },
    {
      question: "What's the best time to book?",
      answer: "Booking early ensures the best cabin selection and pricing. Popular sailings can fill up quickly, especially for desirable cabin categories."
    }
  ],

  // Chatbot Personality & Responses
  chatbot: {
    name: "Le'Voyage Assistant",
    personality: "Friendly, knowledgeable, and helpful travel consultant",
    greeting: "Welcome to Le'Voyage! I'm here to help you plan your perfect Mediterranean adventure. What would you like to know?",
    fallbackResponse: "I'd be happy to help with that! For detailed inquiries or to start your booking, please click the 'Reserve Spot' button above. Is there anything else about our trips I can tell you?",
    topicsCanHelp: [
      "Trip details and itineraries",
      "Cabin options and pricing",
      "Destination information",
      "Booking process",
      "What's included",
      "Travel requirements"
    ]
  }
};

// Helper function to generate contextual responses
export function generateResponse(userMessage) {
  const message = userMessage.toLowerCase();
  const knowledge = CHATBOT_KNOWLEDGE;
  const destinations = knowledge.trips.mediterranean.destinations;
  
  // Geno Delafose queries
  if (message.includes('geno') || message.includes('delafose') || message.includes('creole cowboy') || message.includes('zydeco') || message.includes('accordion') || message.includes('french rockin')) {
    const artist = knowledge.artist;
    return `${artist.name}, "The Creole Cowboy," is a Grammy-nominated zydeco legend from Eunice, Louisiana. He leads French Rockin' Boogie and has spent 30+ years keeping authentic Creole music alive.`;
  }
  
  // Artist music/performance queries
  if (message.includes('music') || message.includes('band') || message.includes('perform') || message.includes('concert') || message.includes('artist') || message.includes('entertainment')) {
    return `Geno Delafose and French Rockin' Boogie bring authentic Louisiana zydeco to the cruise! He plays button and piano accordion, blending Creole traditions with blues, R&B, and country.`;
  }
  
  // Activities/Things to do queries (check first for follow-ups)
  if (message.includes('do there') || message.includes('activities') || message.includes('things to do') || message.includes('what to do') || message.includes('see there')) {
    return `Each port offers unique experiences—visit Mount Etna in Sicily, the Uffizi in Florence, Monte Carlo Casino in Monaco, and the Calanques in Marseille. Salerno is your gateway to the Amalfi Coast and Pompeii.`;
  }
  
  // Food/Eat queries
  if (message.includes('eat') || message.includes('food') || message.includes('restaurant') || message.includes('cuisine') || message.includes('dining') || message.includes('meal')) {
    return `Try swordfish and arancini in Sicily, ribollita in Florence, bouillabaisse in Marseille, and fresh seafood along the Amalfi Coast. The ship also offers multiple dining venues included in your fare.`;
  }
  
  // Specific destination queries - Salerno
  if (message.includes('salerno') || message.includes('amalfi') || message.includes('pompeii')) {
    return `Salerno is your gateway to the Amalfi Coast—a charming port with the Lungomare promenade and a cathedral housing Saint Matthew's relics. From here, explore Pompeii, Positano, and enjoy authentic Italian cuisine.`;
  }
  
  // Sicily/Messina
  if (message.includes('sicily') || message.includes('messina') || message.includes('etna') || message.includes('taormina')) {
    return `Sicily welcomes you through Messina, where mythic waters meet dramatic coastline. Visit Mount Etna, the jewel town of Taormina, and don't miss the Duomo's noon astronomical clock show.`;
  }
  
  // Florence/Pisa
  if (message.includes('florence') || message.includes('pisa') || message.includes('livorno') || message.includes('uffizi') || message.includes('david') || message.includes('renaissance')) {
    return `Florence is where the Renaissance lives—see Michelangelo's David, Botticelli at the Uffizi, and Brunelleschi's dome. The Leaning Tower of Pisa is an hour away.`;
  }
  
  // Monaco
  if (message.includes('monaco') || message.includes('villefranche') || message.includes('monte carlo') || message.includes('riviera') || message.includes('casino') || message.includes('f1') || message.includes('formula')) {
    return `Monaco dazzles with Monte Carlo Casino glamour and the legendary F1 circuit. Nearby Villefranche-sur-Mer offers a quiet fishing village with waterfront restaurants and crisp rosé.`;
  }
  
  // Marseille
  if (message.includes('marseille') || message.includes('bouillabaisse') || message.includes('calanques') || message.includes('vieux-port') || message.includes('notre-dame')) {
    return `Marseille has 2,600 years of history—explore the Vieux-Port fish market, climb to Notre-Dame de la Garde, and hike the stunning Calanques. Try authentic bouillabaisse before you leave.`;
  }
  
  // Price-related queries
  if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('cabin')) {
    const pricing = knowledge.trips.mediterranean.pricing;
    return `Cabin options: Interior ${pricing.interior.price}, Balcony ${pricing.balcony.price}, Mini-Suite ${pricing.miniSuite.price}. Port fees, packages, and insurance priced separately.`;
  }
  
  // Destination queries (general)
  if (message.includes('destination') || message.includes('port') || message.includes('visit') || message.includes('where') || message.includes('stop')) {
    return `We visit Salerno, Sicily, Florence/Pisa, Monaco, and Marseille. Ask about any destination!`;
  }
  
  // Date queries
  if (message.includes('when') || message.includes('date') || message.includes('schedule')) {
    const trip = knowledge.trips.mediterranean;
    return `The cruise sails ${trip.dates}, ${trip.duration} from ${trip.route}. Ready to book?`;
  }
  
  // Booking queries
  if (message.includes('book') || message.includes('reserve') || message.includes('how do i') || message.includes('sign up')) {
    return `Click 'Reserve Spot' at the top—you'll select your cabin, enter guest details, and secure with a deposit.`;
  }
  
  // What's included
  if (message.includes('include') || message.includes('what do i get')) {
    return `Price includes cabin, meals, entertainment, and port visits. Port fees, drinks, excursions, and insurance are separate.`;
  }
  
  // Ship queries
  if (message.includes('ship') || message.includes('ncl') || message.includes('epic') || message.includes('cruise line')) {
    return `We're sailing NCL's Epic—restaurants, Broadway shows, pools, spa, and casino. One of Norwegian's most popular ships!`;
  }
  
  // Greeting
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.length < 10) {
    return `Welcome to Le'Voyage! Ask me about destinations, pricing, or booking.`;
  }
  
  // Help/what can you do
  if (message.includes('help') || message.includes('what can you')) {
    return `I can help with Geno Delafose, destinations, pricing, and booking. What interests you?`;
  }
  
  // Default response
  return `I can help with Geno Delafose, destinations, pricing, or booking. Try asking about the artist or a specific port!`;
}

