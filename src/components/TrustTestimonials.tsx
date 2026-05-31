import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  ArrowRight,
  Clock, 
  Briefcase, 
  Shield, 
  Users, 
  MessageSquare,
  Award,
  ChevronRight,
  Calendar,
  ThumbsUp
} from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge, Button, Card } from '@om-tent/ui-system';
import { testimonials, successStories, googleReviews, socialBadges } from '../data/testimonialsData';
import AnimatedCounter from './AnimatedCounter';

export default function TrustTestimonials() {
  const [activeStoryCategory, setActiveStoryCategory] = useState<'Wedding' | 'Reception' | 'School Function' | 'Birthday'>('Wedding');
  const [activeTestimonialId, setActiveTestimonialId] = useState<string>("t_1");

  // Dynamic Icon Mapping for Social Badges
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[var(--color-brand)]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[var(--color-brand)] text-center" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[var(--color-brand)]" />;
      default:
        return <CheckCircle className="w-6 h-6 text-[var(--color-brand)]" />;
    }
  };

  const selectedStory = successStories.find(story => story.category === activeStoryCategory) || successStories[0];

  return (
    <div id="testimonials" className="relative bg-[var(--color-slate-midnight)] overflow-hidden">
      
      {/* SECTION 2 & 3: TRUST STATS & LUXURY STATEMENT BLOCK (TRUST PROMISE) */}
      <Section className="pb-16 pt-24 md:pt-32 relative overflow-hidden bg-gradient-to-b from-[var(--color-slate-midnight)] to-[var(--color-slate-obsidian)] border-b border-[var(--color-border-glass)]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-brand)]/5 rounded-full blur-3xl -translate-y-1/2 z-0"></div>
        
        <Container className="relative z-10">
          
          {/* Trust Promise Display Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center max-w-4xl mx-auto"
          >
            <span className="text-overline mb-4 block tracking-[0.25em] text-[var(--color-brand)]">
              Hamara Sakht Vaada
            </span>
            
            {/* Elegant luxury quote block */}
            <div className="relative p-12 md:p-16 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/40 border border-[var(--color-border-glass)] shadow-[var(--shadow-glass-depth)]">
              <span className="absolute top-4 left-6 text-7xl font-serif text-[var(--color-brand)]/15 select-none leading-none">“</span>
              <Heading level={2} className="relative z-10 text-3xl md:text-5xl lg:text-6xl !leading-[1.2] tracking-wide font-light mb-6">
                Jo Vaada Karte Hain, <span className="font-serif text-[var(--color-brand)] italic">Use Nibhate Hain.</span>
              </Heading>
              
              <p className="text-[var(--color-text-muted)] text-base md:text-lg font-sans font-light max-w-2xl mx-auto leading-relaxed">
                Sudden cancellations, kharab materials aur bin-bataye achanak badhne wali fees se pareshan log jab humare pas aate hain, toh unhe asli sukoon milta hai. 2019 se abhi tak Pawan aur Gopal Kumar ke direct leadership ke under, humne ek bhi event beech mein nahi choda hai. Ek baar bhi nahi.
              </p>
              
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-[var(--color-border-glass)]"></div>
                <span className="text-overline tracking-wider text-[var(--color-brand)]">
                  Pawan aur Gopal Kumar Ka Saccha Guarantee
                </span>
                <div className="h-[1px] w-12 bg-[var(--color-border-glass)]"></div>
              </div>
            </div>
          </motion.div>

          {/* Animated Statistics Counters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)]"
            >
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] mb-2">
                <AnimatedCounter value={7} suffix="+" />
              </div>
              <div className="text-overline text-[var(--color-text-primary)] text-xs tracking-widest font-mono">
                Saalon Ka Bharosa
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)]"
            >
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] mb-2">
                <AnimatedCounter value={2500} suffix="+" />
              </div>
              <div className="text-overline text-[var(--color-text-primary)] text-xs tracking-widest font-mono">
                Guest Capacity
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)]"
            >
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] mb-2">
                <AnimatedCounter value={3} suffix="" />
              </div>
              <div className="text-overline text-[var(--color-text-primary)] text-xs tracking-widest font-mono">
                Ek Sath Setups
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)]"
            >
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] mb-2">
                <AnimatedCounter value={30} suffix="" />
              </div>
              <div className="text-overline text-[var(--color-text-primary)] text-xs tracking-widest font-mono">
                Trained Crew
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="col-span-2 md:col-span-1 p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)]"
            >
              <div className="text-3xl md:text-5xl font-serif text-[var(--color-brand)] mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="text-overline text-[var(--color-text-primary)] text-xs tracking-widest font-mono">
                Successful Events
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>


      {/* SECTION 1: PREMIUM TESTIMONIALS PANEL & SELECTION */}
      <Section className="py-24 md:py-32 relative">
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[var(--color-brand)]/5 rounded-full blur-3xl z-0"></div>
        <Container className="relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Headers & Selection Panel */}
            <div className="lg:col-span-5">
              <span className="text-overline mb-4 block tracking-widest text-[var(--color-brand)]">Patron Appraisals</span>
              <Heading level={2} className="mb-6 text-4xl md:text-5xl">
                Apno Ke Sacche <br/>
                <span className="font-light italic text-[var(--color-brand)]">Aur Meethe Shabd.</span>
              </Heading>
              
              <p className="text-[var(--color-text-muted)] font-sans font-light leading-relaxed mb-8 max-w-md">
                Hum sirf tent lagane ka dhandha nahi karte, balki parivaarik rishte banate hain jo event ke baad bhi hamesha kayam rehte hain. Dekhiye Anpara, Renusagar aur Shaktinagar ke parivaaron ke verified reviews.
              </p>

              {/* Interaction List triggers */}
              <div className="space-y-4">
                {testimonials.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => setActiveTestimonialId(test.id)}
                    className={`w-full text-left p-4 rounded-[var(--radius-sharp)] border transition-all duration-[400ms] flex items-center justify-between ${
                      activeTestimonialId === test.id
                        ? 'bg-[var(--color-slate-obsidian)] border-[var(--color-brand)] shadow-[var(--shadow-glow-gold)] bg-opacity-95'
                        : 'bg-transparent border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-slate-midnight)]/40'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {test.name}
                        {activeTestimonialId === test.id && (
                          <span className="inline-block w-1.5 h-1.5 bg-[var(--color-brand)] rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase mt-1">
                        {test.eventType} • {test.location}
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      activeTestimonialId === test.id ? 'text-[var(--color-brand)] translate-x-1' : 'text-[var(--color-text-muted)]'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Display Showcase Card with Fading AnimatePresence */}
            <div className="lg:col-span-7 h-full flex flex-col justify-center min-h-[420px]">
              <AnimatePresence mode="wait">
                {testimonials.map((test) => {
                  if (test.id !== activeTestimonialId) return null;
                  return (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="w-full"
                    >
                      <Card className="!p-0 overflow-hidden relative border border-[var(--color-border-glass)] bg-[var(--color-slate-obsidian)] text-left flex flex-col w-full rounded-[var(--radius-sharp)] h-full">
                        {/* Event Photo Header banner with luxury overlap gradient */}
                        {test.eventPhoto && (
                          <div className="h-64 w-full relative overflow-hidden">
                            <img
                              src={test.eventPhoto}
                              alt={test.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-obsidian)] to-transparent"></div>
                            
                            {/* Stars badge over lay */}
                            <div className="absolute bottom-4 left-6 flex items-center gap-1 bg-[var(--color-slate-midnight)]/80 backdrop-blur-md px-3 py-1.5 border border-[var(--color-border-glass)]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-8 md:p-10 relative">
                          <Quote className="absolute top-8 right-8 w-12 h-12 text-[var(--color-brand)]/10 select-none" />
                          
                          <div className="mb-4 text-xs text-[var(--color-brand)] font-mono uppercase tracking-widest">
                            {test.eventType} • Verified Host
                          </div>

                          <Heading level={3} className="text-xl md:text-2xl mb-4 font-serif text-white">
                            {test.name}
                          </Heading>

                          <p className="text-[var(--color-text-muted)] font-sans font-light italic text-base md:text-lg leading-relaxed mb-6">
                            "{test.review}"
                          </p>

                          <div className="pt-6 border-t border-[var(--color-border-glass)] flex items-center justify-between">
                            <div className="text-sm font-sans font-light text-[var(--color-text-primary)] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                              Located in {test.location}, India
                            </div>
                            <Award className="w-5 h-5 text-[var(--color-brand)]" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </Container>
      </Section>


      {/* SECTION 4: CLIENT SUCCESS STORIES (PROBLEM -> SOLUTION -> OUTCOME) */}
      <Section className="py-24 md:py-32 bg-[var(--color-slate-obsidian)] border-y border-[var(--color-border-glass)] relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(var(--color-brand)_2px,transparent_2px)] [background-size:24px_24px]"></div>
        
        <Container className="relative z-10">
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block tracking-widest text-[var(--color-brand)]">Zimmewari Ki Kahaaniyan</span>
            <Heading level={2} className="mb-6">Case Chronicles & Success Stories</Heading>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto font-light text-base md:text-lg">
              Dekhiye kaise hamari team ne barish, location problems ya crowd challenges ko solid planning aur engineering se overcome kiya.
            </p>
          </div>

          {/* Success Story Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(['Wedding', 'Reception', 'School Function', 'Birthday'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveStoryCategory(cat)}
                className={`px-6 py-3 border-b text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  activeStoryCategory === cat
                    ? 'border-[var(--color-brand)] text-[var(--color-brand)] bg-[var(--color-slate-midnight)]/50'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {cat} Core Study
              </button>
            ))}
          </div>

          {/* Tab Display Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStoryCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              
              {/* Story Visual Frame */}
              <div className="lg:col-span-5 relative min-h-[300px] border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] overflow-hidden">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover object-center absolute inset-0 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-obsidian)] via-[var(--color-slate-obsidian)]/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-3">{selectedStory.category}</Badge>
                  <h4 className="text-xl font-serif text-white tracking-wide">{selectedStory.title}</h4>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono mt-1">Venue: {selectedStory.location}</p>
                </div>
              </div>

              {/* Challenge -> Solution -> Outcome Core Content */}
              <div className="lg:col-span-7 flex flex-col justify-between p-8 md:p-10 bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] text-left">
                
                <div className="space-y-8">
                  {/* Challenge Row */}
                  <div>
                    <div className="flex items-center gap-3 text-rose-400 font-mono text-xs uppercase tracking-widest mb-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                      The Challenge
                    </div>
                    <p className="text-[var(--color-text-muted)] font-sans font-light text-sm md:text-base leading-relaxed">
                      {selectedStory.challenge}
                    </p>
                  </div>

                  {/* Solution Row */}
                  <div>
                    <div className="flex items-center gap-3 text-[var(--color-brand)] font-mono text-xs uppercase tracking-widest mb-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]"></span>
                      Our Strategic Solution (Hamara Solution)
                    </div>
                    <p className="text-white font-sans font-light text-sm md:text-base leading-relaxed">
                      {selectedStory.solution}
                    </p>
                  </div>

                  {/* Outcome Row */}
                  <div>
                    <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      The Outcome & Result (Nateeja)
                    </div>
                    <p className="text-[var(--color-text-muted)] font-sans font-light text-sm md:text-base leading-relaxed">
                      {selectedStory.outcome}
                    </p>
                  </div>
                </div>

                {/* Overlying Client Quote block */}
                <div className="mt-8 pt-8 border-t border-[var(--color-border-glass)]">
                  <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-mono mb-2">Parivaar Ka Feedback</p>
                  <p className="text-sm italic text-[var(--color-text-primary)] font-serif font-light">
                    "{selectedStory.clientQuote}"
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </Container>
      </Section>


      {/* SECTION 5: GOOGLE REVIEW STYLE WALL */}
      <Section className="py-24 md:py-32 relative">
        <div className="absolute left-1/2 bottom-0 w-80 h-80 bg-[var(--color-brand)]/5 rounded-full blur-3xl z-0"></div>
        
        <Container className="relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-overline mb-4 block tracking-widest text-[var(--color-brand)]">Unfiltered Consensus</span>
            <Heading level={2} className="mb-4">Google Review Wall</Heading>
            
            {/* Elegant Header rating showcase */}
            <div className="inline-flex items-center gap-4 bg-[var(--color-slate-obsidian)] p-4 border border-[var(--color-border-glass)] rounded-[var(--radius-sharp)] mt-2">
              <span className="text-2xl font-serif text-white font-bold">4.9 / 5</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                ))}
              </div>
              <span className="text-xs font-mono text-[var(--color-text-muted)] border-l border-[var(--color-border-glass)] pl-4">
                Google Verified Reviews
              </span>
            </div>
          </div>

          {/* Grid Wall of Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((rev) => (
              <motion.div
                key={rev.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)]/80 border border-[var(--color-border-glass)] flex flex-col justify-between text-left shadow-lg hover:border-[var(--color-brand)]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center font-bold text-[10px] text-white">
                        {rev.authorName.charAt(0)}
                      </div>
                      <span className="text-sm font-sans font-medium text-white">{rev.authorName}</span>
                    </div>
                    
                    {/* Tiny Verified Tag */}
                    <div className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                      Google Local
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--color-brand)] text-[var(--color-brand)]" />
                    ))}
                  </div>

                  <p className="text-[var(--color-text-muted)] font-sans font-light text-sm leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border-glass)] flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                  <span>Region: {rev.location}, UP</span>
                  <span>{rev.relativeTime}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </Container>
      </Section>


      {/* SECTION 6: SOCIAL PROOF BADGES */}
      <Section className="py-20 md:py-24 bg-gradient-to-t from-[var(--color-slate-obsidian)] to-[var(--color-slate-midnight)] border-t border-[var(--color-border-glass)]">
        <Container>
          
          <div className="text-center mb-12">
            <span className="text-overline mb-4 block tracking-[0.2em] text-[var(--color-brand)]">Humare 5 Core Pillars</span>
            <Heading level={3} className="text-2xl md:text-3xl text-white font-serif font-light">Sonbhadra Ke Elite Parivaar Hum par Kyun Bharosa Karte Hain</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {socialBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-[var(--radius-sharp)] bg-[var(--color-slate-midnight)]/30 border border-[var(--color-border-glass)] hover:border-[var(--color-brand)]/20 text-center flex flex-col items-center justify-between transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-[var(--radius-sharp)] bg-[var(--color-slate-obsidian)] border border-[var(--color-border-glass)] flex items-center justify-center mb-4">
                    {getBadgeIcon(badge.iconName)}
                  </div>
                  <h5 className="font-serif font-medium text-white text-base mb-2">{badge.label}</h5>
                  <p className="text-[var(--color-text-muted)] text-[13px] font-sans font-light leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </Container>
      </Section>

    </div>
  );
}
