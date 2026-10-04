import { CategoryMeta, SiloCluster } from '../types';

export const CATEGORIES_DATA: CategoryMeta[] = [
  // Tools
  { id: 'cat-tools-dev', title: 'Developer & Code', count: 28, description: 'Client-side compilers, formatters, tokens, and type generators.', slug: 'developer-code', pillar: 'tools' },
  { id: 'cat-tools-seo', title: 'SEO & SERP', count: 18, description: 'Pixel simulators, Schema.org generators, robots.txt, and hreflang builders.', slug: 'seo-serp', pillar: 'tools' },
  { id: 'cat-tools-sec', title: 'Security & Privacy', count: 14, description: 'JWT decoders, bcrypt hashers, CSP generators, and AES crypto.', slug: 'security-privacy', pillar: 'tools' },
  { id: 'cat-tools-pdf', title: 'Document & PDF', count: 12, description: 'Zero-cloud local PDF mergers, format converters, and data sanitizers.', slug: 'document-pdf', pillar: 'tools' },
  { id: 'cat-tools-img', title: 'Image & Media', count: 12, description: 'WebP/AVIF compressors, SVG minifiers, and aspect ratio builders.', slug: 'image-media', pillar: 'tools' },
  { id: 'cat-tools-data', title: 'Data & Database', count: 10, description: 'SQL beautifiers, GeoJSON mappers, mock data generators.', slug: 'data-database', pillar: 'tools' },
  { id: 'cat-tools-fin', title: 'Finance & Business', count: 10, description: 'Global VAT calculators, SaaS LTV models, and runway estimators.', slug: 'finance-business', pillar: 'tools' },
  { id: 'cat-tools-ai', title: 'AI & LLM Utilities', count: 10, description: 'Token counters, prompt engineering templates, and embeddings distance.', slug: 'ai-llm-utilities', pillar: 'tools' },

  // Guides
  { id: 'cat-guide-tech-seo', title: 'Technical SEO', count: 22, description: 'Programmatic indexing, faceted pagination, and crawl budget engineering.', slug: 'technical-seo', pillar: 'guides' },
  { id: 'cat-guide-algo', title: 'Search Algorithms', count: 20, description: 'Google E-E-A-T, Information Gain score, and vector retrieval mechanics.', slug: 'search-algorithms', pillar: 'guides' },
  { id: 'cat-guide-legal', title: 'Legal & Compliance', count: 18, description: 'GDPR cross-border rules, EU AI Act, and digital nomad tax residency.', slug: 'legal-compliance', pillar: 'guides' },
  { id: 'cat-guide-foss', title: 'Open Source', count: 15, description: 'Licensing litigation boundaries, copyleft triggers, and FOSS governance.', slug: 'open-source-governance', pillar: 'guides' },
  { id: 'cat-guide-web', title: 'Web Engineering', count: 15, description: 'Core Web Vitals INP/LCP tuning, WASM offloading, and edge routing.', slug: 'web-engineering', pillar: 'guides' },
  { id: 'cat-guide-saas', title: 'SaaS & Business Architecture', count: 10, description: 'Unit economics, CAC reduction models, and PLG directory funnels.', slug: 'saas-business-architecture', pillar: 'guides' },

  // Software
  { id: 'cat-soft-ide', title: 'Developer IDEs & Editors', count: 20, description: 'VSCodium, Neovim, Zed, Lapce, and open-source compiler tools.', slug: 'developer-ides-editors', pillar: 'software' },
  { id: 'cat-soft-design', title: 'Design & 3D Modeling', count: 18, description: 'Blender, Penpot, GIMP, Inkscape, Krita, and FreeCAD.', slug: 'design-3d-modeling', pillar: 'software' },
  { id: 'cat-soft-db', title: 'Databases & Infrastructure', count: 16, description: 'PostgreSQL, ClickHouse, SurrealDB, MinIO, and Valkey.', slug: 'databases-infrastructure', pillar: 'software' },
  { id: 'cat-soft-av', title: 'Audio & Video Production', count: 14, description: 'OBS Studio, Audacity, Kdenlive, HandBrake, and LMMS.', slug: 'audio-video-production', pillar: 'software' },
  { id: 'cat-soft-sec', title: 'Security & Privacy', count: 12, description: 'Vaultwarden, WireGuard, Trivy, and Cryptomator.', slug: 'security-privacy-tools', pillar: 'software' },
  { id: 'cat-soft-prod', title: 'Productivity & Knowledge', count: 10, description: 'Logseq, AppFlowy, Joplin, and LibreOffice suite.', slug: 'productivity-knowledge', pillar: 'software' },
  { id: 'cat-soft-chat', title: 'Communication & Chat', count: 6, description: 'Mattermost, Element Matrix, Zulip, and Rocket.Chat.', slug: 'communication-chat', pillar: 'software' },
  { id: 'cat-soft-cloud', title: 'File & Cloud Storage', count: 4, description: 'Nextcloud Hub, Syncthing, Seafile, and Rclone.', slug: 'file-cloud-storage', pillar: 'software' },

  // Countries
  { id: 'cat-c-eu', title: 'Europe', count: 35, description: 'EU single market hubs, GDPR standards, digital nomad programs.', slug: 'europe', pillar: 'countries' },
  { id: 'cat-c-na', title: 'North America', count: 5, description: 'US, Canada, and offshore fintech territories with deep capital pools.', slug: 'north-america', pillar: 'countries' },
  { id: 'cat-c-apac', title: 'Asia-Pacific', count: 25, description: 'Singapore, Japan, South Korea, Taiwan semiconductor and fintech epicenters.', slug: 'asia-pacific', pillar: 'countries' },
  { id: 'cat-c-latam', title: 'Latin America', count: 15, description: 'High-growth nearshoring hubs in Mexico, Brazil, Costa Rica, and Colombia.', slug: 'latin-america', pillar: 'countries' },
  { id: 'cat-c-me', title: 'Middle East', count: 10, description: 'Zero-tax freezones in UAE, Saudi Vision 2030, and high-growth innovation cities.', slug: 'middle-east', pillar: 'countries' },
  { id: 'cat-c-af', title: 'Africa', count: 10, description: 'Silicon Savannah, Lagos fintech rails, Kigali innovation hubs.', slug: 'africa', pillar: 'countries' },
];

