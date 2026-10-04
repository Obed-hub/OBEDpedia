export type PillarType = 'tools' | 'guides' | 'software' | 'countries' | 'compare' | 'resources';

export interface TagMeta {
  id: string;
  name: string;
  slug: string;
  count: number;
  pillar: PillarType | 'universal';
  description?: string;
  isPopular?: boolean;
}

export interface SubCategoryMeta {
  id: string;
  title: string;
  slug: string;
  description: string;
  suggestedTags: string[];
  itemCount: number;
}

export interface CategoryMeta {
  id: string;
  title: string;
  count: number;
  description: string;
  slug: string;
  pillar: PillarType;
}

export interface CategoryHierarchyMeta {

  id: string;
  title: string;
  slug: string;
  pillar: PillarType;
  description: string;
  iconName: string;
  subCategories: SubCategoryMeta[];
  popularTags: string[];
  totalCount: number;
}

export interface ToolItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'calculators' | 'finance' | 'productivity' | 'health' | 'business' | 'education' | 'technology' | 'seo';
  subCategory: string;
  tags: string[];
  countryRelevance?: string[];
  monthlySearches: number;
  rating: number;
  reviewsCount: number;
  schemaType: 'WebApplication' | 'SoftwareApplication' | 'WebPage';
  executionMode: 'Client WASM' | 'Instant Browser' | 'Serverless API';
  canonicalPath: string; // e.g. /tools/calculators/bmi-calculator
  features: string[];
  isFeatured?: boolean;
  demoType?: 'bmi-calculator' | 'percentage-calculator' | 'age-calculator' | 'json-formatter' | 'serp-simulator' | 'tax-calculator' | 'schema-generator';
}

export interface InfoGuideItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'technology' | 'finance' | 'business' | 'education';
  subCategory: string;
  tags: string[];
  countryRelevance?: string[];
  readTime: string;
  author: string;
  publishDate: string;
  targetIntent: 'Informational' | 'Commercial Investigation' | 'Technical / Reference';
  searchVolume: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect';
  keyTakeaways: string[];
  schemaType: 'Article' | 'TechArticle' | 'FAQPage' | 'HowTo';
  citationsCount: number;
  canonicalPath: string; // e.g. /guides/technology/programmatic-seo
  isFeatured?: boolean;
}

export interface SoftwareItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'pdf-tools' | 'image-tools' | 'text-tools' | 'video-tools' | 'developer-tools';
  tier: 'free' | 'alternatives' | 'open-source';
  subCategory: string;
  tags: string[];
  license: 'MIT' | 'GPLv3' | 'Apache 2.0' | 'AGPL' | 'BSD-3' | 'MPL 2.0' | 'Free Tier';
  platforms: ('macOS' | 'Windows' | 'Linux' | 'Web' | 'Docker' | 'iOS' | 'Android')[];
  githubStars: number;
  alternativeTo: string[];
  price: string;
  version: string;
  schemaType: 'SoftwareApplication';
  canonicalPath: string; // e.g. /software/image-tools/blender-3d
  isFeatured?: boolean;
  downloadCount: string;
}

export interface CountryItem {
  id: string;
  name: string;
  slug: string;
  isoCode: string;
  region: 'Europe' | 'North America' | 'Asia-Pacific' | 'Latin America' | 'Middle East' | 'Africa';
  subCategory: string;
  tags: string[];
  flag: string;
  capital: string;
  vatRate: string;
  corporateTaxRate: string;
  nomadVisa: boolean;
  nomadVisaDetails: string;
  dataLaw: string;
  techHubScore: number; // out of 100
  keyIndustries: string[];
  canonicalPath: string; // e.g. /countries/nigeria
  isFeatured?: boolean;
}

export interface CompareItem {
  id: string;
  title: string;
  slug: string;
  itemA: {
    name: string;
    type: string;
    pros: string[];
    cons: string[];
    pricing: string;
    license: string;
  };
  itemB: {
    name: string;
    type: string;
    pros: string[];
    cons: string[];
    pricing: string;
    license: string;
  };
  verdict: string;
  category: string;
  searchVolume: number;
  canonicalPath: string; // e.g. /compare/blender-vs-maya
  matrixPoints: { feature: string; aScore: string; bScore: string; winner: 'A' | 'B' | 'Tie' }[];
}

export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Cheatsheets' | 'Datasets' | 'Sitemaps' | 'Compliance Templates' | 'Offline Toolkits';
  format: 'JSON' | 'CSV' | 'PDF' | 'Markdown' | 'XML';
  size: string;
  downloadCount: string;
  description: string;
  canonicalPath: string; // e.g. /resources/seo-sitemap-index
}

export interface SiloCluster {
  id: string;
  name: string;
  pillar: PillarType;
  totalNodes: number;
  projectedMonthlyTraffic: string;
  primaryKeywords: string[];
  schemaPattern: string;
  internalLinkFlow: string;
  topicalAuthorityScore: number;
}

export interface AutoSuggestion {
  id: string;
  title: string;
  subtext: string;
  type: 'item' | 'category' | 'tag' | 'country' | 'compare';
  pillar?: PillarType;
  item?: any;
  metaBadge?: string;
}
