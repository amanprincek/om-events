import { Testimonial, SuccessStory, GoogleReview, SocialBadge } from '../types/testimonials';

export const testimonials: Testimonial[] = [
  {
    id: "t_1",
    name: "Rajesh Singhal",
    eventType: "Royal Wedding",
    location: "Shaktinagar",
    rating: 5,
    review: "Sonbhadra mein ek aisa trustworthy partner milna jo last-minute par dhokha na de, bohot mushkil hai. Pawan aur unki team ne bilkul time par kaam poora kiya aur apna vaada nibhaya. Unke heavy gold drapes aur waterproof structures ne hume achanak aayi baarish mein bacha liya.",
    eventPhoto: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_2",
    name: "Sunita Misra",
    eventType: "Grand Reception",
    location: "Anpara",
    rating: 5,
    review: "Humare 1,800 guests ko catering team ne bohot hi premium tareeqe se serve kiya. Traditional Avadhi khana aur live sweet counters ki sabne bohot tareef ki. Hum bilkul tension-free the. Layout se lekar execution tak sab transparent tha.",
    eventPhoto: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_3",
    name: "Amit Dwivedi",
    eventType: "Thematic Wedding Setup",
    location: "Renusagar",
    rating: 5,
    review: "Bohot hi kam time bacha tha par Om Tent House ne mere custom layout aur pristine white stage setup ko flawless tarike se taiyar kiya. Bilkul sacche aur bharosemand log hain. Materials aur sofa carpets ki quality ekdam nayi aur chamakdar thi, koi rusted poles nahi the.",
    eventPhoto: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t_4",
    name: "Priyanka Verma",
    eventType: "Milestone Birthday",
    location: "Sonbhadra Main",
    rating: 5,
    review: "Unhone humare outdoor birthday event ke liye ek shaandar glass-like lighting framework setup kiya. Har cheez perfect thi aur unki team emergency support ke liye pure event ke waqt wahin available thi. 100% recommended!",
    eventPhoto: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800"
  }
];

export const successStories: SuccessStory[] = [
  {
    id: "story_1",
    title: "The Regal Royal Pavilion Marriage",
    category: "Wedding",
    location: "Shaktinagar Ground",
    challenge: "Peak monsoon season mein Shaktinagar ke gile lawn par 2,200 guests ke liye royal gold draping wala ek grand wedding set khada karna, jahan ordinary tents mein paani bharne ka bada darr tha.",
    solution: "Hamari team ne elevated wooden carpet platforms taiyar kiye aur multi-layered waterproof inner canopy layout diya. 24 experts ne din-raat ek karke setup ko mitti aur paani se bilkul protected banaya.",
    outcome: "Ek behad khoobsurat, dry aur warm golden palace taiyar hua jo winter-monsoon ki tez hawaon ke beech bhi khada raha. Ek bhi second ka delay nahi hua.",
    clientQuote: "Jo vaada unhone humse meeting mein kiya tha, use poori tarah se nibhaya.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_2",
    title: "The 1500-Plate Culinary Reception",
    category: "Reception",
    location: "Anpara Club Hall",
    challenge: "1,500 guests ke reception ke liye immediate active food service maintain karna, bina main stage ke royal visual look ko disturb kiya ya kitchen ka dhuan andar aane diye.",
    solution: "Humne separate silent server galleries aur concealed staging kitchens banaye. Gopal Kumar ke supervision mein shuddh desi ghee se bane banquets aur 8 traditional sweets deliver kiye gaye.",
    outcome: "Catering queues bilkul smooth rahi aur garam-garam, lazeez khana direct tables tak pahucha. Cleanliness aur taste ke liye sabne Gopal ji ki team ko bohot saraha.",
    clientQuote: "Humare rishtedaar aaj bhi Shahi Paneer aur garma-garam desi ghee ki Jalebi ke swad ko yaad karte hain!",
    image: "https://images.unsplash.com/photo-1555507036-ab1e4006aa06?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_3",
    title: "Regional Academy Cultural Day",
    category: "School Function",
    location: "Auri Senior Secondary School",
    challenge: "2,000 students aur parents ke school event ke liye dynamic audio-visual aur seating deploy karna, jahan heavy aluminum wires aur live electric loops ko lekar kadi safety guidelines thi.",
    solution: "Structural aluminum truss ko safety boundary se lock kiya gaya. Har power line ko heavy rubber conduits mein pack kiya gaya taaki bachhon ke safety par ratti bhar ka bhi khatra na ho.",
    outcome: "6 ghante lagatar chale cultural presentation mein zero safety hazard raha. Audio aur lighting setup perfect chalne se school administration ne kafi relief zahir kiya.",
    clientQuote: "School management unki proactive safety aur responsive layout se behad khush tha.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "story_4",
    title: "The Vintage 60th Jubilee Feast",
    category: "Birthday",
    location: "Renusagar VIP Colony",
    challenge: "Ek retired officer ke 60th birthday ko khas banane ke liye Renusagar ke chhote lawn space ko ek elegant vintage aesthetic lounge mein badalna, bina kisi crowd blockage ke.",
    solution: "Humne warm nostalgic starlight pattern weaves aur space intelligent layout design kiya. Seating par custom leather elements aur 1970s ke hit traditional dishes ka menu design kiya.",
    outcome: "250 close relatives ke sath ek behad emotional aur premium family environment bana. Purani yaadein taaza karne ke liye badhiya warm atmosphere mila.",
    clientQuote: "Aisa laga jaise hum kisi rangeen haseen daur mein wapas laut aaye hain. Pawan Kumar ki team sach mein bohot thoughtful hai.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
  }
];

