import { SignatureProject, RegionNode, ServiceDetail } from '../types/projects';

export const signatureProjects: SignatureProject[] = [
  {
    id: "proj_shaktinagar_palace",
    name: "The Golden Chandelier Pavilion",
    eventType: "Elite Royal Wedding",
    location: "VIP Club Grounds, Shaktinagar",
    capacity: "2,200 Invited Guests",
    date: "November 2025",
    servicesDelivered: ["Waterproof Super-Structure", "French Imperial Drapery", "Warm Light Canopy", "High-End Banquet Furniture", "Royal Stage Trusses"],
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    
    story: {
      challenge: "Shaktinagar region mein unseasonable tez hawaon aur aandhi-toofan ke beech 18,000 square feet ke vacant ground par ek fully waterproof cathedral-style heavy structure setup karna sabse bada challenge tha.",
      planning: "Hamari team ne 4 feet gehre solid iron anchor piles ke sath ek heavy structural layout design kiya. Iske baad custom dual-layered gold fabric drapery lagayi gayi taaki bahar ki tez hawa stop ho sake aur andar ka temperature stable rahe.",
      execution: "Gopal aur Pawan Kumar ke leadership mein 28 trained artisans ne lagatar 72 ghante kaam karke is setup ko khada kiya. Saari overhead trusses mein heavy safety ropes fit kiye gaye aur custom dimmers ke sath 15 crystal chandeliers install kiye.",
      outcome: "Tension-free bharosa! Bahar 45 km/h ki tez hawayein aur baarish hone ke bawajood pura royal gold pavilion ekdam solid aur completely waterproof raha. Guests ke liye entrance sequence bilkul ek mahal jaisa lag raha tha."
    },

    scaleIndicators: {
      guests: "2,200+",
      duration: "72 Hours",
      staff: "28 Craftsmen",
      tentScale: "18,000 Sq Ft"
    },

    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&q=80&w=1200",
      beforeLabel: "Ground Zero: Vacant VIP Sports Pasture",
      afterUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
      afterLabel: "Ascension: Golden Handcrafted Masterpiece",
      description: "Dekhiye kaise humne ek blank gile mitti wale maidan ko ek royal banquet palace mein badal diya."
    },

    clientQuote: {
      text: "Weather forecast mein tez toofan dekhkar hum bohot ghabra gaye the, par Pawan Kumar ne kaha ki aap fikar mat kijiye. Jab hum venue par pahuche, toh setup ekdam concrete building jaisa majboot aur safe tha. Hum jo vaada karte hain, use poora karte hain!",
      author: "Akhilesh Dwivedi",
      role: "Father of the Bride"
    }
  },
  {
    id: "proj_anpara_reception",
    name: "The Grand culinary Oasis",
    eventType: "Mega Reception & Culinary Fest",
    location: "Anpara Township Greens",
    capacity: "1,500 Gastronomy Connoisseurs",
    date: "December 2025",
    servicesDelivered: ["Premium Dual-Section Partition", "Concealed Gourmet Kitchens", "Maharaja Lounge Setups", "Kinetic Ambient Spotlights", "Signature Sweet Live Counters"],
    heroImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200",
    
    story: {
      challenge: "1,500 VIP guests ke liye heavy catering flow manage karna, bina kisi delay ke hot fresh food serve karna, aur kitchen ka dhuan ya smell main luxury seating area tak na pahuchne dena humare samne ek badi zimmewari thi.",
      planning: "Humne custom heat-insulated partitions se modular twin-dome layout design kiya. Iske alawa, silent service ke liye servers-only secret logistics alleys banayi gayi taaki khana bina kisi shor ke move ho sake.",
      execution: "Main stage ke theek peeche ek high-ventilation service kitchen banaya gaya. Pure dining area mein pristine high-gloss white flooring lagayi gayi aur Gopal Kumar ke direct supervision mein 14 live-cooking counters lagaye gaye.",
      outcome: "Poore 42 rich regional delicacies ko bina kisi blockage ke serve kiya gaya. Humari special ghee-fried Jalebi aur garam rabri guests tak seconds mein garam-garam pahuchi, aur dhuen ka koi nishaan tak nahi tha."
    },

    scaleIndicators: {
      guests: "1,500+",
      duration: "48 Hours",
      staff: "35 Culinary Staff",
      tentScale: "12,500 Sq Ft"
    },

    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1505232458627-5671a58a7014?auto=format&fit=crop&q=80&w=1200",
      beforeLabel: "Before: Raw Warehouse & Wet Lawn",
      afterUrl: "https://images.unsplash.com/photo-1555507036-ab1e4006aa06?auto=format&fit=crop&q=80&w=1200",
      afterLabel: "After: Pristine White Banquet Canopy",
      description: "Ek raw industrial warehouse yard ko humne ek shaandar, ultra-luxurious dining court mein transform kar diya."
    },

    clientQuote: {
      text: "Catering area ko custom acoustics panel se alag karne ka plan sabse behtareen tha. Humare saare mehmaan ek behad khoobsurat palace mein dakhil hue aur 5-star quality ke sath khane ka lutf uthaya.",
      author: "Shweta Singhal",
      role: "Event Curator"
    }
  },
  {
    id: "proj_sonbhadra_lights",
    name: "The Kinetic Starlight Jubilee",
    eventType: "Grand Corporate & Staging Gala",
    location: "Sanskriti Hall Grounds, Sonbhadra",
    capacity: "3,000 Attendees",
    date: "March 2026",
    servicesDelivered: ["Overhead Heavy Truss Arrays", "Rubber-Insulated Conduits", "DMX Custom Programmed Lighting", "Grand Entrance Matrix", "150kVA Silent Generators"],
    heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
    
    story: {
      challenge: "Ek high-power performance stage, bada LED backdrop aur stadium-level heavy lighting install karna, woh bhi zero-fault safety parameters aur complete ground wire padding ke sath, ek bada task tha.",
      planning: "Hamari team ne stage security ke liye detailed digital load balance planning ki. Power failure se bachne ke liye triple backup generator circuits setup kiye gaye.",
      execution: "Lagbhag 1.2 kilometers lambi golden twinkling fairy lights aur warm chandeliers se chamakta star-canopy banaya gaya. Safety ke liye har ek electrical cable ko solid safety rubber tiles ke andar waterproof kiya gaya.",
      outcome: "Lagatar 6 ghante tak bina kisi minor glitch ke pura function successfully chala. Local administration aur management ne humare high security aur safety wire networks ki bohot taareef ki."
    },

    scaleIndicators: {
      guests: "3,000+",
      duration: "36 Hours",
      staff: "22 Light Engineers",
      tentScale: "22,000 Sq Ft Layout"
    },

    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
      beforeLabel: "Before: Dark, Raw Open Ground",
      afterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
      afterLabel: "After: Ray Of Luminescence & Safety Staging",
      description: "Ek sunsan gile andhere maidan ko humne ek professional, dynamic light aur sound amphitheater mein transform kiya."
    },

    clientQuote: {
      text: "Event mein bohot bade VIPs aane wale the, isliye power cut ya wire safety par koi compromise nahi ho sakta tha. Om Tent House ne behtareen quality aur 100% safe execution dikhaya.",
      author: "Dr. K.P. Maurya",
      role: "Organizing Committee Head"
    }
  }
];

