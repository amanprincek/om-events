import React from 'react';
import { Container, Heading } from "@om-tent/ui-system";

export default function CommitmentBanner() {
  return (
    <div className="relative py-32 lg:py-40 overflow-hidden bg-[var(--color-slate-obsidian)] border-y border-[var(--color-border-glass)]">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(var(--color-brand)_2px,transparent_2px)] [background-size:32px_32px]"></div>
      
      <Container className="relative z-10">
        <Heading level={3} className="text-center italic font-light tracking-wide text-[var(--color-text-primary)] px-4">
          "Your Celebration Deserves <span className="text-[var(--color-brand)]">Complete Commitment.</span>"
        </Heading>
      </Container>
    </div>
  );
}
