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
      question: "Will they show up on time?",
      fearTitle: "The Empty Venue Stress",
      fearDesc: "Many local tent vendors struggle with booking over-commitments, leaving hosts panicking with uninstalled steel pipes or missing carpets on the morning of their grand ceremony.",
      solutionTitle: "Our Pre-Lock Benchmark",
      solutionDesc: "We enforce an absolute four-hour buffer. Every steel frame is complete, draperies are ironed, and lighting loops are pre-checked 4 hours before your first guest steps in — backed by the Pawan & Gopal Kumar personal guarantee."
    },
    {
      id: "fear_2",
      question: "Will the setup look clean & premium?",
      fearTitle: "Rusted Frames & Faded Silks",
      fearDesc: "Standard market setups often reuse oil-stained rugs, rusted steel panels, or faded, torn yellow draperies that instantly ruin the luxury look in high-definition event photography.",
      solutionTitle: "Mainstream Elite Sourcing",
      solutionDesc: "We maintain a pristine, segregated material warehouse in Sonbhadra. Fabric lines are dry-cleaned immediately after every single use. We retire rusted backdrops to ensure every wedding stage reflects royal white and sparkling gold."
    },
    {
      id: "fear_3",
      question: "Will they walk out or leave work unfinished?",
      fearTitle: "Peak Season Extortions",
      fearDesc: "Unprofessional agencies frequently threaten to stop setup in peak winter seasons, demanding extra labor or transport fees that were never transparently itemized.",
      solutionTitle: "Sovereign Legals & Zero Hidden Keys",
      solutionDesc: "We provide detailed, legally binding GST estimates during free site visits. Not a single rupee is modified post-agreement. Our logistics crew is directly employed with zero sudden peak-season walkout risk."
    },
    {
      id: "fear_4",
      question: "Can they handle colossal scales safely?",
      fearTitle: "Rain Hazards & Structural Failures",
      fearDesc: "Poorly weighted aluminum frames are prone to collapse under unseasonal wind drafts or heavy monsoon water accumulation, creating severe electrocution or visual hazards.",
      solutionTitle: "Wind-Insulated German Engineering",
      solutionDesc: "We drive structural iron anchors four feet deep into raw soil. Our heavy truss setups feature multi-layered waterproof backing lines and armored, rubber-insulated electrical corridors to ensure risk-free hosting."
    },
    {
      id: "fear_5",
      question: "Will they keep their verbal promises?",
      fearTitle: "The Oral Agreement Amputee",
      fearDesc: "Proprietors promise 'premium services' verbally during coffee chats, but substitute cheaper secondary substitutes or omit promised decorative accents on the actual event night.",
      solutionTitle: "Absolute Line-by-Line Fulfillment",
      solutionDesc: "Our itemized estimates and digital drawings act as exact manifest lists. If a specific floral selection or chandelier counts are specified on your quote, they are delivered, double-checked, and approved by the owner."
    }
  ];

  const trustPillars: TrustPillar[] = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "We Deliver What We Promise",
      tagline: "Honest Implementation",
      description: "Our word is your absolute structural anchor. What you see during planning is exactly what stands fully polished on event day, with zero aesthetic sub-standard deviations."
    },
    {
      icon: <Clock className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "On-Time Setup Guaranteed",
      tagline: "4-Hour Buffer Security",
      description: "We work on multi-shift schedules long before your event begins. The complete stage, dining court, and warm ambient light lines are tested and hand-inspected before the groom arrives."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Professional Execution",
      tagline: "Sovereign Setup Officers",
      description: "A streamlined on-site deployment team working with direct checklist protocols. We maintain clean, cordoned storage spaces and ensure zero ground layout clutter is visible to your honorable guests."
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Dedicated Event Support",
      tagline: "On-Site Supervisor Presence",
      description: "An experienced supervisor is stationed permanently next to your coordinators throughout the entire ceremony to manage real-time lighting adjustments or dynamic layout demands immediately."
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Experienced Team",
      tagline: "7+ Years Elite Heritage",
      description: "Under the direct command of Pawan and Gopal Kumar, our seasoned crew has successfully orchestrated over 500 landmark marriages, corporate events, and religious stages in Sonbhadra’s key venues."
    },
    {
      icon: <Workflow className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Transparent Communication",
      tagline: "GST itemized invoices",
      description: "No vague bundled quotes. You receive clear pricing outlining structural tent sizes, exact floral counts, catering dishes, and electrical backup details, ensuring total billing transparency."
    }
  ];

  const comparisons: ComparisonMetric[] = [
    {
      title: "Planning stage",
      category: "planning",
      competitor: "Vague oral agreements written on raw paper files. No itemized item checklists, layout planning, or ground safety assessments in advance.",
      omTent: "Thorough digital catalog selection, clear site visits, and detailed line-by-item structural estimates outlining exact counts of drapes, lights, and layout structures."
    },
    {
      title: "Execution quality",
      category: "execution",
      competitor: "Untrained casual labor using rusted stage pillars, stained rugs, and un-ironed curtains that look worn out in high-resolution zoom cameras.",
      omTent: "Directly employed, uniformed assembly crew. Every rug is deep-sanitized, silks are hand-steamed, and heavy trusses undergo strict weight alignment checks before dressing."
    },
    {
      title: "Reliability & Timeline",
      category: "reliability",
      competitor: "High dependency on third-party inventory. Risk of delayed completion or sudden cancellations in wedding season due to material shortages.",
      omTent: "Indestructible 100% on-time record since 2019. We own a continuous luxury inventory stream capable of setting up 3 colossal, premium-grade simultaneous venues without dry-out."
    },
    {
      title: "Communication flow",
      category: "communication",
      competitor: "Owners become unreachable on phone calls during busy days. Unforeseen 'handling charges' or transit fees added at the end of the night.",
      omTent: "A dedicated logistical coordinator is assigned to you. Every single rupee is itemized upfront; we absorb all unforeseen local transit risks under our initial pledge."
    },
    {
      title: "Direct accountability",
      category: "accountability",
      competitor: "Blameshifting to subcontractors for structural faults, broken chairs, cold food catering, or delayed light configurations.",
      omTent: "All operations are directly supervised by owners Pawan and Gopal Kumar. Direct mobile accessibility and instant executive resolution for peace of mind."
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
              Why Elite Hosts <br/>
              <span className="font-serif text-[var(--color-brand)] italic">Trust Our Word.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Choosing an event partner isn't just about selecting structures; it is about choosing peace of mind. We have spent over seven years systematically eliminating the risks and chaotic standard practices of the local wedding market.
            </p>
          </div>
        </Container>
      </Section>

      {/* SECTION 1: CUSTOMER FEARS & OM TENT HOUSE ASSURANCE (Highly interactive layout) */}
      <Section className="py-20 md:py-28 relative z-10">
        <Container>
          <div className="text-center mb-16">
            <span className="text-overline mb-3 block tracking-widest text-rose-400">COMMON EVENT ANXIETIES</span>
            <Heading level={3} className="text-2xl md:text-4xl leading-tight font-light text-white">
              Addressing Your <span className="font-serif text-[var(--color-brand)] italic">Deepest Concerns</span> Elegantly
            </Heading>
            <p className="text-[var(--color-text-muted)] font-sans font-light text-sm md:text-base max-w-xl mx-auto mt-3">
              We understand the pressure you face as event hosts. Here is how our operational model transforms standard market fears into absolute, certified certainties.
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
              The Six Pillars Of <span className="font-serif text-[var(--color-brand)] italic">Sovereign Service.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-xl mx-auto mt-4">
              We run weddings based on precision coordination protocols and absolute billing integrity. Here are our six standard rules of conduct.
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
              The Operational <span className="font-serif text-[var(--color-brand)] italic">Contrast.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-xl mx-auto mt-4">
              Events require massive micro-coordination. Discover how our systemized process compares to typical unorganized vendor methods in the region without attacking our local peers.
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
                      TYPICAL LOCAL EVENT approach
                    </div>
                    
                    <h4 className="font-serif text-xl text-slate-400 font-medium mb-4 capitalize">
                      Standard {currentComparison.category} practices
                    </h4>
                    
                    <p className="text-slate-400/90 font-sans font-light text-sm md:text-base leading-relaxed">
                      {currentComparison.competitor}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--color-border-glass)]/40 text-[10px] font-mono text-[#94a3b8]/60 uppercase tracking-wider">
                    Risk Profile: Highly Fragile State
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
                      Our {currentComparison.category} solutions
                    </h4>
                    
                    <p className="text-[var(--color-text-primary)] font-sans font-light text-sm md:text-base leading-relaxed">
                      {currentComparison.omTent}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--color-border-glass)] text-[10px] font-mono text-[var(--color-brand)] uppercase tracking-wider font-semibold">
                    Safety Status: Certified Integrity Buffer
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
              Our Track Record <span className="font-serif text-[var(--color-brand)] italic">In Raw Numbers.</span>
            </Heading>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            
            {/* 7+ Years block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={7} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Years of Heritage
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Serving VIP hosts in Sonbhadra/Anpara area.
              </p>
            </div>

            {/* 2500+ Guest Capacity block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={2500} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Max Guest Capacity
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Structuring colossal stable pavilion zones.
              </p>
            </div>

            {/* 3 Sim Events block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={3} suffix="" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Simultaneous Setups
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                With independent logistics and material sets.
              </p>
            </div>

            {/* 30 Expert Staff block */}
            <div className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Event Professionals
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Directly employed, trained alignment engineers.
              </p>
            </div>

            {/* 500+ Successful Events block */}
            <div className="col-span-2 lg:col-span-1 p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 transition-all duration-300">
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] font-semibold mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Successful bookings
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-light leading-normal">
                Executed perfectly with 100% on-time feedback.
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
              Our Sovereign <span className="font-serif italic text-[var(--color-brand)]">Family Promise.</span>
            </Heading>

            <blockquote className="space-y-6 relative z-10 text-[var(--color-text-muted)] font-serif italic text-base md:text-lg lg:text-xl font-light leading-relaxed">
              <p>
                "When you book our setup family for your sister's wedding or your child's milestones, you are not merely signing an agreement. You are vesting your family’s community prestige onto our shoulders."
              </p>
              <p>
                "We realize that in the wedding industry, there are no rehearsal retakes. If a curtain collapses or kitchen light circuits short out, the evening is ruined forever. That is why we personally oversee every alignment milestone. If a task requires extra labor or complex canvas adjustments under torrential winds, we stand on-site until the visual is flawless."
              </p>
              <p>
                "We operate based on three fundamental anchor vectors: <strong className="text-white font-medium font-sans">Trust</strong>, <strong className="text-white font-medium font-sans">Responsibility</strong>, and <strong className="text-white font-medium font-sans">keeping our direct word</strong>. We do not desert our patrons, and we do not compromise."
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
