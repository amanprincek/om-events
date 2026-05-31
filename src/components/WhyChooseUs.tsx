import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Users, 
  Workflow, 
  HelpCircle,
  Gem,
  Award,
  BookOpen,
  MessageSquareDiff,
  Flame,
  ChevronDown,
  Info,
  CalendarCheck,
  Building,
  UserCheck,
  Check,
  ArrowRight,
  Sparkles,
  Smartphone,
  PhoneCall,
  Lock
} from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge, Card, Button } from '@om-tent/ui-system';
import AnimatedCounter from './AnimatedCounter';

interface CustomerFear {
  id: string;
  question: string;
  fearTitle: string;
  fearDesc: string;
  solutionTitle: string;
  solutionDesc: string;
}

interface TrustPillar {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
}

interface ComparisonMetric {
  title: string;
  category: string;
  competitor: string;
  omTent: string;
}

export default function WhyChooseUs() {
  const [activeFearId, setActiveFearId] = useState<string>("fear_1");
  const [activeComparisonTab, setActiveComparisonTab] = useState<'planning' | 'execution' | 'reliability' | 'communication' | 'accountability'>('planning');

  const customerFears: CustomerFear[] = [
    {
      id: "fear_1",
      question: "Kya setup bilkul time par taiyar ho jayega?",
      fearTitle: "Last-minute ki tension aur khali ground ka darr",
      fearDesc: "Bohot se local tent vendors ek hi din bohot saari bookings le lete hain, jisse end-moment par unka material ya labor nahi pahunchta aur aap busy day par be-wajah tension lete hain.",
      solutionTitle: "Hamara Strict 4-Hour Buffer Solid Formula",
      solutionDesc: "Hum guest aane se bilkul 4 ghante pehle sab kuch clear, ironed drapes aur check-tested lights ke sath ready kar dete hain — yeh Pawan aur Gopal Kumar ka direct personal commitment hai."
    },
    {
      id: "fear_2",
      question: "Kya fabrics aur materials saaf aur naye dikhenge?",
      fearTitle: "Purane fte-purane kapde aur rusted frames",
      fearDesc: "Aam market mein log gande, kale pad chuke carpets, rusted steel panels, aur tute unwashed pardey reuse karte hain, jo high-definition wedding photography mein behad kharab aur saste lagte hain.",
      solutionTitle: "Our Dry-Cleaned Warehouse Sourcing",
      solutionDesc: "Sonbhadra mein hamara bada independent material warehouse hai. Har ek function ke baad kapde turant dry-clean hote hain aur rusted items ko discard kar diya jata hai taaki aapka stage bilkul royal white aur glittering gold chamke."
    },
    {
      id: "fear_3",
      question: "Kya kaam beech mein chhod kar chale jayenge?",
      fearTitle: "Peak season ke naye naye extra fees demands",
      fearDesc: "Local agencies aksar peak wedding dates par extra labor aur hidden rent charges mangne lagti hain aur agar aap mana karein toh chalti shadi mein kaam beech mein chhodne ki dhumki deti hain.",
      solutionTitle: "Itemized Bill aur Zero Extra Hidden Rates Guarantee",
      solutionDesc: "Hum free site visit karke legal itemized GST estimations likh ke dete hain. Ek baar baat pakki hone ke baad ek bhi extra rupee nahi manga jata. Aur hamari team direct payroll par hai, isliye koi walkout darr nahi."
    },
    {
      id: "fear_4",
      question: "Kya achanak aayi baarish ya hawa se tent gir sakta hai?",
      fearTitle: "Baarish ki mitti aur lightning safety khatra",
      fearDesc: "Weak anchors aur uncleaned cables ki wajah se upar jama pani ya tez aandhi se structures collapse ho sakte hain aur electric short-circuit hone ka khatra bohot badh jata hai.",
      solutionTitle: "Heavy Iron Anchors aur German Engineering Layout",
      solutionDesc: "Hum lohe ke massive anchors ko 4 feet gehra jameen mein drill karte hain. Hamari aluminum waterproof sheeting ko wind-insulated drapes milte hain, aur poore venue par rubber insulated cables bichaye jate hain taaki sab bilkul safe rahe."
    },
    {
      id: "fear_5",
      question: "Kya wo sach mein wahi lagayenge jo vaada kiya hai?",
      fearTitle: "Verbal commitments par dhokha",
      fearDesc: "Proprietors coffee chat par 'premium models' ka jhootha vaada karte hain par actual night par saste unbranded chairs ya light-budget decoration lagakar chalte bante hain.",
      solutionTitle: "Word to Word Detailed Manifest Verification",
      solutionDesc: "Hamare quotes mein hardware aur fabric counts bilkul likhit hote hain. Jo drawings hum aapko final karke dikhayenge, event night par owners khud check karke use bilkul waisa hi maintain karenge."
    }
  ];

  const trustPillars: TrustPillar[] = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Jo Vaada Karte Hain, Use Nibhate Hain",
      tagline: "Sacchi Commitment",
      description: "Hamari baat ek bar final hone ke baad bilkul shila-lekh jaisi majboot ho jati hai. Jo visual aap design maps par dekhenge, wahi dhoom-dham se ground par deliver kiya jayega."
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Setup Time Par - Aapka Bharosa Hamara Vaada",
      tagline: "4-Hour Safety Buffer",
      description: "Hum multi-shift timing par kam karte hain takki groom ke pahunchne se pehle main stage, lounges, lighting aur heavy canopies bilkul ready milen."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Professional Event Execution",
      tagline: "Strict Operational Standards",
      description: "Dressed and uniformed staffs bina kisi shor-sharaabe ke discipline ke sath pure area ko clean rakhte hain taaki mehmaano ke samne ratti bhar ka bhi kachra ya wire kachra na dikhe."
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Har Step Par Hamari Team Aapke Saath.",
      tagline: "On-Site Supervisor Presence",
      description: "Humare senior coordinators pure event ke waqt aapke family coordinators ke sath touch me rahenge taaki electrical load ya layout adjustment instantly handle ho sake."
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Experienced Direct Leadership",
      tagline: "7+ Years Trusted Legacy",
      description: "Pawan aur Gopal Kumar ke direct supervision me humne Sonbhadra aur aas-paas ke areas me 500+ successful functions behtareen tareeqe se poore kiye hain."
    },
    {
      icon: <Workflow className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Transparent Communication",
      tagline: "Itemized GST Estimation",
      description: "Zero oral confusion. Har ek single light, carpet aur food item bilkul clean aur likhit bill me hoga taaki aapka budget crystal clear rahe."
    }
  ];

  const comparisons: ComparisonMetric[] = [
    {
      title: "Planning stage",
      category: "planning",
      competitor: "Kachhe kaagaz par hath se likhe bina itemization wale vague estimates. Event se pehle site-visit ya safety load checking ka koi plan nahi hota.",
      omTent: "Thorough digital catalog selection, accurate site visits, aur detailed item-by-item structural bill jo har drashtikon se transparent hota hai."
    },
    {
      title: "Execution quality",
      category: "execution",
      competitor: "Untrained labor aur purane rusted pillars, fte gande carpets, aur un-ironed curtains jo photography me behad dulle aur saste lagte hain.",
      omTent: "Professional assembly crew jo uniform me rehte hain. Sanitize carpets, steaming silks, aur heavy trusses ki safety checks dress-up se pehle achhe se ki jati hai."
    },
    {
      title: "Reliability & Timeline",
      category: "reliability",
      competitor: "Dusre vendors ke material par heavy dependency. Shaadi season me material ki kami ki wajah se achanak cancellations ya bohot late work delivery.",
      omTent: "2019 se abhi tak 100% on-time record! Hamare paas itna bada luxury inventory stream hai ki hum ek sath 3 colossal, premium wedding venues bina kisi shortage ke manage kar sakte hain."
    },
    {
      title: "Communication flow",
      category: "communication",
      competitor: "Busy season me owners phone nahi uthate. Aur event wali raat ko achanak 'transport charge' ya 'extra labor fees' bolkar dhumki di jati hai.",
      omTent: "Aapke liye ek personal logistical coordinator hamesha live rehta hai. Rate bilkul fixed aur transparent hote hain, aur sabhi transit risk hum apne initial quote me hi handle karte hain."
    },
    {
      title: "Direct accountability",
      category: "accountability",
      competitor: "Sofa tute hone par, generator jalne par ya cold catering milne par subcontractors aur local vendors ke beech blame-game shuru ho jata hai.",
      omTent: "Har event ko Pawan aur Gopal Kumar direct lead aur monitor karte hain. Direct mobile contact aur instantly executive resolution se aap befikar rehte hain."
    }
  ];

  const currentComparison = comparisons.find(c => c.category === activeComparisonTab) || comparisons[0];

  return (
    <div id="why-us" className="relative bg-[var(--color-slate-midnight)] overflow-hidden">
      
      {/* Visual Accent Blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-brand)]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-500/3 rounded-full blur-[130px] pointer-events-none"></div>

      {/* CORE TITLE HEADER */}
      <Section className="pt-24 pb-12 relative z-10 border-b border-[var(--color-border-glass)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-overline mb-4 block tracking-[0.3em] font-medium text-[var(--color-brand)]">
              THE ULTIMATE SAFE HAVEN
            </span>
            <Heading level={2} className="text-4xl md:text-6xl tracking-wide font-light mb-6">
              Elite Families Humare <br/>
              <span className="font-serif text-[var(--color-brand)] italic">Zubaan Par Bharosa Karte Hain.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Event partner chunna sirf structures lagana nahi hai, balki apne parivaar ke sabse bade din par sukoon chunna hai. Humne pichle sat saalon mein local event market ke saare risk aur problems ko systematically door kiya hai taaki aap be-fikar rahein.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 1: CUSTOMER FEARS & OM TENT HOUSE ASSURANCE (Highly interactive layout) */}
      <Section className="py-20 md:py-28 relative z-10">
        <Container>
          <div className="text-center mb-16">
            <span className="text-overline mb-3 block tracking-widest text-rose-400">AAJ KI SABSE BADI ANXIETIES</span>
            <Heading level={3} className="text-2xl md:text-4xl leading-tight font-light text-white">
              Aapki Har <span className="font-serif text-[var(--color-brand)] italic">Chinta Aur Darr Ka</span> Behtareen Solution
            </Heading>
            <p className="text-[var(--color-text-muted)] font-sans font-light text-sm md:text-base max-w-xl mx-auto mt-3">
              Hum jaante hain ki ek host ke taur par aap par kitna bada pressure hota hai. Dekhiye kaise humara operational system market ke har darr ko pakke aur safe bharose mein badalta hai.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Fear Selector Lists (Left column 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-start space-y-4">
              {customerFears.map((item, idx) => {
                const isActive = item.id === activeFearId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFearId(item.id)}
                    className={`w-full text-left p-5 rounded-[var(--radius-sharp)] border transition-all duration-[400ms] flex items-center justify-between group ${
                      isActive 
                        ? 'bg-[var(--color-slate-obsidian)] border-[var(--color-brand)] shadow-[0_0_20px_rgba(212,175,55,0.08)]' 
                        : 'bg-transparent border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-slate-obsidian)]/35'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <div className={`p-1.5 rounded-sm shrink-0 border transition-colors duration-300 ${
                        isActive ? 'bg-amber-950/40 border-[var(--color-brand)]' : 'bg-transparent border-[var(--color-border-glass)]'
                      }`}>
                        <HelpCircle className={`w-4 h-4 ${isActive ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-muted)] group-hover:text-white'}`} />
                      </div>
                      <div className="font-serif text-sm md:text-base text-white font-medium">
                        {item.question}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                      isActive ? 'text-[var(--color-brand)] rotate-180' : 'text-[var(--color-text-muted)] opacity-50 group-hover:opacity-100'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Display Showcase Glass Board (Right column 7 cols with AnimatePresence) */}
            <div className="lg:col-span-7 flex items-stretch">
              <AnimatePresence mode="wait">
                {customerFears.map((item) => {
                  if (item.id !== activeFearId) return null;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex"
                    >
                      <div className="w-full bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] p-8 md:p-12 rounded-[var(--radius-sharp)] flex flex-col justify-between text-left relative overflow-hidden shadow-[var(--shadow-trust-anchor)] h-full">
                        {/* Elegant Watermark Layer */}
                        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[var(--color-brand)]/20 uppercase tracking-widest pointer-events-none select-none">
                          OM PROTOCOL // SECURE_STATUS
                        </div>

                        <div>
                          {/* Part A: The Fear Analogy */}
                          <div className="mb-8">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-rose-400 uppercase mb-3">
                              <AlertTriangle className="w-4 h-4" /> The Common Market Worry
                            </span>
                            <Heading level={3} className="text-xl md:text-2xl text-white mb-3">
                              {item.fearTitle}
                            </Heading>
                            <p className="text-[var(--color-text-muted)] font-serif italic font-light text-sm md:text-base leading-relaxed">
                              "{item.fearDesc}"
                            </p>
                          </div>

                          {/* Divider Line */}
                          <div className="h-[1px] w-full bg-[var(--color-border-glass)] mb-8" />

                          {/* Part B: The Om Tent House Assurance */}
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase mb-3">
                              <CheckCircle2 className="w-4 h-4" /> THE LITERAL OM HOUSE ASSURANCE
                            </span>
                            <Heading level={3} className="text-xl md:text-2xl text-white mb-3">
                              {item.solutionTitle}
                            </Heading>
                            <p className="text-white font-sans font-light text-sm md:text-base leading-relaxed">
                              {item.solutionDesc}
                            </p>
                          </div>
                        </div>

                        {/* Owner guarantee tag signed */}
                        <div className="mt-12 pt-6 border-t border-[var(--color-border-glass)]/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--color-text-muted)]">
                          <span>Status: Guaranteed Setup Lockout</span>
                          <span className="text-[var(--color-brand)] uppercase tracking-wider font-semibold">✻ Keepers of the Word</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 2: 6 PREMIUM TRUST PILLARS CARD GRID */}
      <Section className="py-24 bg-[var(--color-slate-obsidian)] border-y border-[var(--color-border-glass)] relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-overline mb-3 block tracking-widest text-[var(--color-brand)]">OPERATIONAL CERTAINTIES</span>
            <Heading level={2} className="text-3xl md:text-5xl leading-tight font-light text-white">
              Sovereign Service Ke <span className="font-serif text-[var(--color-brand)] italic">6 Bemisaal Pillars.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-xl mx-auto mt-4">
              Hum weddings aur grand events ko poore system aur written rules ke sath chalate hain. Yeh hain humare kaam karne ke 6 sunehre asool jin par hum kabhi samjhauta nahi karte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trustPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/70 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/30 flex flex-col justify-between text-left h-full group relative transition-colors shadow-lg"
              >
                {/* Visual Glow Layer on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand)]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[var(--radius-sharp)]"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] group-hover:border-[var(--color-brand)]/60 rounded-[var(--radius-sharp)] flex items-center justify-center mb-6 transition-all shadow">
                    {pillar.icon}
                  </div>

                  <div className="text-[10px] font-mono text-[var(--color-brand)] uppercase tracking-widest mb-1.5 font-semibold">
                    {pillar.tagline}
                  </div>

                  <h4 className="font-serif text-lg md:text-xl text-white font-medium mb-3 group-hover:text-[var(--color-brand)] transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="text-[var(--color-text-muted)] font-sans text-xs md:text-sm leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--color-border-glass)]/60 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider relative z-10 text-[var(--color-text-muted)]">
                  <span>Standard #0{idx + 1}</span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 3: INTERACTIVE COMPARISON EXPERIENCE (Respectful, Objective, Professional) */}
      <Section className="py-24 relative z-10 border-b border-[var(--color-border-glass)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-overline mb-3 block tracking-widest text-[var(--color-brand)]">OBJECTIVE COMPARATIVE STUDY</span>
            <Heading level={2} className="text-3xl md:text-5xl leading-tight font-light text-white">
              Kaam Ka Tareeqa: <span className="font-serif text-[var(--color-brand)] italic">Hamara Aur Dusron Ka Farq.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-xl mx-auto mt-4">
              Har event mein hazaron details ka dhyan rakhna hota hai. Dekhiye kaise humara professional process kisi aam local vendor ke kaam se behtar aur safe hai, taaki aap bina chinta ke khushiyan mana sakein.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Horizontal Tabs selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 pb-4 border-b border-[var(--color-border-glass)]">
              {(['planning', 'execution', 'reliability', 'communication', 'accountability'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComparisonTab(tab)}
                  className={`px-5 py-3 text-xs font-mono uppercase tracking-widest transition-all duration-300 relative ${
                    activeComparisonTab === tab
                      ? 'text-[var(--color-brand)] bg-[var(--color-slate-obsidian)] border-b-2 border-[var(--color-brand)]'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Display Comparison Cards Side-by-Side */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComparisonTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
              >
                {/* Category Option A: Typical Vendor (Desaturated muted aesthetics) */}
                <div className="p-8 bg-[var(--color-slate-midnight)]/40 border border-dashed border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] flex flex-col justify-between text-left group">
                  <div>
                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                      AAM LOCAL TENT APPROACH
                    </div>
                    
                    <h4 className="font-serif text-xl text-slate-400 font-medium mb-4 capitalize">
                      Aam Vendor Ka {currentComparison.category} Tarika
                    </h4>
                    
                    <p className="text-slate-400/90 font-sans font-light text-sm md:text-base leading-relaxed">
                      {currentComparison.competitor}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--color-border-glass)]/40 text-[10px] font-mono text-[#94a3b8]/60 uppercase tracking-wider">
                    Risk Profile: Bohot Kachha aur Unsafe
                  </div>
                </div>

                {/* Category Option B: Om Tent House Approach (Vivid, highlighted gold, safe) */}
                <div className="p-8 bg-[var(--color-slate-obsidian)] border border-[var(--color-brand)]/40 hover:border-[var(--color-brand)] shadow-[0_0_24px_rgba(212,175,55,0.06)] rounded-[var(--radius-sharp)] flex flex-col justify-between text-left relative transition-all duration-300">
                  {/* Highlight border absolute flare */}
                  <div className="absolute top-4 right-6 bg-amber-950 text-[var(--color-brand)] border border-amber-500/20 px-2 py-0.5 rounded-[var(--radius-sharp)] font-mono text-[9px] uppercase tracking-wider font-semibold">
                    ✻ EXCELLENCE PROTOCOL
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[var(--color-brand)] font-mono text-[10px] uppercase tracking-widest mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse"></span>
                      OM TENT HOUSE BENCHMARK
                    </div>
                    
                    <h4 className="font-serif text-xl text-white font-semibold mb-4 capitalize">
                      Humare Shandaar {currentComparison.category} Solutions
                    </h4>
                    
                    <p className="text-[var(--color-text-primary)] font-sans font-light text-sm md:text-base leading-relaxed">
                      {currentComparison.omTent}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--color-border-glass)] text-[10px] font-mono text-[var(--color-brand)] uppercase tracking-wider font-semibold">
                    Safety Status: 100% Certified Safe & Secure
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      {/* SECTION 4: OPERATIONAL EXCELLENCE NUMERICAL METRICS */}
      <Section className="py-20 md:py-24 bg-gradient-to-t from-[var(--color-slate-obsidian)] to-[var(--color-slate-midnight)] border-t border-[var(--color-border-glass)] relative z-10">
        <Container>
          <div className="text-center mb-16">
            <span className="text-overline mb-3 block tracking-widest text-[var(--color-brand)]">OPERATIONAL AUDIT</span>
            <Heading level={3} className="text-2xl md:text-3xl font-light text-white font-serif">
              Humara Track Record <span className="font-serif text-[var(--color-brand)] italic">Sache Numbers Mein.</span>
            </Heading>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            
            {/* 7+ Years block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={7} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Sat Saalon Ka Heritage
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Sonbhadra, Anpara aur aas-paas ke VIP parivaaron ki seva mein.
              </p>
            </div>

            {/* 2500+ Guest Capacity block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={2500} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Sabse Badi Guest Capacity
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Kisi bhi bade scale par completely safe pavilion designs.
              </p>
            </div>

            {/* 3 Sim Events block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={3} suffix="" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Ek Sath Setups
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Independent logistics aur badhiya professional material sets ke sath.
              </p>
            </div>

            {/* 30 Expert Staff block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Experienced Event Experts
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Humare direct payroll par trained professional and alignment staff.
              </p>
            </div>

            {/* 500+ Successful Events block */}
            <div className="col-span-2 lg:col-span-1 p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Successful Bookings
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Har event time par, zero lag aur flawless execution ke sath.
              </p>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 5: EXECUTIVE COMMITMENT STATEMENT FROM PAWAN & GOPAL KUMAR */}
      <Section className="py-24 bg-[var(--color-slate-obsidian)] relative z-10 border-t border-[var(--color-border-glass)] overflow-hidden">
        {/* Subtle geometric circle background lines */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(var(--color-brand)_2px,transparent_2px)] [background-size:30px_30px] pointer-events-none"></div>

        <Container>
          <div className="max-w-4xl mx-auto rounded-[var(--radius-sharp)] border border-[var(--color-border-gold)] bg-gradient-to-tr from-[var(--color-slate-midnight)]/90 to-[var(--color-slate-obsidian)]/90 p-12 md:p-16 text-left relative overflow-hidden shadow-[var(--shadow-glow-gold)]">
            
            {/* Watermark Crest in corner */}
            <div className="absolute top-8 right-8 font-serif text-8xl text-white/[0.02] select-none leading-none">
              ✻
            </div>

            <span className="text-overline block tracking-[0.25em] text-[var(--color-brand)] mb-6">
              LEADERSHIP GUARANTEE STATEMENT
            </span>

            <Heading level={3} className="text-2xl md:text-4xl text-white mb-6 font-serif">
              Humari Zubaan, <span className="font-serif italic text-[var(--color-brand)]">Hamara Sakht Parivaarik Vaada.</span>
            </Heading>

            <blockquote className="space-y-6 relative z-10 text-[var(--color-text-muted)] font-serif italic text-base md:text-lg lg:text-xl font-light leading-relaxed">
              <p>
                "Jab aap apni behan ki shaadi ya apne parivaar ke kisi khas din ke liye humein chunte hain, toh woh sirf ek standard agreement nahi hota. Aap apne parivaar ka samman aur local prestige humare kandhon par rkh rahe hote hain."
              </p>
              <p>
                "Hum achhe se jaante hain ki shaadi-byah jaise moko par koi 'rehearsal retake' nahi milta. Agar ek parda gir gya ya kitchen ki lights short ho gayi, toh mehmaano ke samne poora event kharab ho jata hai. Isiliye hum khud ek-ek detail par nazar rakhte hain. Agar severe aandhi-toofan ke beech extra labor ya canvas security ki zarurat pade, toh jab tak setup flawless na ho jaye hum khud venue par dates par datte rehte hain."
              </p>
              <p>
                "Hamara poora kaam teen asoolon par chalta hai: <strong className="text-white font-medium font-sans">Trust (Bharosa)</strong>, <strong className="text-white font-medium font-sans">Responsibility (Zimmewari)</strong>, aur <strong className="text-white font-medium font-sans">Hamari Pakki Zubaan</strong>. Hum apne clients ko kabhi akela nahi chhodte, aur quality par compromise toh bilkul nahi karte."
              </p>
            </blockquote>

            {/* Signature layout blocks */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border-glass)] grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              <div className="text-left">
                <div className="text-xl font-serif text-[var(--color-brand)] italic tracking-wide">
                  Pawan Kumar
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                  Co-Founder & Heavy Structures Director
                </div>
              </div>

              <div className="text-left sm:border-l sm:border-[var(--color-border-glass)] sm:pl-8">
                <div className="text-xl font-serif text-[var(--color-brand)] italic tracking-wide">
                  Gopal Kumar
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                  Co-Founder & Culinary Logistics Master
                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>

    </div>
  );
}
