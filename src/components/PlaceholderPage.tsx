import React from 'react';
import { Container, Heading } from '@om-tent/ui-system';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container className="py-20 flex-grow flex flex-col items-center justify-center h-full min-h-[50vh]">
      <div className="text-center p-10 bg-[var(--color-glass-surface)] backdrop-blur-[var(--blur-macro)] rounded-[var(--radius-sharp)] border border-[var(--color-border-glass)]">
        <Heading level={2} className="mb-4 text-[var(--color-brand)]">{title}</Heading>
        <p className="text-[var(--color-text-muted)]">Yeh feature abhi design stage mein hai, hum bohot jald ise live karenge.</p>
      </div>
    </Container>
  );
}