export const googleReviews: GoogleReview[] = [
  {
    id: "gr_1",
    authorName: "Sanjeev Tripathi",
    rating: 5,
    relativeTime: "1 week ago",
    text: "Anpara mein vakai bohot behtareen service aur high-quality materials hain. Gopal ji ke leadership mein team ne bilkul non-stop kaam karke behan ki shaadi flawless banyi.",
    location: "Anpara",
    verified: true
  },
  {
    id: "gr_2",
    authorName: "Vikram Soni",
    rating: 5,
    relativeTime: "1 month ago",
    text: "'Jo vaada karte hain, use nibhaate hain' bilkul sach hai. Tez baarish ke bawajood unhone kaam bich me nahi choda. Sab ko recommend karunga.",
    location: "Renusagar",
    verified: true
  },
  {
    id: "gr_3",
    authorName: "Meenakshi Dhar",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Shaktinagar/Sonbhadra area ke best caterers. Saaf hisab, cooperations aur premium glass frames setups toh dekhne layak hote hain.",
    location: "Shaktinagar",
    verified: true
  },
  {
    id: "gr_4",
    authorName: "Pradeep Gupta",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Tidy decoration, khubsoorat lighting aur inke team members ka behavior bohot badhiya hai- bilkul respectful aur cooperative.",
    location: "Sonbhadra",
    verified: true
  },
  {
    id: "gr_5",
    authorName: "Deepak Srivastava",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Behad punctual hain. Humare event shuru hone se 4 ghante pehle hi pura setup ready ho chuka tha. Gazab ki commitment hai.",
    location: "Auri",
    verified: true
  },
  {
    id: "gr_6",
    authorName: "Nitin Pandey",
    rating: 5,
    relativeTime: "4 months ago",
    text: "Unbeatable royal stage setups, royal sofas, and clean carpets. Pure luxurious feel aayi.",
    location: "Bina",
    verified: true
  }
];

export const socialBadges: SocialBadge[] = [
  {
    id: "badge_1",
    label: "On-Time Setup",
    iconName: "Clock",
    description: "Har ek steel frame, crystal chandelier aur table cloth aapke pehle mehmaan ke aane se 4 ghante pehle ready milta hai."
  },
  {
    id: "badge_2",
    label: "Professional Execution",
    iconName: "Briefcase",
    description: "Uniformed experts, dedicated project managers, aur Gopal Kumar ke guidance mein chalne wale hygienic kitchens."
  },
  {
    id: "badge_3",
    label: "Har Step Par Hamari Team Aapke Saath.",
    iconName: "Shield",
    description: "Humare on-site coordinators pure time venue par rehte hain taaki lighting ya layout changes ko turant satisfy kiya ja sake."
  },
  {
    id: "badge_4",
    label: "Reliable Team",
    iconName: "Users",
    description: "Hum dhokha nahi dete aur na hi kaam beech mein chhodte hain. Pawan aur Gopal Kumar ke direct leadership mein humara har vaada bilkul pakka hai."
  },
  {
    id: "badge_5",
    label: "Transparent Communication",
    iconName: "MessageSquare",
    description: "Sahi GST estimates, khula hisab-kitab aur zero hidden charges, taaki aapka budget aur planning hamesha control mein rahe."
  }
];
