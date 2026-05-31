export interface ProjectScale {
  label: string;
  value: string;
}

export interface BeforeAfterImage {
  beforeUrl: string;
  beforeLabel: string;
  afterUrl: string;
  afterLabel: string;
  description: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
}

export interface RegionNode {
  name: string;
  projectCount: number;
  featuredProject: string;
  coordinates: { x: number; y: number }; // Percentage offsets for visual schematic map
  description: string;
}

export interface SignatureProject {
  id: string;
  name: string;
  eventType: string;
  location: string;
  capacity: string;
  date: string;
  servicesDelivered: string[];
  heroImage: string;
  
  // Story Details (Section 2)
  story: {
    challenge: string;
    planning: string;
    execution: string;
    outcome: string;
  };

  // Event Scale Indicators (Section 3)
  scaleIndicators: {
    guests: string;
    duration: string;
    staff: string;
    tentScale: string;
  };

  // Before / After (Section 4)
  beforeAfter: BeforeAfterImage;

  // success quote (Section 7)
  clientQuote: {
    text: string;
    author: string;
    role: string;
  };
}