export const serviceBreakdown: ServiceDetail[] = [
  {
    title: "Bespoke Decoration",
    description: "Premium French drapery, silk panels, aur fresh original floral decoration, jo bilkul aapke custom family color theme ke sath blend karega.",
    icon: "Flower"
  },
  {
    title: "Luminescent Lighting",
    description: "Imported crystal chandeliers, computer-programmed warm starlight webs, dimmers, spot panels, aur completely safe grounded generator connections.",
    icon: "Sparkles"
  },
  {
    title: "Premium Tent Structures",
    description: "Har season ke liye waterproof German hanger structures aur heavy wind-resistant premium drapes, jinhe solid heavy iron piles se ground kiya jata hai.",
    icon: "Home"
  },
  {
    title: "Sovereign Catering",
    description: "Swadishth traditional Avadhi, Punjabi, aur multi-cuisine pakwan jo Gopal Kumar ke strict supervision ke andar poori hygiene aur shuddh ghee se banaye jate hain.",
    icon: "Utensils"
  },
  {
    title: "Stage & Truss Design",
    description: "Heavy load-bearing aluminum trusses, safety side-railings, elevated royal main stages, aur wind-proof backdrops jo tej aandhi mein bhi hil nahi sakte.",
    icon: "Layers"
  },
  {
    title: "Luxury Lounge Furniture",
    description: "Maharaja-style high-back velvet royal chairs, customized dining lounges, saaf-suthri table sheets, aur velvet banquet coverings jo premium look deti hain.",
    icon: "Armchair"
  },
  {
    title: "Silent Power Security",
    description: "High-capacity completely silent power backup generator rigs taaki aapki poori shaadi bina kisi power cut ke dhoom-dham se chalti rahe.",
    icon: "Zap"
  }
];

export const regionalNodes: RegionNode[] = [
  {
    name: "Anpara",
    projectCount: 148,
    featuredProject: "The Grand Culinary Oasis",
    coordinates: { x: 18, y: 35 },
    description: "Hamara primary hub jo pure catering service, badi township receptions aur royal buffet canopies ke liye mashhoor hai."
  },
  {
    name: "Sonbhadra",
    projectCount: 204,
    featuredProject: "The Kinetic Starlight Jubilee",
    coordinates: { x: 48, y: 20 },
    description: "Ek major administrative district jahan humne सैकड़ों grand wedding pavilions, structural trusses, aur waterproof hangers install kiye hain."
  },
  {
    name: "Renusagar",
    projectCount: 95,
    featuredProject: "The Vintage 60th Jubilee Feast",
    coordinates: { x: 72, y: 48 },
    description: "Aesthetic garden lighting, private luxury lounges, aur warm romantic fairy stars lighting setups ka mashhoor center."
  },
  {
    name: "Shaktinagar",
    projectCount: 122,
    featuredProject: "The Chandelier Pavilion",
    coordinates: { x: 32, y: 76 },
    description: "Yahan hum sabse bade waterproof wedding structures, German hanging domes aur grand multi-tier stages deliver karte hain."
  },
  {
    name: "Nearby Regions",
    projectCount: 144,
    featuredProject: "Regional Academy Cultural Day",
    coordinates: { x: 84, y: 78 },
    description: "Bina, Auri, Kakri, aur aas-paas ke ilake jahan hamari team custom layout design aur complete event operations karti hai."
  }
];
