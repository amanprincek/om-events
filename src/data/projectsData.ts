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
      challenge: "Covering 18,000 square feet of raw local sports pasture with a fully insulated waterproof cathedral-style tent during unstable unseasonable windstorms in the Shaktinagar region.",
      planning: "Drafted a robust structural blueprint with ground-anchor heavy iron piles driven 4 feet deep. Integrated custom dual-layered gold fabric to block severe wind drafts and maintain stable ambient indoor temps.",
      execution: "A team of 28 trained craftsmen spent 72 continuous hours executing precision alignments. Embedded heavy safety wire ropes on overhead trusses and installed 15 premium crystal chandeliers with custom dimmer controls.",
      outcome: "A magnificent royal gold pavilion that remained completely stationary and watertight despite 45 km/h winds outside. The grand entrance sequence felt like a palace entrance."
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
      description: "How we transformed a muddy, uneven grass field into a world-class banquet paradise."
    },

    clientQuote: {
      text: "We were panic-stricken when we saw the weather forecasting storm winds, but Pawan Kumar was unfazed. When we arrived, the structure felt as strong and solid as a concrete building.",
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
      challenge: "Managing a high-volume catering flow for 1,500 elite guests while guaranteeing immediate service and preserving pristine luxury seating visuals without kitchen smoke or odor entering the main reception pavilion.",
      planning: "Conceived a modular twin-dome division using custom heat-insulated partitions. Formulated hidden servers-only logistics alleys to facilitate silent food transport.",
      execution: "Built a fully-ventilated secondary staging kitchen behind the main stage. Laid down high-gloss white flooring and organized 14 separate live-cooking counters run under direct supervision of Gopal Kumar.",
      outcome: "Served 42 rich regional dishes flawlessly. Hot desserts like our famous ghee-fried Jalebis reached tables in seconds with absolutely zero smoke ingress or guest blockages."
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
      description: "Transformation of a complex industrial warehouse yard into a pristine, high-end dining court."
    },

    clientQuote: {
      text: "The segregation of the catering area with custom soundproofing panels was pure genius. Our guests walked into a beautiful visual palace and dined with five-star efficiency.",
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
      challenge: "Setting up a high-power performance stage, massive LED backdrop, and stadium-level custom lighting with absolute, zero-fault safety parameters regarding ground wiring loops.",
      planning: "Plotted CAD-based load balance assessments for heavy trusses to prevent stage sagging. Configured a closed-network backup circuit with triple redundancy generators.",
      execution: "Suspended a massive visual star-canopy using 1.2 kilometers of warm twinkling fairy webs. Insulated and armored every single cable in solid rubber tiles to ensure child-safe movement across lawns.",
      outcome: "A spectacular, high-voltage rhythmic visual experience that supported a 6-hour continuous presentation flawlessly. The local administration lauded our absolute safety protocols."
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
      description: "Structural elevation of a pitch-dark grass plot into a professional performance amphitheater."
    },

    clientQuote: {
      text: "We had high-profile dignitaries attending, and power outages or wire hazards were simply not an option. Om Tent House delivered flawless technical execution and ironclad safety.",
      author: "Dr. K.P. Maurya",
      role: "Organizing Committee Head"
    }
  }
];

export const serviceBreakdown: ServiceDetail[] = [
  {
    title: "Bespoke Decoration",
    description: "Premium French drapery, silk panels, and exquisite fresh floral layouts customized specifically to lock and blend with your color theme.",
    icon: "Flower"
  },
  {
    title: "Luminescent Lighting",
    description: "Imported crystal chandeliers, computer-programmed warm kinetic fairy webs, dimmers, spot panels, and safety-grounded circuits.",
    icon: "Sparkles"
  },
  {
    title: "Premium Tent Structures",
    description: "All-season German hanger pavilions and heavy military-grade weather-insulated canopy roofs driven securely with deep ground piles.",
    icon: "Home"
  },
  {
    title: "Sovereign Catering",
    description: "Sumptuous traditional Avadhi, Punjabi, and continental culinary counters prepared cleanly under Gopal Kumar's strict inspection.",
    icon: "Utensils"
  },
  {
    title: "Stage & Truss Design",
    description: "High-load aluminum truss lines, safety guardrails, elevated main royal stages, and custom rich backdrops made to resist heavy winds.",
    icon: "Layers"
  },
  {
    title: "Luxury Lounge Furniture",
    description: "Maharaja-style high-back velvet chairs, customized dining couches, pristine table linens, and velvet banquet covers.",
    icon: "Armchair"
  },
  {
    title: "Silent Power Security",
    description: "High-capacity, completely insulated, silent power backup generator rigs to ensure your celebration never loses its spark.",
    icon: "Zap"
  }
];

export const regionalNodes: RegionNode[] = [
  {
    name: "Anpara",
    projectCount: 148,
    featuredProject: "The Grand Culinary Oasis",
    coordinates: { x: 18, y: 35 },
    description: "Our primary hub for peak culinary catering, large township receptions, and thematic outdoor buffet canopies."
  },
  {
    name: "Sonbhadra",
    projectCount: 204,
    featuredProject: "The Kinetic Starlight Jubilee",
    coordinates: { x: 48, y: 20 },
    description: "A major administrative region harboring grand wedding pavilions, corporate truss setups, and steel hanger installations."
  },
  {
    name: "Renusagar",
    projectCount: 95,
    featuredProject: "The Vintage 60th Jubilee Feast",
    coordinates: { x: 72, y: 48 },
    description: "Host of romantic garden lighting alignments, private residential elite lounges, and warm aesthetic string weaves."
  },
  {
    name: "Shaktinagar",
    projectCount: 122,
    featuredProject: "The Chandelier Pavilion",
    coordinates: { x: 32, y: 76 },
    description: "Home of our largest industrial heavy-wind waterproof wedding super-structures and grand multi-tier stages."
  },
  {
    name: "Nearby Regions",
    projectCount: 144,
    featuredProject: "Regional Academy Cultural Day",
    coordinates: { x: 84, y: 78 },
    description: "Spanning Bina, Auri, Kakri, and Shaktinagar Outskirts with safe staging, setups, and local festivals."
  }
];
