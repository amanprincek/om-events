import { Section, Container, Heading, StatCard } from "@om-tent/ui-system";

export default function About() {
  const stats = [
    { value: "2019", label: "Established" },
    { value: "2500+", label: "Guest Capacity" },
    { value: "10-30", label: "Expert Staff" },
    { value: "3", label: "Simultaneous Events" },
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
              A commitment to excellence that <br />
              <span className="text-[var(--color-brand)] italic font-light">never waivers.</span>
            </Heading>
            
            <div className="space-y-6 text-[var(--color-text-muted)] text-lg font-light leading-relaxed font-sans">
              <p>
                We understand that weddings and large gatherings are milestone moments. The biggest fear hosts face is event failure, poor arrangements, or last-minute issues. That is where we step in.
              </p>
              <p>
                At Om Tent House And Caterers, our reputation is built on <strong className="text-[var(--color-text-primary)] font-medium">absolute reliability</strong>. We honor the promises made to our customers and have a strict policy of never abandoning work midway. 
              </p>
              <p>
                Under the leadership of Pawan Kumar and Gopal Kumar, our seasoned team consistently over-delivers, ensuring that when you trust us with your event, you can sit back and truly enjoy the moment.
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
