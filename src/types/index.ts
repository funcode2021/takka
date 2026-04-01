export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export interface JsonLdProps {
  schema: Record<string, unknown>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageAlt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}
