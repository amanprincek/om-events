import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  MapPin, 
  DraftingCompass, 
  CalendarCheck, 
  Building, 
  PartyPopper, 
  Heart,
  ShieldCheck,
  Clock,
  Users,
  MessageSquareDiff,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge, Button } from '@om-tent/ui-system';

interface JourneyStep {
  id: number;
  icon: React.ReactNode;
  label: string;
  hinglishTitle: string;
  shortDesc: string;
  extendedDetails: string;
  highlight: string;
  ctaText: string;
  ctaAction: () => void;
  protocols: string[];
}

export default function EventJourney() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: JourneyStep[] = [
    {
      id: 1,
      icon: <PhoneCall className="w-5 h-5 md:w-6 h-6" />,
      label: "Inquiry",
      hinglishTitle: "Pehli Baat / Event Inquiry",
      shortDesc: "Aap hume call, WhatsApp ya website ke through contact kar sakte hain.",
      extendedDetails: "Aapki booking inquiry aate hi humare system mein registration lock ho jati hai. Pawan Kumar ya Gopal Kumar khud aapse initial details samjhte hain aur event ki possibility ko study karte hain.",
      highlight: "⚡ Immediate Response (Under 10 Mins)",
      ctaText: "WhatsApp Par Baat Karein",
      ctaAction: () => window.open('https://wa.me/919452460040', '_blank'),
      protocols: [
        "Direct Owner Alignment (No middleman chaos)",
        "Quick client detail capture and slot initial screening",
        "Preferred venue dates layout checking"
      ]
    },
    {
      id: 2,
      icon: <MapPin className="w-5 h-5 md:w-6 h-6" />,
      label: "Site Visit",
      hinglishTitle: "Site Visit & Live Location Checking",
      shortDesc: "Hamari team location aur requirements ko samajhkar best planning taiyaar karti hai.",
      extendedDetails: "Hum aapke raw field, lawn, ya banquet hall site par khud jaate hain. Space dimensions check karte hain, electrical transformer stability handle karte hain aur weather vulnerability assess karte hain.",
      highlight: "📍 Bilkul Free Site Inspection",
      ctaText: "Site Visit Match Karein",
      ctaAction: () => window.open('https://wa.me/919452460040?text=Hello,%20I%20want%20to%20book%20a%20free%20site%20visit%20for%20my%20event.', '_blank'),
      protocols: [
        "Ground laser measurement check for exact tent fits",
        "Wind orientation study and heavy truss anchoring checks",
        "Electrical hazard and cable distribution alignment mapping"
      ]
    },
    {
      id: 3,
      icon: <DraftingCompass className="w-5 h-5 md:w-6 h-6" />,
      label: "Planning",
      hinglishTitle: "Detailed Blueprints & Selection",
      shortDesc: "Tent setup, decoration, lighting aur catering ke liye detailed planning ki jaati hai.",
      extendedDetails: "Hum catalog files, premium fabric variations, lighting designs, and royal catering plans finalise karte hain. Aapko har ek detail digital layout and drawing ke sath dikhayi jati hai takki clear roadmap ban sake.",
      highlight: "📝 100% Transparent Proposal",
      ctaText: "Contact for Catalogue",
      ctaAction: () => window.open('https://wa.me/919452460040', '_blank'),
      protocols: [
        "Dynamic stage height and entrance layout drafting",
        "Menu finalisation based on premium regional preferences",
        "Itemized material counting (number of chairs, sofas, drapes, bulbs)"
      ]
    },
    {
      id: 4,
      icon: <CalendarCheck className="w-5 h-5 md:w-6 h-6" />,
      label: "Confirmation",
      hinglishTitle: "Final Agreement & Booking Lock",
      shortDesc: "Booking confirm hone ke baad poori team event execution ke liye prepare karti hai.",
      extendedDetails: "Hum digital signature, advance payment, and legal itemized invoice create karte hain. Humara direct commitment lock ho jata hai - shaadi wale din koi extra transportation, tax inflation ya peak season price demand nahi hoti.",
      highlight: "🔒 Absolute Price Lock Shield",
      ctaText: "Schedule Call",
      ctaAction: () => window.location.href = 'tel:+919452460040',
      protocols: [
        "GST compliant line-by-line legal itemization copy",
        "Material locking in exclusive Sonbhadra warehouse",
        "No verbal adjustments - every item documented clearly"
      ]
    },
    {
      id: 5,
      icon: <Building className="w-5 h-5 md:w-6 h-6" />,
      label: "Preparation",
      hinglishTitle: "Premium Materials & On-site Fabrication",
      shortDesc: "Event se pehle saari arrangements aur setup professionally complete kiye jaate hain.",
      extendedDetails: "Groom ke aane se 2-3 din pehle high-end logistics shuru ho jata hai. Warehouse se specialized dry-cleaned silks, shining carpets aur safety structural trusses load kiye jate hain. 4 feet gehre anchors hum drilling machine se tight karte hain.",
      highlight: "🏗 German Standard Anchor Pinning",
      ctaText: "Call to Consult",
      ctaAction: () => window.location.href = 'tel:+919452460040',
      protocols: [
        "Silks are hand-steamed on-site for absolute crease-free lookup",
        "Double-layer waterproof sheeting layout implementation",
        "Strict carpet deep sanitization before first guest step-in"
      ]
    },
    {
      id: 6,
      icon: <PartyPopper className="w-5 h-5 md:w-6 h-6" />,
      label: "Execution",
      hinglishTitle: "Live Operational Support & Supervision",
      shortDesc: "Hamari team poore event ke dauraan active support deti hai.",
      extendedDetails: "Aapka event shuru hone se EXACTLY 4 ghante pehle hum hand-over check complete kar lete hain. Pura din senior coordination supervisor live rehte hain takki catering flow, stage entry lights and power backup flawless chale.",
      highlight: "👑 4-Hour Prior Setup Handover",
      ctaText: "Chat Live on WhatsApp",
      ctaAction: () => window.open('https://wa.me/919452460040', '_blank'),
      protocols: [
        "Sound & light integration level precheck loops",
        "Supervisor stationed next to family coordinators continuously",
        "Electrical heavy load testing under expert electrician supervision"
      ]
    },
    {
      id: 7,
      icon: <Heart className="w-5 h-5 md:w-6 h-6" />,
      label: "Completion",
      hinglishTitle: "Successful Completion & Review",
      shortDesc: "Event ke baad bhi hamari zimmedari khatam nahi hoti. Hum poori quality aur satisfaction ensure karte hain.",
      extendedDetails: "Program complete ho jaane ke baad respectfully, bina kisi shor-sharaabe ke hum setup dismantle karte hain. Hum customer satisfaction aur reviews record karte hain taaki aapke chehre par aakhiri muskaan bani rahe.",
      highlight: "🤝 100% Parivaar Happiness Guard",
      ctaText: "Check Reviews",
      ctaAction: () => {
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      protocols: [
        "Fast structure dismantling under quiet parameters",
        "Post-event satisfaction signoff with owners direct review",
        "Long-term friendship & legacy connection building"
      ]
    }
  ];

  const reassurances = [
    {
      icon: <Clock className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Time Par Setup Setup",
      desc: "Strict 4-Hour early delivery system. Hum event shuru hone se bilkul 4 ghante pehle pure lights, canopies aur drapes ready karke dikhate hain."
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Dedicated Supervisor",
      desc: "Event ke pure samay humare direct supervisor aapke touch me rahenge taaki ratti bhar ki bhi electrical ya decoration disturbance na ho sake."
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Professional Team",
      desc: "Humare staff highly trained hain jo uniformed rehte hain aur bina kisi shor-sharaabe ke behtareen execution complete karte hain."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Safe Structures Only",
      desc: "German engineered robust aluminum structures, triple-layered waterproof backings, and armor rubber insulated cables jo har tufan me datte rahen."
    },
    {
      icon: <MessageSquareDiff className="w-6 h-6 text-[var(--color-brand)]" />,
      title: "Transparent Billing",
      desc: "Zero hidden costs policy. Har ek single light pole, cushion, tent area aur catering menu aur pricing list written GST estimation sheet par detailed hoti hai."
    }
  ];

  const activeStepData = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <Section id="journey" className="bg-[var(--color-slate-midnight)] relative overflow-hidden py-24 md:py-32">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[var(--color-brand)]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[var(--color-brand)]/5 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      <Container className="relative z-10">
        
        {/* ================= SECTION 1: PROCESS OVERVIEW ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <span className="text-overline mb-3 block tracking-[0.25em] text-[var(--color-brand)]">
            TRUSTED LOGISTICAL ROADMAP
          </span>
          <Heading level={2} className="text-4xl md:text-6xl tracking-wide font-light mb-6 text-white">
            Kaise Kaam <span className="font-serif text-[var(--color-brand)] italic">Karte Hain</span>
          </Heading>
          <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed text-base md:text-lg max-w-2xl mx-auto mt-4">
            Aapke pehle call se lekar event ke successful completion tak, har step par hamari team aapke saath rehti hai.
          </p>
        </div>

        {/* ================= SECTION 2: THE COMPLETE JOURNEY (Timeline) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-24 md:mb-32">
          
          {/* Timeline selector navigation (Left on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative pl-6 md:pl-8 space-y-4">
              {/* Vertical line indicator */}
              <div className="absolute left-3.5 md:left-4.5 top-3 bottom-3 w-[1px] bg-[var(--color-border-glass)] pointer-events-none"></div>
              
              {/* Animating highlight line on vertical track */}
              <div 
                className="absolute left-3.5 md:left-4.5 w-[2px] bg-[var(--color-brand)] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                style={{
                  top: `${((activeStep - 1) / (steps.length - 1)) * 90 + 3}%`,
                  height: '24px'
                }}
              ></div>

              {steps.map((step) => {
                const isActive = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className="w-full text-left flex items-start gap-4 p-3 md:p-4 rounded-[var(--radius-sharp)] transition-all duration-300 relative group cursor-pointer"
                    id={`step-trigger-${step.id}`}
                    type="button"
                  >
                    {/* Active highlight background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="active-step-bg"
                          className="absolute inset-0 bg-gradient-to-r from-[rgba(212,175,55,0.06)] to-transparent border-l border-[var(--color-brand)] rounded-[var(--radius-sharp)] z-0"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Step number circle inside timeline */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold shrink-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[var(--color-brand)] text-black border border-[var(--color-brand)] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[var(--color-slate-obsidian)] text-[var(--color-text-muted)] border border-[var(--color-border-glass)] group-hover:border-[var(--color-brand)]/40'
                    }`}>
                      {step.id}
                    </div>

                    <div className="relative z-10">
                      <span className={`text-[10px] font-mono uppercase tracking-widest block transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-muted)]/70'
                      }`}>
                        Step 0{step.id} — {step.label}
                      </span>
                      <h4 className={`font-serif text-lg md:text-xl font-light mt-0.5 tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-[var(--color-text-muted)] group-hover:text-white/80'
                      }`}>
                        {step.hinglishTitle.split('/')[0]}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline details detailed card (Right/Left highlight box on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <GlassPanel intensity="shield" className="p-8 md:p-12 !bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] shadow-[var(--shadow-trust-anchor)] h-full flex flex-col justify-between relative overflow-hidden group">
              
              {/* Background oversized step counter watermark */}
              <div className="absolute right-[-10px] top-[-20px] font-serif text-[180px] select-none font-bold text-white/[0.015] pointer-events-none line-height-none leading-none group-hover:text-white/[0.025] transition-colors duration-500">
                0{activeStepData.id}
              </div>

              <div>
                {/* Step Icon with pulsing border frame overlay */}
                <div className="inline-flex p-4 rounded-full bg-[var(--color-slate-midnight)] border border-[var(--color-border-gold)] text-[var(--color-brand)] shadow-[var(--shadow-glow-gold)] mb-8 animate-pulse">
                  {activeStepData.icon}
                </div>

                <div className="mb-6">
                  {/* Badge & highlights info */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <Badge className="text-[10px] uppercase font-mono tracking-widest py-1 px-3 border-[var(--color-border-gold)] text-[var(--color-brand)] bg-[rgba(212,175,55,0.03)]">
                      Active Phase 0{activeStepData.id}
                    </Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-mono tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      {activeStepData.highlight}
                    </span>
                  </div>

                  <Heading level={3} className="text-2xl md:text-4xl text-white font-medium mb-4 leading-tight">
                    {activeStepData.hinglishTitle}
                  </Heading>
                  
                  <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed text-base md:text-lg mb-8">
                    {activeStepData.extendedDetails}
                  </p>
                </div>

                {/* Sub-section: Core Protocols deployment */}
                <div className="mb-10 pt-6 border-t border-[var(--color-border-glass)]">
                  <span className="text-[10px] font-mono text-[var(--color-brand)] tracking-[0.2em] uppercase block mb-4">
                    RIGOROUS DEPLOYMENT PROTOCOLS:
                  </span>
                  
                  <ul className="space-y-3.5 text-sm font-sans font-light text-slate-300">
                    {activeStepData.protocols.map((protocol, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] mt-2 shrink-0"></span>
                        <span>{protocol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Call Action inside selected timeline item */}
              <div className="pt-6 border-t border-[var(--color-border-glass)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Need personal custom alignments?</p>
                  <p className="text-xs text-slate-300 mt-0.5">Free design consultation are live right now.</p>
                </div>
                <Button 
                  onClick={activeStepData.ctaAction}
                  className="group/btn flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold group cursor-pointer"
                >
                  <span>{activeStepData.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>

            </GlassPanel>
          </div>

        </div>

        {/* ================= SECTION 3: CUSTOMER REASSURANCE BLOCK ================= */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-overline mb-3 block tracking-widest text-[var(--color-brand)]">OPERATIONAL INSURANCE</span>
            <Heading level={3} className="text-2xl md:text-3.5xl text-white font-serif font-light leading-snug">
              Aapki Shadi, Hamara <span className="font-serif text-[var(--color-brand)] italic">Ultimate Risk-Free Buffer.</span>
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {reassurances.map((item, idx) => (
              <GlassPanel 
                key={idx}
                intensity="ambient"
                className="p-6 md:p-8 bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/30 rounded-[var(--radius-sharp)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow-gold)] flex flex-col justify-between"
              >
                <div>
                  <div className="p-3.5 bg-[var(--color-slate-midnight)] border border-[var(--color-border-glass)] rounded-full text-[var(--color-brand)] w-fit mb-6">
                    {item.icon}
                  </div>
                  <h4 className="font-serif text-lg font-medium text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Verified Solution
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* ================= SECTION 5: EVENT PREPARATION PROMISE ================= */}
        <GlassPanel intensity="shield" className="relative p-8 md:p-16 !bg-[var(--color-slate-obsidian)] border border-[var(--color-border-gold)] rounded-[var(--radius-sharp)] overflow-hidden shadow-[var(--shadow-trust-anchor)] max-w-5xl mx-auto">
          {/* Accent lighting elements inside */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-[var(--color-brand)]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-[var(--color-brand)]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Seal Badge Ornament */}
            <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-[var(--color-slate-midnight)] border border-[var(--color-border-gold)] rounded-full relative w-32 h-32 md:w-40 md:h-40 shadow-[var(--shadow-glow-gold)]">
              <span className="font-serif text-3xl md:text-4xl text-[var(--color-brand)] italic">OM</span>
              <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-[var(--color-text-muted)] uppercase text-center mt-1">
                TENT HOUSE
              </span>
              <div className="absolute inset-2 border border-dashed border-[var(--color-border-glass)] rounded-full -z-0"></div>
            </div>

            <div className="text-left space-y-4 flex-grow">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--color-brand)] block uppercase">
                THE SOVEREIGN FAMILY OATH
              </span>
              <Heading level={2} className="text-2xl md:text-4xl leading-tight font-medium text-white max-w-xl">
                Har Event Ko Hum Apne Khud Ke <span className="font-serif text-[var(--color-brand)] italic">Function Ki Tarah Treat Karte Hain.</span>
              </Heading>
              
              <p className="text-[var(--color-text-muted)] font-serif italic text-base md:text-lg leading-relaxed max-w-3xl">
                "Hum samajhte hain ki ek beti ki bidaai ya parivaar ki shubh shuruwaat mein ratti bhar ki bhi khata pure dhoom-dham ko dundhla kar sakti hai. Isiliye hum material ke har dhage ko dry-clean karte hain, har lighting bulb ko pehle se check karte hain aur on-site khud khade rehkar alignment checking manage karte hain. Hum business se pehle parivaarik samman ko sarvopari rakhte hain."
              </p>

              <div className="pt-4 flex items-center gap-6 text-xs text-[var(--color-text-muted)] font-mono">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Gopal Kumar
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Pawan Kumar
                </span>
                <span className="h-[1px] w-12 bg-[var(--color-border-glass)] hidden sm:inline-block"></span>
                <span className="text-[var(--color-brand)] hidden sm:inline-block">Established Since 2019</span>
              </div>
            </div>
          </div>
        </GlassPanel>

      </Container>
    </Section>
  );
}