export const SILO_CLUSTERS_DATA: SiloCluster[] = [
  {
    id: 'silo-1',
    name: 'Developer Utilities & Client-Side Compilers Silo',
    pillar: 'tools',
    totalNodes: 104,
    projectedMonthlyTraffic: '380,000 visitors/mo',
    primaryKeywords: ['json to typescript', 'jwt decoder online', 'regex visualizer', 'cron generator', 'svg minifier'],
    schemaPattern: 'WebApplication + BreadcrumbList + FAQPage',
    internalLinkFlow: 'Hub Page -> Tool Execution Canvas -> Associated Guide -> Related FOSS Software',
    topicalAuthorityScore: 98,
  },
  {
    id: 'silo-2',
    name: 'Technical SEO, Algorithmic Blueprints & Indexation Silo',
    pillar: 'guides',
    totalNodes: 100,
    projectedMonthlyTraffic: '290,000 visitors/mo',
    primaryKeywords: ['programmatic seo architecture', 'google core algorithm update', 'information gain score', 'schema markup builder'],
    schemaPattern: 'TechArticle + Author Entity + SpeakableSpecification',
    internalLinkFlow: 'Category Silo -> Deep Technical Guide -> Live Interactive Validator -> Country Regulatory Hub',
    topicalAuthorityScore: 96,
  },
  {
    id: 'silo-3',
    name: 'Open Source Software & Proprietary Replacement Silo',
    pillar: 'software',
    totalNodes: 100,
    projectedMonthlyTraffic: '240,000 visitors/mo',
    primaryKeywords: ['free photoshop alternative', 'open source notion', 'blender 3d download', 'foss vs code', 'vaultwarden self-hosted'],
    schemaPattern: 'SoftwareApplication + AggregateRating + OperatingSystem',
    internalLinkFlow: 'Software Directory -> Comparison Matrix -> Self-Hosting Guide -> Developer Tools',
    topicalAuthorityScore: 94,
  },
  {
    id: 'silo-4',
    name: 'Global Business, Tax Rates & Digital Nomad Jurisdictions Silo',
    pillar: 'countries',
    totalNodes: 100,
    projectedMonthlyTraffic: '190,000 visitors/mo',
    primaryKeywords: ['germany freelance visa', 'estonia e-residency tax', 'portugal nomad visa 2026', 'dubai zero tax company formation'],
    schemaPattern: 'Country + AdministrativeArea + GovernmentPermit',
    internalLinkFlow: 'Global Country Matrix -> Regional Directory -> Cross-Border VAT Calculator -> GDPR Compliance Guide',
    topicalAuthorityScore: 92,
  },
];
