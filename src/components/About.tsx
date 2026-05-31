import { Section, Container, Heading, StatCard } from "@om-tent/ui-system";

export default function About() {
  const stats = [
    { value: "2019", label: "Established" },
    { value: "2500+", label: "Guest Capacity" },
    { value: "10-30", label: "Trained Team" },
    { value: "3", label: "Ek Sath Setups" },
  ];

  return (
    <Section id="about" className="bg-[var(--color-slate-midnight)] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-slate-obsidian)]/50 rounded-l-full blur-3xl -translate-y-1/4 translate-x-1/4 z-0"></div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-overline mb-4 block">Our Promise</span>
            <Heading level={2} className="mb-8">
              Har event mein humara vaada <br />
              <span className="text-[var(--color-brand)] italic font-light">jo kabhi nahi tootega.</span>
            </Heading>
            
            <div className="space-y-6 text-[var(--color-text-muted)] text-lg font-light leading-relaxed font-sans">
              <p>
                Hum jante hain ki shaadi aur bade parivaarik events aapke zindagi ke sabse bade pal hote hain. Sabse bada darr jo har client ko lagta hai woh hai - kharab setup, bekaar arrangements ya last-minute ki tension. Aur yahin par hum aapki saari chinta door karte hain.
              </p>
              <p>
                Om Tent House And Caterers ka naam humari <strong className="text-[var(--color-text-primary)] font-medium">pakee reliability aur imaandari</strong> par tika hai. Hum jo vaada karte hain, use har haal mein poora karte hain aur humara strict rule hai ki kaam kabhi bhi beech mein adhura nahi choda jata.
              </p>
              <p>
                Pawan Kumar aur Gopal Kumar ke direct supervision mein humari experienced team behtareen kaam karti hai. Iska matlab jab aap humpar bharosa karte hain, tab aap bina kisi chinta ke apne mehmanon ke sath event enjoy kar sakte hain.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} value={stat.value} label={stat.label} />
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
