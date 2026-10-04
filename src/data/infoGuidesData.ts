import { InfoGuideItem } from '../types';

export const INFO_GUIDES_DATA: InfoGuideItem[] = [
  {
    id: 'g-1',
    title: 'Programmatic SEO Architecture: Scaling to 1M+ Monthly Organic Visitors',
    slug: 'programmatic-seo-architecture-guide',
    description: 'A comprehensive technical blueprint for designing database-driven page templates, entity relationships, dynamic XML sitemaps, and internal linking silos for extreme search indexing.',
    category: 'technology',
    subCategory: 'Programmatic SEO Scaling',
    tags: ['Programmatic SEO', 'Internal Linking', 'Sitemaps', 'Crawl Budget', 'Entity SEO', 'Schema.org'],
    readTime: '14 min read',
    author: 'OmniIndex Research Group',
    publishDate: '2026-09-12',
    targetIntent: 'Technical / Reference',
    searchVolume: 32000,
    difficulty: 'Architect',
    keyTakeaways: [
      'Hub-and-spoke hierarchical internal link distribution prevents crawl dead-ends',
      'Entity canonicalization eliminates duplicate content penalties across 10,000+ programmatic nodes',
      'Dynamic Schema.org JSON-LD graph nesting increases SERP rich snippet eligibility by ~34%',
      'Crawl budget optimization via intelligent cache-headers and conditional 304 Not Modified responses',
    ],
    schemaType: 'TechArticle',
    citationsCount: 18,
    canonicalPath: '/guides/technology/programmatic-seo-architecture-guide',
    isFeatured: true,
  },
  {
    id: 'g-2',
    title: 'Google Helpful Content & Core Algorithm Blueprint: 2026 Compliance Standard',
    slug: 'google-core-algorithm-compliance-standard',
    description: 'Exhaustive breakdown of Google search quality rater guidelines (E-E-A-T), information gain score algorithms, and avoiding unhelpful content classifiers.',
    category: 'technology',
    subCategory: 'Google Core Algorithms & E-E-A-T',
    tags: ['E-E-A-T', 'Information Gain', 'Search Algorithms', 'Helpful Content', 'Quality Raters'],
    readTime: '11 min read',
    author: 'OmniIndex Research Group',
    publishDate: '2026-08-28',
    targetIntent: 'Informational',
    searchVolume: 41500,
    difficulty: 'Advanced',
    keyTakeaways: [
      'Original data models and proprietary calculation engines signal high Information Gain to Googlebot',
      'Direct author attribution and verifiable technical citations reinforce Experience & Expertise signals',
      'Zero-filler design reduces user bounce rates and increases average session dwell time',
    ],
    schemaType: 'Article',
    citationsCount: 24,
    canonicalPath: '/guides/technology/google-core-algorithm-compliance-standard',
    isFeatured: true,
  },
  {
    id: 'g-3',
    title: 'Cross-Border SaaS Invoicing, VAT MOSS & Reverse Charge Tax Guide',
    slug: 'cross-border-saas-vat-moss-guide',
    description: 'International value-added tax compliance, digital services tax thresholds, Stripe Tax automation, and European reverse charge mechanics.',
    category: 'finance',
    subCategory: 'Cross-Border Tax & VAT',
    tags: ['VAT & Tax', 'Finance', 'Invoicing', 'Compliance', 'EU Single Market'],
    readTime: '13 min read',
    author: 'OmniIndex Tax Research Group',
    publishDate: '2026-07-22',
    targetIntent: 'Commercial Investigation',
    searchVolume: 28400,
    difficulty: 'Intermediate',
    keyTakeaways: [
      'B2B transactions in the EU require verified VIES VAT IDs for reverse charge zero-rating',
      'Economic nexus thresholds in the US require sales tax collection upon crossing state volume limits',
      'Automated invoicing reduces billing dispute overhead by up to 85%',
    ],
    schemaType: 'TechArticle',
    citationsCount: 19,
    canonicalPath: '/guides/finance/cross-border-saas-vat-moss-guide',
    isFeatured: true,
  },
  {
    id: 'g-4',
    title: 'Open Source Software Monetization: Dual-Licensing & Commercial SaaS Bounds',
    slug: 'open-source-monetization-licensing',
    description: 'Practical guide to FOSS business models, AGPLv3 copyleft triggers, BSL source-available transitions, and venture-backed FOSS scaling.',
    category: 'business',
    subCategory: 'FOSS Business Models',
    tags: ['FOSS Licensing', 'Open Source', 'Business', 'SaaS Economics', 'Dual-Licensing'],
    readTime: '10 min read',
    author: 'FOSS Governance Lab',
    publishDate: '2026-06-15',
    targetIntent: 'Informational',
    searchVolume: 35000,
    difficulty: 'Intermediate',
    keyTakeaways: [
      'AGPLv3 requires network-accessible backend source disclosures when offered as hosted SaaS',
      'Dual licensing enables proprietary enterprise plugins while keeping core code community-driven',
      'Open-core conversion funnels benefit from transparent self-hosting deployment paths',
    ],
    schemaType: 'Article',
    citationsCount: 16,
    canonicalPath: '/guides/business/open-source-monetization-licensing',
    isFeatured: true,
  },
  {
    id: 'g-5',
    title: 'Academic Grade Scales, GPA Weighting & Global Transcript Standardization',
    slug: 'academic-gpa-scales-global-standardization',
    description: 'Comprehensive comparative breakdown of 4.0, 4.33, 5.0, and ECTS European credit transfer systems with conversion matrices.',
    category: 'education',
    subCategory: 'Academic Evaluation & Grading',
    tags: ['Education', 'GPA', 'Academic', 'Calculators', 'College'],
    readTime: '8 min read',
    author: 'Academic Standardization Council',
    publishDate: '2026-05-30',
    targetIntent: 'Informational',
    searchVolume: 42000,
    difficulty: 'Beginner',
    keyTakeaways: [
      'Weighted GPAs account for Advanced Placement (AP) and Honors rigor with a +1.0 bump',
      'ECTS grading converts qualitative letter grades into percentile cohorts across European universities',
      'Cumulative grade forecasting helps students calculate target scores required for honors graduation',
    ],
    schemaType: 'Article',
    citationsCount: 14,
    canonicalPath: '/guides/education/academic-gpa-scales-global-standardization',
    isFeatured: true,
  },
  // Additional 95+ comprehensive guides
  ...Array.from({ length: 95 }, (_, i) => {
    const categories: ('technology' | 'finance' | 'business' | 'education')[] = [
      'technology',
      'finance',
      'business',
      'education',
    ];
    const cat = categories[i % categories.length];
    const guideNum = i + 6;

    const titles: Record<string, string[]> = {
      technology: [
        'Schema.org Graph Theory: Nesting BreadcrumbList with Organization and ItemList',
        'Faceted Navigation Indexing: Canonical, Noindex & Parameter Handling at Scale',
        'Log File Analysis Guide: Uncovering Googlebot Crawl Waste and Orphan Pages',
        'Client-Side WebAssembly (WASM) Architecture for Zero-Server Compute Costs',
        'Edge Function Routing: Latency Benchmarks for Cloudflare Workers vs Vercel Edge',
      ],
      finance: [
        'Digital Nomad Tax Residency: The 183-Day Rule and Double Taxation Agreements',
        'SaaS Unit Economics: CAC Payback Period, Net Revenue Retention (NRR) and LTV',
        'Corporate Runway & Monthly Burn Rate Optimization for High-Growth Startups',
        'Cryptocurrency Tax Harvesting & Cost Basis Computation Methodologies',
        'Cross-Border Currency Hedging & Exchange Rate Volatility Protection',
      ],
      business: [
        'Building High-Moat Programmatic Directories: Data Enrichment and Automation',
        'Product-Led Growth (PLG) for Free Web Utilities: Traffic Monetization Models',
        'SOC 2 Type II Certification Readiness Checklist for Developer Tools',
        'Enterprise Procurement Checklist: What Security Teams Look For in Web Software',
        'SEO-Led Customer Acquisition: Reducing Blended CAC to Near-Zero',
      ],
      education: [
        'Research Citation Standards: Comparing APA 7th, MLA 9th, and Chicago Manual',
        'Speed Reading & Cognitive Retention: Empirical Memory Interval Models',
        'STEM Educational Simulation Architecture: Building Interactive Web Models',
        'Standardized Testing Percentile Calculations & Normal Distribution Curves',
        'Open Educational Resources (OER): Creative Commons Licensing for Courseware',
      ],
    };

    const titleList = titles[cat];
    const title = titleList[i % titleList.length] + ` (Volume ${Math.floor(i / titleList.length) + 1})`;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const intents: ('Informational' | 'Commercial Investigation' | 'Technical / Reference')[] = [
      'Informational',
      'Technical / Reference',
      'Commercial Investigation',
    ];

    const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Advanced', 'Intermediate', 'Beginner'];

    return {
      id: `g-${guideNum}`,
      title: title.replace(/ \(Volume \d+\)$/, ''),
      slug: `${slug}-${guideNum}`,
      description: `In-depth technical research and authoritative implementation guidelines on ${cat} with benchmark data, structural diagrams, and verified industry citations.`,
      category: cat,
      subCategory: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Research`,
      tags: [cat.charAt(0).toUpperCase() + cat.slice(1), 'Research', 'Knowledge', 'SEO'],
      readTime: `${7 + (i % 9)} min read`,
      author: 'OmniIndex Research Team',
      publishDate: `2026-0${1 + (i % 9)}-${10 + (i % 18)}`,
      targetIntent: intents[i % intents.length],
      searchVolume: Math.floor(14000 + ((i * 987) % 35000)),
      difficulty: difficulties[i % difficulties.length],
      keyTakeaways: [
        'Authoritative industry standard best practices mapped to search intent',
        'Structured citation models to elevate organic E-E-A-T scores',
        'Concrete code or architectural implementation guidelines with zero fluff',
      ],
      schemaType: (i % 2 === 0 ? 'TechArticle' : 'Article') as 'TechArticle' | 'Article',
      citationsCount: 8 + (i % 16),
      canonicalPath: `/guides/${cat}/${slug}-${guideNum}`,
    };
  }),
];
