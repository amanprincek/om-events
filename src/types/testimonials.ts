export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  location: string;
  review: string;
  rating: number;
  eventPhoto?: string;
}

export interface TrustStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  category: 'Wedding' | 'Reception' | 'School Function' | 'Birthday' | 'Commercial';
  challenge: string;
  solution: string;
  outcome: string;
  clientQuote: string;
  location: string;
  image: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;
  relativeTime: string;
  text: string;
  location: string;
  verified: boolean;
}

export interface SocialBadge {
  id: string;
  label: string;
  iconName: string;
  description: string;
}
