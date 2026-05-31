import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Hammer, 
  Layers, 
  Phone, 
  FileText,
  MousePointer,
  ChevronRight,
  Sparkle,
  ArrowRight,
  Info,
  Check,
  Flower,
  Tent,
  Utensils,
  Armchair,
  Zap,
  Map,
  MapPinIcon
} from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge, Button, Card } from '@om-tent/ui-system';
import { signatureProjects, serviceBreakdown, regionalNodes } from '../data/projectsData';

// Dynamic Icon Mapper for the services
const getServiceIcon = (title: string) => {
  switch (title) {
    case "Bespoke Decoration":
      return <Flower className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Luminescent Lighting":
      return <Sparkles className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Premium Tent Structures":
      return <Tent className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Sovereign Catering":
      return <Utensils className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Stage & Truss Design":
      return <Layers className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Luxury Lounge Furniture":
      return <Armchair className="w-6 h-6 text-[var(--color-brand)]" />;
    case "Silent Power Security":
      return <Zap className="w-6 h-6 text-[var(--color-brand)]" />;
    default:
      return <Sparkles className="w-6 h-6 text-[var(--color-brand)]" />;
  }
};

export default function FeaturedProjects() {
  const [activeProjectId, setActiveProjectId] = useState<string>(signatureProjects[0].id);
  const [selectedMapNode, setSelectedMapNode] = useState<string>("Anpara");
  
  // Before / After Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeProject = signatureProjects.find(p => p.id === activeProjectId) || signatureProjects[0];

  // Helper to calculate slider percentage during mouse or touch movement
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  return (
    <div id="projects" className="relative bg-[var(--color-slate-midnight)] overflow-hidden">
      
      {/* Decorative vector overlays */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--color-brand)]/3 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-sky-500/3 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* HEADER SECTION */}
      <Section className="pt-24 pb-12 relative z-10 border-b border-[var(--color-border-glass)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-overline mb-4 block tracking-[0.3em] font-medium text-[var(--color-brand)]">
              CRAFTED LANDMARKS
            </span>
            <Heading level={2} className="text-4xl md:text-6xl tracking-wide font-light mb-6">
              Our <span className="font-serif text-[var(--color-brand)] italic">Signature Works.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Explore how Pawan Kumar and Gopal Kumar elevate events into historical moments. From massive 18,000 sq ft hurricane-proof canopies to royal dining enclosures, these case studies demonstrate the absolute certainty of our word.
            </p>
          </div>
        </Container>
      </Section>

      {/* MAIN CONTAINER: STORY DECK & PROJECT SWITCHER */}
      <Section className="py-16 md:py-24 relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* SIDEBAR NAVIGATION GRID */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-4 bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)]">
                <span className="text-[10px] font-mono text-[var(--color-brand)] tracking-[0.2em] uppercase block mb-4">
                  SELECT ARCHITECTURAL STUDY
                </span>
                
                <div className="space-y-3">
                  {signatureProjects.map((p) => {
                    const isActive = p.id === activeProjectId;
                    return (
                      <button
                        key={p.id}
                        id={`btn-${p.id}`}
                        onClick={() => {
                          setActiveProjectId(p.id);
                          // Reset slider position on project change
                          setSliderPosition(50);
                        }}
                        className={`w-full text-left p-5 transition-all duration-[400ms] border relative group ${
                          isActive 
                            ? 'bg-[var(--color-slate-midnight)] border-[var(--color-brand)] shadow-[var(--shadow-glow-gold)]' 
                            : 'bg-transparent border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-slate-obsidian)]/50'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute right-4 top-4">
                            <Sparkle className="w-4 h-4 text-[var(--color-brand)] animate-pulse" />
                          </div>
                        )}
                        <div className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--color-brand)] mb-1">
                          {p.eventType}
                        </div>
                        <h4 className="text-lg text-white font-medium mb-1 font-serif group-hover:text-[var(--color-brand)] transition-colors">
                          {p.name}
                        </h4>
                        <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5 font-sans">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-brand)]/60" />
                          {p.location}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TRUST QUOTE OVERLAY CARD (Section 7) */}
              <Card className="bg-[var(--color-slate-obsidian)] border-[var(--color-border-glass)] shadow-[var(--shadow-glass-depth)]">
                <span className="text-[10px] font-mono text-[var(--color-brand)] tracking-widest block mb-4">
                  VERIFIED PATRON RECORD
                </span>
                <p className="text-[var(--color-text-muted)] font-serif italic text-sm leading-relaxed mb-6">
                  "{activeProject.clientQuote.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-glass)] w-full">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center font-bold text-xs text-[var(--color-brand)]">
                    {activeProject.clientQuote.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{activeProject.clientQuote.author}</div>
                    <div className="text-[10px] font-mono text-[var(--color-brand)] uppercase">{activeProject.clientQuote.role}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* MAIN PORTFOLIO CASE STUDY (Section 1 & 2 & 3) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* DISPLAY SHOWCASE HERO VISUAL (Section 1) */}
              <div className="relative border border-[var(--color-border-glass)] overflow-hidden rounded-[var(--radius-sharp)] group shadow-2xl">
                <div className="h-[350px] md:h-[480px] w-full relative">
                  <img
                    src={activeProject.heroImage}
                    alt={activeProject.name}
                    className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-midnight)] via-transparent to-transparent"></div>
                  
                  {/* Floating Specs over the Image */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 items-end justify-between z-10">
                    <div className="text-left">
                      <Badge className="mb-2 bg-[var(--color-slate-midnight)]/90 backdrop-blur-md">
                        {activeProject.eventType}
                      </Badge>
                      <h3 className="text-2xl md:text-4xl text-white font-serif tracking-wide">
                        {activeProject.name}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1.5 mt-2">
                        <MapPin className="w-4 h-4 text-[var(--color-brand)]" />
                        {activeProject.location}
                      </p>
                    </div>

                    <div className="bg-[var(--color-slate-midnight)]/90 backdrop-blur-md px-4 py-2 border border-[var(--color-border-glass)] text-xs text-white font-mono uppercase tracking-wider">
                      Date Executed: {activeProject.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* EVENT SCALE INDICATORS (Section 3) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card padding="sm" className="bg-[var(--color-slate-obsidian)] border-[var(--color-border-glass)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-sky-950/40 rounded-sm border border-sky-500/20">
                      <Users className="w-5 h-5 text-sky-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">GUEST PROFILE</div>
                      <div className="text-lg font-serif text-white font-semibold mt-1">{activeProject.scaleIndicators.guests}</div>
                    </div>
                  </div>
                </Card>

                <Card padding="sm" className="bg-[var(--color-slate-obsidian)] border-[var(--color-border-glass)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[var(--color-brand)]/10 rounded-sm border border-[var(--color-border-gold)]">
                      <Clock className="w-5 h-5 text-[var(--color-brand)]" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">SETUP DURATION</div>
                      <div className="text-lg font-serif text-white font-semibold mt-1">{activeProject.scaleIndicators.duration}</div>
                    </div>
                  </div>
                </Card>

                <Card padding="sm" className="bg-[var(--color-slate-obsidian)] border-[var(--color-border-glass)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-emerald-950/40 rounded-sm border border-emerald-500/20">
                      <Hammer className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">STAFF ON-SITE</div>
                      <div className="text-lg font-serif text-white font-semibold mt-1">{activeProject.scaleIndicators.staff}</div>
                    </div>
                  </div>
                </Card>

                <Card padding="sm" className="bg-[var(--color-slate-obsidian)] border-[var(--color-border-glass)]">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-purple-950/40 rounded-sm border border-purple-500/20">
                      <Layers className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">TENT INFRASTRUCTURE</div>
                      <div className="text-lg font-serif text-white font-semibold mt-1">{activeProject.scaleIndicators.tentScale}</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* PROJECT STORY DETAILS: CHALLENGE, PLANNING, EXECUTION, OUTCOME (Section 2) */}
              <div className="p-8 md:p-12 bg-gradient-to-tr from-[var(--color-slate-obsidian)] to-[var(--color-slate-midnight)] border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand)]/5 rounded-full blur-2xl"></div>
                
                <h4 className="font-serif text-2xl text-[var(--color-brand)] border-b border-[var(--color-border-glass)] pb-4 mb-8 flex items-center gap-2">
                  <FileText className="w-6 h-6" /> Case Chronicle: Editorial Story Format
                </h4>

                <div className="space-y-8">
                  {/* Challenge Node */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-rose-400 uppercase tracking-widest font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        01. Challenge
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[var(--color-text-muted)] font-sans font-light text-base leading-relaxed">
                        {activeProject.story.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Planning Node */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-t border-[var(--color-border-glass)]/60 pt-6">
                    <div className="md:col-span-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        02. Planning
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[var(--color-text-muted)] font-sans font-light text-base leading-relaxed">
                        {activeProject.story.planning}
                      </p>
                    </div>
                  </div>

                  {/* Execution Node */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-t border-[var(--color-border-glass)]/60 pt-6">
                    <div className="md:col-span-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-brand)] uppercase tracking-widest font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]"></span>
                        03. Execution
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-white font-sans font-light text-base leading-relaxed">
                        {activeProject.story.execution}
                      </p>
                    </div>
                  </div>

                  {/* Outcome Node */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-t border-[var(--color-border-glass)]/60 pt-6">
                    <div className="md:col-span-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        04. Outcome
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[var(--color-text-muted)] font-sans font-light text-base leading-relaxed italic border-l-2 border-emerald-500/20 pl-4 bg-emerald-950/5 py-1">
                        {activeProject.story.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services Delivered Sub-section (Section 1 extension) */}
                <div className="mt-12 pt-8 border-t border-[var(--color-border-glass)] text-left">
                  <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--color-brand)] mb-3">
                    COMPREHENSIVE SERVICES DEPLOYED:
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProject.servicesDelivered.map((serv, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-[var(--color-slate-midnight)]/80 text-white font-sans px-3.5 py-1.5 border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] flex items-center gap-1.5 shadow"
                      >
                        <span className="w-1 h-1 bg-[var(--color-brand)] rounded-full"></span>
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 4 — BEFORE / AFTER TRANSFORMATION (Interactive Drag Slider) */}
      <Section className="py-24 bg-[var(--color-slate-obsidian)] border-y border-[var(--color-border-glass)] relative z-10">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-overline mb-4 block tracking-[0.25em] text-[var(--color-brand)]">
              Before / After Transmutation
            </span>
            <Heading level={2} className="text-3xl md:text-5xl leading-tight mb-4">
              Ground Zero To <span className="font-serif text-[var(--color-brand)] italic">Unrivaled Grandeur.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-2xl mx-auto">
              Drag the golden central divider below horizontally to reveal how we command empty fields, raw yards, and parking zones, turning them into imperial wedding backdrops.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            
            {/* Draggable canvas frame wrapper */}
            <div 
              ref={sliderContainerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="h-[300px] sm:h-[450px] md:h-[550px] w-full relative select-none rounded-[var(--radius-sharp)] overflow-hidden border border-[var(--color-border-glass)] shadow-[var(--shadow-trust-anchor)] cursor-ew-resize"
            >
              {/* BEFORE IMAGE (Bottom Layer) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeProject.beforeAfter.beforeUrl}
                  alt="Raw Ground Setup"
                  className="w-full h-full object-cover pointer-events-none filter brightness-70"
                />
                
                {/* Before floating description */}
                <div className="absolute top-6 left-6 z-10 bg-black/75 px-4 py-2 border border-red-500/30 text-[11px] text-red-400 font-mono uppercase tracking-widest rounded-sm">
                  {activeProject.beforeAfter.beforeLabel}
                </div>
              </div>

              {/* AFTER IMAGE (Top Layer with Clip-path/width absolute boundaries) */}
              <div 
                className="absolute inset-y-0 left-0 h-full overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* Important: Force image to retain parent width to overlap precisely */}
                <div className="absolute inset-y-0 left-0 h-[300px] sm:h-[450px] md:h-[550px] w-[calc(100vw-3rem)] max-w-5xl">
                  <img
                    src={activeProject.beforeAfter.afterUrl}
                    alt="Finished Luxury Pavilion"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                {/* After floating description */}
                <div className="absolute top-6 right-6 z-10 bg-black/75 px-4 py-2 border border-[var(--color-border-gold)] text-[11px] text-[var(--color-brand)] font-mono uppercase tracking-widest rounded-sm whitespace-nowrap">
                  {activeProject.beforeAfter.afterLabel}
                </div>
              </div>

              {/* SLIDER DIVIDER WIRE */}
              <div 
                className="absolute inset-y-0 top-0 bottom-0 w-[2px] bg-[var(--color-brand)] z-20 cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Drag handle button overlay */}
                <div className="w-10 h-10 shadow-lg rounded-full bg-[var(--color-slate-midnight)] border-2 border-[var(--color-brand)] flex items-center justify-center -translate-x-[19px] shrink-0">
                  <div className="flex gap-0.5 items-center justify-center">
                    <span className="w-1 h-3 bg-[var(--color-brand)]/70 rounded-full"></span>
                    <span className="w-1 h-4 bg-[var(--color-brand)] rounded-full"></span>
                    <span className="w-1 h-3 bg-[var(--color-brand)]/70 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Helpful Mouse guidance bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-sm border border-[var(--color-border-glass)] pointer-events-none z-10 flex items-center gap-2 text-xs font-mono text-white">
                <MousePointer className="w-4 h-4 text-[var(--color-brand)] animate-bounce" />
                <span>Drag inside the image to contrast</span>
              </div>

            </div>

            <p className="mt-4 text-xs font-mono text-[var(--color-text-muted)] text-center italic">
              *Shown: {activeProject.beforeAfter.description}
            </p>

          </div>
        </Container>
      </Section>

      {/* SECTION 5 — SERVICE BREAKDOWN GRID */}
      <Section className="py-24 relative z-10 border-b border-[var(--color-border-glass)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-overline mb-4 block tracking-[0.25em] text-[var(--color-brand)]">
              Operational Competencies
            </span>
            <Heading level={2} className="text-3xl md:text-5xl leading-tight mb-4">
              Pristine <span className="font-serif text-[var(--color-brand)] italic">Service Layouts.</span>
            </Heading>
            <p className="text-[var(--color-text-muted)] font-light text-sm md:text-base max-w-2xl mx-auto">
              To operate simultaneous elite weddings under tight timelines, we deploy specialized units that handle independent details meticulously. We do not hire random vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceBreakdown.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/30 flex flex-col justify-between text-left h-full group relative transition-colors shadow-lg"
              >
                {/* Decorative background hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand)]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[var(--color-slate-midnight)] border border-[var(--color-border-glass)] group-hover:border-[var(--color-brand)]/60 rounded-[var(--radius-sharp)] flex items-center justify-center mb-6 transition-colors shadow">
                    {getServiceIcon(service.title)}
                  </div>

                  <h4 className="font-serif text-lg text-white font-medium group-hover:text-[var(--color-brand)] tracking-wide mb-3 transition-colors">
                    {service.title}
                  </h4>

                  <p className="text-[var(--color-text-muted)] font-sans text-xs md:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--color-border-glass)] flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-brand)] uppercase tracking-widest relative z-10">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sovereign Standard</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6 — REGIONAL OPERATIONS INTERACTIVE MAP */}
      <Section className="py-24 bg-gradient-to-b from-[var(--color-slate-midnight)] to-[var(--color-slate-obsidian)] relative z-10 border-b border-[var(--color-border-glass)] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/2 rounded-full blur-3xl pointer-events-none"></div>
        
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Map explanation / Active Card */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-overline block tracking-[0.2em] text-[var(--color-brand)]">Strategic Logistics</span>
              <Heading level={2} className="text-3xl md:text-5xl leading-tight">
                Our Territory <br/>
                <span className="font-serif text-[var(--color-brand)] italic">And Reach.</span>
              </Heading>
              
              <p className="text-[var(--color-text-muted)] font-light text-base leading-relaxed">
                We operate across all of Sonbhadra’s key industrial townships and wedding centers. Select any local node in our schematics matrix to observe regional setup volume and signature project distribution.
              </p>

              {/* Active Region Stats display panel */}
              {regionalNodes.map((node) => {
                if (node.name !== selectedMapNode) return null;
                return (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="p-8 bg-[var(--color-slate-midnight)] border border-[var(--color-brand)]/40 hover:border-[var(--color-brand)] shadow-[var(--shadow-glow-gold)] rounded-[var(--radius-sharp)] flex flex-col justify-between text-left">
                      <div>
                        <div className="text-xs font-mono text-[var(--color-brand)] uppercase tracking-widest mb-1">
                          SELECTED ACTIVE TERRITORY
                        </div>
                        <h4 className="text-2xl font-serif text-white mb-2">{node.name}, UP</h4>
                        
                        <p className="text-sm text-[var(--color-text-muted)] font-sans font-light leading-relaxed mb-6">
                          {node.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--color-border-glass)]">
                        <div>
                          <div className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">SUCCESSFUL SETUP VOLUME</div>
                          <div className="text-2xl font-serif font-semibold text-white mt-1">{node.projectCount}+</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">RELIABILITY INDEX</div>
                          <div className="text-2xl font-serif font-semibold text-emerald-400 mt-1">100% On-Time</div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-1.5 text-xs text-[var(--color-brand)] font-mono uppercase tracking-widest">
                        <Sparkle className="w-3.5 h-3.5" />
                        <span>Featured: {node.featuredProject}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Visual Glass Radar Schematic (The Conceptual Map) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full aspect-[4/3] max-w-[650px] bg-[var(--color-slate-midnight)]/80 border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] overflow-hidden shadow-2xl p-6 md:p-8">
                
                {/* Visual Background grid overlay */}
                <div className="absolute inset-0 opacity-[0.13] bg-[radial-gradient(var(--color-brand)_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>
                
                {/* Rhythmic sonar sweeping radar sweep lines */}
                <div className="absolute inset-x-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand)]/40 to-transparent top-0 animate-[bounce_8s_infinite] pointer-events-none"></div>

                {/* Legend watermark */}
                <div className="absolute bottom-4 left-6 z-10 pointer-events-none text-left">
                  <div className="text-[10px] font-mono text-white/50 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-pulse"></span>
                    ACTIVE SONBHADRA LOGISTICS SECTORS
                  </div>
                  <div className="text-[9px] font-mono text-white/20 uppercase mt-0.5">Scale: Real-time Dispatch Sync</div>
                </div>

                {/* Abstract Territory Outline connectors using simple floating CSS paths/lines representation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <polyline
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    points="90,120 280,70 420,165 470,250 200,280 90,120"
                  />
                  <line x1="280" y1="70" x2="200" y2="280" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="420" y1="165" x2="90" y2="120" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeDasharray="2 2" />
                </svg>

                {/* MAP INTERACTIVE NODES */}
                {regionalNodes.map((node) => {
                  const isActive = node.name === selectedMapNode;
                  return (
                    <button
                      key={node.name}
                      onClick={() => setSelectedMapNode(node.name)}
                      className="absolute group z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    >
                      {/* Pulse rings */}
                      <span className={`absolute inline-flex h-12 w-12 rounded-full opacity-50 -translate-x-[16px] -translate-y-[16px] transition-all duration-1000 ${
                        isActive ? 'animate-ping bg-[var(--color-brand)]/20' : 'group-hover:animate-ping bg-white/5'
                      }`} />

                      <div className="relative">
                        {/* Core gold/white circle */}
                        <div className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                          isActive 
                            ? 'bg-[var(--color-brand)] border-white scale-125 shadow-[0_0_12px_rgba(212,175,55,0.8)]'
                            : 'bg-[var(--color-slate-midnight)] border-[var(--color-brand)] group-hover:bg-white group-hover:scale-110'
                        }`} />
                        
                        {/* Hover coordinates label overlay */}
                        <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 bg-[var(--color-slate-midnight)]/95 border px-2.5 py-1 text-[10px] font-mono rounded-sm transition-all duration-300 whitespace-nowrap shadow-lg flex items-center gap-1.5 ${
                          isActive 
                            ? 'opacity-100 translate-y-0 text-[var(--color-brand)] border-[var(--color-brand)]'
                            : 'opacity-0 translate-y-2 pointer-events-none text-white border-[var(--color-border-glass)] group-hover:opacity-100 group-hover:translate-y-0'
                        }`}>
                          <MapPinIcon className="w-3 h-3" />
                          <span>{node.name} ({node.projectCount}+ Setups)</span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Territory schematic outline lines label */}
                <div className="absolute top-4 right-6 text-right font-mono text-[9px] text-white/40 space-y-0.5">
                  <div>ANPARA DIVISION // ACTIVE</div>
                  <div>SONBHADRA MAIN // HQ</div>
                  <div>RENUSAGAR LOOP // ONLINE</div>
                  <div>SHAKTINAGAR CLUSTER // LIVE</div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* SECTION 8 — CALL-TO-ACTION (CTA) BLOCK */}
      <Section className="py-24 md:py-32 bg-[var(--color-slate-obsidian)] relative z-10 overflow-hidden">
        
        {/* Intense luxury glow spotlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--color-brand)]/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto rounded-[var(--radius-sharp)] border border-[var(--color-border-gold)] bg-gradient-to-tr from-[var(--color-slate-midnight)]/90 to-[var(--color-slate-obsidian)]/90 p-12 md:p-20 text-center shadow-[var(--shadow-glow-gold)] relative">
            
            {/* Elegant watermark */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-slate-midnight)] border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-brand)] text-xl font-serif">
                ✻
              </div>
            </div>

            <span className="text-overline block tracking-[0.3em] text-[var(--color-brand)] mb-4 mt-2">
              Sovereign Date Registration
            </span>

            <Heading level={2} className="text-3xl md:text-5xl lg:text-6xl tracking-wide font-light mb-6">
              Ready To Plan <br/>
              <span className="font-serif text-[var(--color-brand)] italic">Your Event?</span>
            </Heading>

            <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed max-w-2xl mx-auto text-base md:text-lg mb-10">
              In peak wedding season, we restrict simultaneous bookings to ensure absolute material cleanliness, strict timeline compliance, and direct on-site management under the Kumar family's personal watch. Secure your date now.
            </p>

            {/* Triple Interactive CTA Options */}
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              
              <Button
                variant="primary"
                size="lg"
                icon={<Phone className="w-5 h-5 text-black" />}
                className="w-full sm:w-auto px-8"
                onClick={() => window.location.href = "tel:+919452460040"}
              >
                Call Now (+91 94524 60040)
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 border-[rgba(255,255,255,0.15)] text-white bg-transparent hover:bg-white/5"
                icon={
                  <svg className="w-5 h-5 text-[var(--color-brand)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.149 1.45 4.674 1.451a9.92 9.92 0 005.148-1.423l.37-.22 3.826.1a12.022 12.022 0 00-.09-3.722l-.241-.383a9.954 9.954 0 001.401-5.066c.002-5.467-4.403-9.913-9.824-9.913a9.8 9.8 0 00-6.945 2.898A9.857 9.857 0 002.13 11.838a9.92 9.92 0 001.439 5.093l-.265.419L3.022 21.03l3.625-.953l-.001-.293z" />
                  </svg>
                }
                onClick={() => window.open('https://wa.me/919452460040', '_blank')}
              >
                WhatsApp Now
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 border-[rgba(212,175,55,0.3)] text-[var(--color-brand)] bg-transparent hover:bg-[var(--color-brand)]/5"
                icon={<Calendar className="w-5 h-5 text-[var(--color-brand)]" />}
                onClick={() => {
                  // Direct the customer down to contact form or initiate phone request
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Schedule Site Visit
              </Button>

            </div>

            {/* Kumar Slogans footnote */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-[var(--color-text-muted)] text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Available all days. Pre-booking consultation is completely free of cost.</span>
            </div>

          </div>
        </Container>
      </Section>

    </div>
  );
}
