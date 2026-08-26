export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  features: string[];
  imageUrl: string;
  problem: string;
  solution: string;
  result: string;
  detailedArticle?: string;
  technologies?: string[];
  resultsAchieved?: string[];
  galleryImages?: string[];
  objectives?: string[];
  isDemo?: boolean;
  mockupContent: {
    heroTitle: string;
    heroSubtitle: string;
    colors: {
      primary: string;
      secondary: string;
      bg: string;
      text: string;
    };
    sections: {
      title: string;
      content: string;
    }[];
    ctaText: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}
