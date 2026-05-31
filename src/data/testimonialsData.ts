import { Testimonial, SuccessStory, GoogleReview, SocialBadge } from '../types/testimonials';

export const testimonials: Testimonial[] = [
  {
    id: "t_1",
    name: "Rajesh Singhal",
    eventType: "Royal Wedding",
    location: "Shaktinagar",
    rating: 5,
    review: "In Sonbhadra, finding a reliable partner who does not desert you last minute is rare. Pawan and his team delivered a setup on-time that exceeded our expectations. The majestic gold drapery and robust waterproof luxury tents saved our evening despite unanticipated rain showers.",
    eventPhoto: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_2",
    name: "Sunita Misra",
    eventType: "Grand Reception",
    location: "Anpara",
    rating: 5,
    review: "The catering team served 1,800 guests with absolute professionalism. The traditional Avadhi spreads and live sweet counters were the talk of the town! Truly a stress-free experience for a host. From the layout draft to execution, everything was transparently coordinated.",
    eventPhoto: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_3",
    name: "Amit Dwivedi",
    eventType: "Thematic Wedding Setup",
    location: "Renusagar",
    rating: 5,
    review: "Faced with an extremely tight custom backdrop layout requirement, Om Tent House executed custom ceiling lights and pristine white stage upholstery. Absolute trust anchors. Standard of materials used is premium luxury; no rusted poles or torn canopies.",
    eventPhoto: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_4",
    name: "Priyanka Verma",
    eventType: "Milestone Birthday",
    location: "Sonbhadra Main",
    rating: 5,
    review: "They customized a gorgeous modern glass-like lighting setup for our outdoors patio theme. Everything was perfect, and they stayed on-site for emergency support throughout. Highly recommend!",
    eventPhoto: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"
  }
];

export const successStories: SuccessStory[] = [
  {
    id: "story_1",
    title: "The Regal Royal Pavilion Marriage",
    category: "Wedding",
    location: "Shaktinagar Ground",
    challenge: "Organizing a grand traditional wedding for 2,200 guests with customized royal gold draping, requiring 48-hour turn-around during peak monsoon-threat season in Sonbhadra district, where standard materials often yield water ingress.",
    solution: "Deployed structural military-grade waterproof inner-linings, dynamic slope-designed tents, and an elevated wooden-carpeted high-platform so that no waterlogged soil could affect the guests. Mobilized a dedicated 24-person team.",
    outcome: "A perfectly dry, breath-taking golden-hued palace setting that stayed completely insulated from external winter-monsoon winds. Not a single delayed item.",
    clientQuote: "Every promise made during consultation was executed with flawless precision.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_2",
    title: "The 1500-Plate Culinary Reception",
    category: "Reception",
    location: "Anpara Club Hall",
    challenge: "Providing premium traditional and multi-cuisine catering for 1,500 guests with immediate service, requiring active hot-holding kitchens without interrupting the visual aesthetics of the main premium reception stage.",
    solution: "Designed a twin-partition layout with secondary server tunnels and insulated modular catering kitchens out of sight. Served 8 signature regional sweets using fresh high-ingredient ghee cooked under Gopal Kumar's direct supervision.",
    outcome: "Flawless dining queue management. Hot, sumptuous food served directly. Universal acclaim from senior members for taste and hygiene.",
    clientQuote: "Our guests are still calling us to compliment the Shahi Paneer and hot Jalebi counters!",
    image: "https://images.unsplash.com/photo-1555507036-ab1e4006aa06?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_3",
    title: "Regional Academy Cultural Day",
    category: "School Function",
    location: "Auri Senior Secondary School",
    challenge: "Providing complex dynamic stage lighting, multi-point sound checks, and 2,000 attendee seating arrangement for kids' presentations, with strict safety-compliance regulations regarding heavy trusses and electrical wiring.",
    solution: "Built a ground-anchored heavy truss system disguised with velvet borders. Wrapped all electrical runs in high-density rubber conduits. Provided multi-tiered safe elevated staging for safe entry-exit points of performers.",
    outcome: "An incredibly energetic performance stage with perfect sound level distributions, completed with zero safety hazards during 6 hours of continuous student acts.",
    clientQuote: "The school board was exceptionally relieved by the proactive safety measures.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_4",
    title: "The Vintage 60th Jubilee Feast",
    category: "Birthday",
    location: "Renusagar VIP Colony",
    challenge: "Transforming a tight residential lawn into an intimate, warm nostalgic setup honoring a retired officer’s 60th birthday with sophisticated vintage aesthetics, without cluttering the passage.",
    solution: "Drafted an ambient garden layout with classic warm string-lights hung in beautiful geometric webs, rich leather accent seating, and a customized menu highlighting classic dishes from the 1970s.",
    outcome: "A deeply sentimental atmosphere combining modern luxury comfort with a warm nostalgic charm, comfortably accommodating 250 close relatives.",
    clientQuote: "It felt like stepping into an timeless dreamscape. Pawan's team is extraordinarily considerate.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
  }
];

export const googleReviews: GoogleReview[] = [
  {
    id: "gr_1",
    authorName: "Sanjeev Tripathi",
    rating: 5,
    relativeTime: "1 week ago",
    text: "Excellent service and high-quality material used in Anpara. Under leadership of Gopal, the team worked non-stop to ensure my sister's wedding went flawlessly.",
    location: "Anpara",
    verified: true
  },
  {
    id: "gr_2",
    authorName: "Vikram Soni",
    rating: 5,
    relativeTime: "1 month ago",
    text: "We deliver what we promise is 100% true. They did not abandon the venue decoration even when rain hit. Strongly recommended.",
    location: "Renusagar",
    verified: true
  },
  {
    id: "gr_3",
    authorName: "Meenakshi Dhar",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Best caterers in Shaktinagar/Sonbhadra. Transparent pricing, very cooperative owners, and top-class glass pane setups.",
    location: "Shaktinagar",
    verified: true
  },
  {
    id: "gr_4",
    authorName: "Pradeep Gupta",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Extremely tidy, beautiful lighting, and staff members are very well behaved. Highly professional.",
    location: "Sonbhadra",
    verified: true
  },
  {
    id: "gr_5",
    authorName: "Deepak Srivastava",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Punctual. Setup was ready 4 hours before the event started. Outstanding commitment.",
    location: "Auri",
    verified: true
  },
  {
    id: "gr_6",
    authorName: "Nitin Pandey",
    rating: 5,
    relativeTime: "4 months ago",
    text: "Unbeatable quality of royal main stage sofas and carpet lines. Felt exceptionally rich.",
    location: "Bina",
    verified: true
  }
];

export const socialBadges: SocialBadge[] = [
  {
    id: "badge_1",
    label: "On-Time Setup",
    iconName: "Clock",
    description: "Every steel frame, chandelier, and tablecloth is locked in place long before your first guest arrives."
  },
  {
    id: "badge_2",
    label: "Professional Execution",
    iconName: "Briefcase",
    description: "Uniformed experts, dedicated project managers, and immaculately sanitized culinary preparation structures."
  },
  {
    id: "badge_3",
    label: "Dedicated Event Support",
    iconName: "Shield",
    description: "On-site supervisors remain active throughout your function to handle adjustments on demand."
  },
  {
    id: "badge_4",
    label: "Reliable Team",
    iconName: "Users",
    description: "Never leaving work halfway. Under the direct leadership of Pawan & Gopal, our word is our bond."
  },
  {
    id: "badge_5",
    label: "Transparent Communication",
    iconName: "MessageSquare",
    description: "Honest itemized estimates, zero hidden setup overheads, and frequent milestone progress reports."
  }
];
