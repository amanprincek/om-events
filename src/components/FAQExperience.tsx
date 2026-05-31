import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Phone, 
  Sparkles,
  HelpCircleIcon, 
  X,
  MessageCircleCode,
  ShieldCheck,
  CalendarCheck,
  Info
} from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge, Button } from '@om-tent/ui-system';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Booking" | "Services" | "Safety";
  popular?: boolean;
}

export default function FAQExperience() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | "Booking" | "Services" | "Safety">("All");
  const [openId, setOpenId] = useState<string | null>("faq_1"); // Pre-open first question for visual rhythm

  const faqList: FAQItem[] = [
    {
      id: "faq_1",
      category: "Booking",
      popular: true,
      question: "Kitne din pehle booking karni chahiye?",
      answer: "Monsoon aur winter wedding seasons (bade shubh lagan dates) me bookings bahut jaldi full ho jaati hain. Perfect luxury fabrics, site planning aur custom decoration arrange karne ke liye hum recommend karte hain ki aap kam se kam 2 se 3 mahine pehle apni date booked karayein."
    },
    {
      id: "faq_2",
      category: "Services",
      popular: true,
      question: "Kya aap weddings aur receptions dono handle karte hain?",
      answer: "Haan bilkul! Hum poora customized wedding package handle karte hain. Shubh haldi-mehndi se lekar, sangeet lounge, main royal wedding pavilion stages aur grand reception setups tak, har ek single event ko premium luxury royal themes ke sath design kiya jata hai."
    },
    {
      id: "faq_3",
      category: "Services",
      popular: true,
      question: "Kya catering bhi provide ki jaati hai?",
      answer: "Haan, 'Om Tent House And Caterers' complete infrastructure ke expert hain. Hum premium high-quality utensils, beautiful modern catering stall decoration setups, expert chef management aur standard waiter hospitality deliver karte hain taaki swaad aur service dono bemisaal rahen."
    },
    {
      id: "faq_4",
      category: "Booking",
      question: "Aap kin-kin areas mein service dete hain?",
      answer: "Hamara primary material hub Sonbhadra me hai aur hum Anpara, Renusagar, Shaktinagar, Auri, Bijpur aur iske aas-paas ke sabhi localized zones me flawless service deliver karte hain. Humare pass dedicated logistics vehicles hain jo door ke locations par bhi time se saman pahunchati hain."
    },
    {
      id: "faq_5",
      category: "Booking",
      question: "Kya site visit available hai aur kya iska koi charge hota hai?",
      answer: "Ji haan, site visit bilkul available hai aur yeh service humare clients ke liye 100% FREE OF COST hai. Pawan Kumar ya Gopal Kumar khud location par aakar pure area ki measurements aur ground laser analysis check karte hain taaki wind flow aur safety perfectly dynamic rahe."
    },
    {
      id: "faq_6",
      category: "Safety",
      popular: true,
      question: "Kya aap bahut bade scale/large capacity events manage kar sakte hain?",
      answer: "Ji haan, humara expert record hai! Humne ek sath 18,000 sq ft tak ke colossal iron truss pavilions aur 2500+ guest capability wale landmark functions safely coordinate kiye hain. Hum premium engineered wind-insulated robust frames use karte hain."
    },
    {
      id: "faq_7",
      category: "Services",
      question: "Kya event ke din aapka koi expert support direct venue par milta hai?",
      answer: "Bilkul! Hum pure event ke time direct supervisor and alignment engineering staff stand-by par rakhte hain. Electrical generator load balancing, lightning effects adjustment, aur catering layout dynamic speed par monitor karne ke liye hum aakhiri guest tak datte rehte hain."
    },
    {
      id: "faq_8",
      category: "Booking",
      question: "Om Tent House me booking karne ka aasan process kya hai?",
      answer: "Bahut hi simple hai! Sabse pehle aap WhatsApp ya Phone call par initial consultation karte hain. Uske baad hamara free site-visit survey hota hai, hum maps final karte hain aur line-by-item clear GST estimate provide karte hain. Quotation match hone par booking advanced lock ho jati hai."
    },
    {
      id: "faq_9",
      category: "Services",
      question: "Kya hum drapes aur decorative theme lighting customize kar sakte hain?",
      answer: "Haan! Customizable colors hamara sabse bada plus-point hai. Aap royal whites, warm golds, emerald green, ya baby pink draperies se lekar dynamic warm LED spots, heavy chandeliers aur premium artificial flower borders ko digitally select aur customize kar sakte hain."
    },
    {
      id: "faq_10",
      category: "Safety",
      popular: true,
      question: "Achanak badalte mausam ya barish jaisi emergency situations kaise handle karte hain?",
      answer: "Hamare designs waterproof and storms-resistant hote hain. Hum aluminum safety panels aur lohe ke high-strength anchors ko 4 feet deep coordinate karte hain. Emergency power safety ke liye high-power stand-by silent diesel generators aur experienced technical wire specialist on-site rehte hain."
    }
  ];

  const filteredFaqs = faqList.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq" className="bg-[var(--color-slate-obsidian)] border-t border-[var(--color-border-glass)]/20 relative py-24 md:py-32 overflow-hidden">
      
      {/* Decorative luxury gradient lighting */}
      <div className="absolute top-[10%] right-[15%] w-80 h-80 bg-[var(--color-brand)]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-[var(--color-brand)]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <Container className="relative z-10">

        {/* ================= SECTION 1: FAQ SECTION INTRO ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-overline mb-3 block tracking-[0.25em] text-[var(--color-brand)]">
            SMART REASSURANCE CENTER
          </span>
          <Heading level={2} className="text-4xl md:text-5xl tracking-wide font-light text-white mb-6">
            Aapke Sawalon Ke <span className="font-serif text-[var(--color-brand)] italic">Jawaab</span>
          </Heading>
          <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed text-base md:text-lg max-w-xl mx-auto mt-4">
            Hamare customers ke sabse common sawalon ke clear, honest aur seedhe jawaab taaki aap bina kisi hesitation ke premium planning shuru kar saken.
          </p>
        </div>

        {/* Quick Search & Category Tabs Navigation */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--color-slate-midnight)] border border-[var(--color-border-glass)] p-3 md:p-4 rounded-[var(--radius-sharp)] shadow-[var(--shadow-trust-anchor)]">
            
            {/* Hinglish Category Filter buttons tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {(["All", "Booking", "Services", "Safety"] as const).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[var(--color-brand)] text-black font-semibold shadow-[0_2px_10px_rgba(212,175,55,0.25)]' 
                        : 'text-[var(--color-text-muted)] hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-[var(--color-border-glass)]'
                    }`}
                  >
                    {cat === "All" && "Sabhi Questions"}
                    {cat === "Booking" && "Booking & Process"}
                    {cat === "Services" && "Services & Catering"}
                    {cat === "Safety" && "Safety & Mausam"}
                  </button>
                );
              })}
            </div>

            {/* Smart search input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Apna sawaal search karein..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.02)] border border-[var(--color-border-glass)] focus:border-[var(--color-brand)]/50 focus:outline-none placeholder-slate-600 font-sans font-light text-sm px-10 py-2.5 text-white rounded-sm transition-all"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ================= SECTION 3: FAQ ACCORDION EXPERIENCE ================= */}
        <div className="max-w-4xl mx-auto space-y-4 mb-20 md:mb-28">
          
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <GlassPanel 
                      intensity={isOpen ? "shield" : "ambient"}
                      className={`border transition-all duration-300 rounded-[var(--radius-sharp)] overflow-hidden ${
                        isOpen 
                          ? 'border-[var(--color-brand)]/40 shadow-[0_12px_40px_rgba(212,175,55,0.04)] bg-[var(--color-slate-midnight)]' 
                          : 'border-[var(--color-border-glass)]/60 hover:border-white/10 hover:bg-white/[0.01]'
                      }`}
                    >
                      {/* Accordion header button */}
                      <button
                        onClick={() => toggleOpen(faq.id)}
                        className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 cursor-pointer relative z-10"
                        aria-expanded={isOpen}
                      >
                        <div className="flex gap-4 items-start">
                          <span className={`p-1.5 rounded-full mt-0.5 shrink-0 transition-colors ${
                            isOpen ? "bg-[rgba(212,175,55,0.15)] text-[var(--color-brand)]" : "bg-white/[0.02] text-slate-500"
                          }`}>
                            <HelpCircle className="w-4 h-4 md:w-5 h-5" />
                          </span>

                          <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-[9px] font-mono tracking-widest text-[var(--color-brand)] uppercase">
                                {faq.category}
                              </span>
                              {faq.popular && (
                                <span className="inline-flex items-center gap-1 text-[8px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-400/5 px-2 py-0.5 border border-cyan-400/20">
                                  ★ Popular Query
                                </span>
                              )}
                            </div>
                            <h3 className={`font-serif text-lg md:text-xl font-light tracking-wide transition-colors ${
                              isOpen ? 'text-white' : 'text-slate-300 hover:text-white'
                            }`}>
                              {faq.question}
                            </h3>
                          </div>
                        </div>

                        {/* Gold status toggler animation indicator */}
                        <div className={`p-2 rounded-full border shrink-0 transition-all duration-300 ${
                          isOpen 
                            ? 'border-[var(--color-brand)] text-[var(--color-brand)] rotate-180 bg-[rgba(212,175,55,0.05)]' 
                            : 'border-[var(--color-border-glass)] text-slate-500'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Accordion response message panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-[var(--color-border-glass)]/40 text-left bg-[rgba(0,0,0,0.15)]">
                              <div className="pl-0 md:pl-11">
                                <p className="text-[var(--color-text-muted)] font-sans font-light text-base leading-relaxed max-w-3xl mb-4">
                                  {faq.answer}
                                </p>
                                
                                <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[var(--color-brand)] uppercase border-t border-[var(--color-border-glass)]/20 pt-4 w-full">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>100% Kumar Family Fulfillment Promise</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </GlassPanel>
                  </motion.div>
                );
              })
            ) : (
              <GlassPanel intensity="ambient" className="p-12 text-center border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)]">
                <Info className="w-8 h-8 text-[var(--color-brand)] mx-auto mb-4 animate-bounce" />
                <p className="text-white font-serif text-lg mb-2">Humein aapka search filter match nahi hua.</p>
                <p className="text-[var(--color-text-muted)] font-sans text-sm font-light max-w-md mx-auto mb-6">
                  Fikar mat kije, hum har sawaal discuss karne ko taiyaar hain. Direct phone call ya WhatsApp messages par baat shuru karein.
                </p>
                <Button 
                  onClick={() => setSearchQuery("")}
                  variant="secondary"
                  className="font-mono text-xs uppercase"
                >
                  Clear search parameters
                </Button>
              </GlassPanel>
            )}
          </AnimatePresence>

        </div>

        {/* ================= SECTION 4: TRUST BLOCK (Koi aur sawaal hai?) ================= */}
        <div className="max-w-4xl mx-auto">
          <GlassPanel intensity="shield" className="p-8 md:p-12 !bg-[var(--color-slate-midnight)] border border-[var(--color-border-gold)] rounded-[var(--radius-sharp)] text-center relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand)]/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-brand)]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              
              <div className="inline-flex p-3 rounded-full bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] text-[var(--color-brand)] mb-2 shadow-[var(--shadow-glow-gold)]">
                <HelpCircleIcon className="w-5 h-5 translate-y-0 text-[var(--color-brand)]" />
              </div>

              <Heading level={2} className="text-3xl md:text-4.5xl leading-tight text-white font-serif font-light">
                Koi Aur <span className="font-serif text-[var(--color-brand)] italic">Sawaal Hai?</span>
              </Heading>

              <p className="text-[var(--color-text-muted)] font-sans font-light text-base leading-relaxed">
                Koi bhi complicated setup size, location problem, custom lighting requirements, ya payment milestone concerns ke bare me be-jhijhak direct owner se discuss karein.
              </p>

              {/* Action grid options contact button links */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                
                <a 
                  href="https://wa.me/919452460040"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-3.5 px-8 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all text-white rounded-sm shadow-lg text-xs uppercase tracking-wider font-semibold hover:-translate-y-0.5 cursor-pointer font-mono"
                >
                  <MessageCircleCode className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Karein</span>
                </a>

                <a 
                  href="tel:+919452460040"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-3.5 px-8 bg-[var(--color-brand)] hover:bg-[var(--color-champagne)] active:scale-[0.98] transition-all text-black rounded-sm shadow-lg text-xs uppercase tracking-wider font-semibold hover:-translate-y-0.5 cursor-pointer font-mono"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Direct Call Karein</span>
                </a>

              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--color-text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active 24 Hours • Free Direct Owner Consultation</span>
              </div>

            </div>

          </GlassPanel>
        </div>

      </Container>
    </Section>
  );
}
