import { ToolItem, InfoGuideItem, SoftwareItem, CountryItem, CompareItem, ResourceItem, PillarType, AutoSuggestion } from '../types';
import { TOOLS_DATA } from '../data/toolsData';
import { INFO_GUIDES_DATA } from '../data/infoGuidesData';
import { SOFTWARE_DATA } from '../data/softwareData';
import { COUNTRIES_DATA } from '../data/countriesData';
import { COMPARE_DATA } from '../data/compareData';
import { RESOURCES_DATA } from '../data/resourcesData';
import { TAXONOMY_HIERARCHY, MASTER_TAGS } from '../data/taxonomyData';

export type UnifiedItem =
  | { itemType: 'tools'; data: ToolItem }
  | { itemType: 'guides'; data: InfoGuideItem }
  | { itemType: 'software'; data: SoftwareItem }
  | { itemType: 'countries'; data: CountryItem }
  | { itemType: 'compare'; data: CompareItem }
  | { itemType: 'resources'; data: ResourceItem };

export interface SearchQueryOptions {
  query?: string;
  pillar?: PillarType | 'all';
  category?: string;
  subCategory?: string;
  countryCode?: string;
  tags?: string[];
  sortBy?: 'relevance' | 'popular' | 'volume' | 'rating' | 'alpha';
  limit?: number;
}

export interface SearchResultRecord {
  item: UnifiedItem;
  score: number;
  matchedTokens: string[];
}

class SearchIndexEngine {
  private allItems: UnifiedItem[] = [];
  private tokenIndex: Map<string, Set<number>> = new Map();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;

    this.allItems = [
      ...TOOLS_DATA.map((t): UnifiedItem => ({ itemType: 'tools', data: t })),
      ...INFO_GUIDES_DATA.map((g): UnifiedItem => ({ itemType: 'guides', data: g })),
      ...SOFTWARE_DATA.map((s): UnifiedItem => ({ itemType: 'software', data: s })),
      ...COUNTRIES_DATA.map((c): UnifiedItem => ({ itemType: 'countries', data: c })),
      ...COMPARE_DATA.map((cmp): UnifiedItem => ({ itemType: 'compare', data: cmp })),
      ...RESOURCES_DATA.map((res): UnifiedItem => ({ itemType: 'resources', data: res })),
    ];

    // Build Inverted Index
    this.allItems.forEach((unified, index) => {
      const tokens = this.extractTokens(unified);
      tokens.forEach((token) => {
        if (!this.tokenIndex.has(token)) {
          this.tokenIndex.set(token, new Set());
        }
        this.tokenIndex.get(token)!.add(index);
      });
    });

    this.isInitialized = true;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((t) => t.length > 1);
  }

  private extractTokens(unified: UnifiedItem): Set<string> {
    const tokens = new Set<string>();
    const d = unified.data as any;

    const addText = (str?: string) => {
      if (!str) return;
      this.tokenize(str).forEach((t) => tokens.add(t));
    };

    addText(d.title || d.name);
    addText(d.category);
    addText(d.subCategory);
    addText(d.description);
    addText(d.region);
    addText(d.capital);
    addText(d.isoCode);
    addText(d.verdict);

    if (d.itemA?.name) addText(d.itemA.name);
    if (d.itemB?.name) addText(d.itemB.name);

    if (Array.isArray(d.tags)) {
      d.tags.forEach((tag: string) => addText(tag));
    }
    if (Array.isArray(d.alternativeTo)) {
      d.alternativeTo.forEach((alt: string) => addText(alt));
    }
    if (Array.isArray(d.features)) {
      d.features.forEach((feat: string) => addText(feat));
    }
    if (Array.isArray(d.keyIndustries)) {
      d.keyIndustries.forEach((ind: string) => addText(ind));
    }

    return tokens;
  }

  public search(options: SearchQueryOptions): SearchResultRecord[] {
    this.init();

    const {
      query = '',
      pillar = 'all',
      category = 'all',
      subCategory = 'all',
      countryCode = 'all',
      tags = [],
      sortBy = 'relevance',
      limit,
    } = options;

    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = cleanQuery ? this.tokenize(cleanQuery) : [];

    const results: SearchResultRecord[] = [];

    this.allItems.forEach((unified) => {
      const d = unified.data as any;

      // 1. Pillar Filter
      if (pillar !== 'all' && unified.itemType !== pillar) {
        return;
      }

      // 2. Category Filter
      if (category !== 'all' && d.category !== category && d.region !== category) {
        return;
      }

      // 3. SubCategory Filter
      if (subCategory !== 'all' && d.subCategory !== subCategory) {
        return;
      }

      // 4. Country Code Filter
      if (countryCode !== 'all') {
        if (unified.itemType === 'countries' && d.isoCode.toLowerCase() !== countryCode.toLowerCase()) {
          return;
        }
      }

      // 5. Tags Filter
      if (tags.length > 0 && d.tags) {
        const itemTags = (d.tags || []).map((t: string) => t.toLowerCase());
        const hasAllTags = tags.every((t) => itemTags.includes(t.toLowerCase()));
        if (!hasAllTags) {
          return;
        }
      }

      // 6. Text Scoring
      let score = 0;
      const matchedTokens: string[] = [];

      if (!cleanQuery) {
        score = d.isFeatured ? 50 : 10;
      } else {
        const titleStr = (d.title || d.name || '').toLowerCase();
        const descStr = (d.description || d.nomadVisaDetails || d.verdict || '').toLowerCase();
        const catStr = (d.category || d.region || '').toLowerCase();
        const subCatStr = (d.subCategory || '').toLowerCase();
        const itemTagsStr = (d.tags || []).join(' ').toLowerCase();
        const altStr = (d.alternativeTo || []).join(' ').toLowerCase();

        if (titleStr === cleanQuery) {
          score += 200;
        } else if (titleStr.startsWith(cleanQuery)) {
          score += 100;
        } else if (titleStr.includes(cleanQuery)) {
          score += 70;
        }

        queryTokens.forEach((token) => {
          let tokenMatched = false;

          if (titleStr.includes(token)) {
            score += 40;
            tokenMatched = true;
          }
          if (itemTagsStr.includes(token)) {
            score += 30;
            tokenMatched = true;
          }
          if (altStr.includes(token)) {
            score += 35;
            tokenMatched = true;
          }
          if (catStr.includes(token) || subCatStr.includes(token)) {
            score += 20;
            tokenMatched = true;
          }
          if (descStr.includes(token)) {
            score += 10;
            tokenMatched = true;
          }

          if (tokenMatched) {
            matchedTokens.push(token);
          }
        });

        if (d.isFeatured) score += 15;

        if (matchedTokens.length === 0 && score === 0) {
          return;
        }
      }

      results.push({
        item: unified,
        score,
        matchedTokens,
      });
    });

    // Sort Results
    results.sort((a, b) => {
      const aData = a.item.data as any;
      const bData = b.item.data as any;

      if (sortBy === 'relevance') {
        return b.score - a.score;
      } else if (sortBy === 'volume' || sortBy === 'popular') {
        const aVol = aData.monthlySearches || aData.searchVolume || aData.githubStars || (aData.techHubScore ? aData.techHubScore * 100 : 0);
        const bVol = bData.monthlySearches || bData.searchVolume || bData.githubStars || (bData.techHubScore ? bData.techHubScore * 100 : 0);
        return bVol - aVol;
      } else if (sortBy === 'rating') {
        const aRate = aData.rating || 4.5;
        const bRate = bData.rating || 4.5;
        return bRate - aRate;
      } else if (sortBy === 'alpha') {
        const aName = aData.title || aData.name || '';
        const bName = bData.title || bData.name || '';
        return aName.localeCompare(bName);
      }
      return b.score - a.score;
    });

    return limit ? results.slice(0, limit) : results;
  }

  public getAutoSuggestions(query: string, maxResults = 8): AutoSuggestion[] {
    this.init();
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) {
      const starterList: AutoSuggestion[] = [
        { id: 'sug-bmi', title: 'BMI Calculator & Body Mass Index', subtext: '/tools/calculators/bmi-calculator', type: 'item', pillar: 'tools', metaBadge: 'Calculator' },
        { id: 'sug-pct', title: 'Percentage Calculator Pro', subtext: '/tools/calculators/percentage-calculator', type: 'item', pillar: 'tools', metaBadge: 'Calculator' },
        { id: 'sug-age', title: 'Chronological Age Calculator', subtext: '/tools/calculators/age-calculator', type: 'item', pillar: 'tools', metaBadge: 'Calculator' },
        { id: 'sug-blender', title: 'Blender vs Maya Comparison', subtext: '/compare/blender-vs-maya', type: 'compare', pillar: 'compare', metaBadge: 'VS Compare' },
        { id: 'sug-nigeria', title: 'Nigeria Tech & VAT Directory', subtext: '/countries/nigeria · VAT 7.5%', type: 'country', pillar: 'countries', metaBadge: 'Country' },
      ];
      return starterList.slice(0, maxResults);
    }

    const suggestions: AutoSuggestion[] = [];

    // Tag matches
    MASTER_TAGS.forEach((tag) => {
      if (tag.name.toLowerCase().includes(cleanQuery) || tag.slug.includes(cleanQuery)) {
        suggestions.push({
          id: `sug-tag-${tag.id}`,
          title: tag.name,
          subtext: `${tag.description || 'Taxonomy Tag'} · ${tag.count} items`,
          type: 'tag',
          pillar: tag.pillar === 'universal' ? undefined : (tag.pillar as PillarType),
          metaBadge: `#${tag.slug}`,
        });
      }
    });

    // Country matches
    COUNTRIES_DATA.forEach((c) => {
      if (
        c.name.toLowerCase().includes(cleanQuery) ||
        c.capital.toLowerCase().includes(cleanQuery) ||
        c.isoCode.toLowerCase() === cleanQuery
      ) {
        suggestions.push({
          id: `sug-c-${c.id}`,
          title: `${c.flag} ${c.name} (${c.isoCode})`,
          subtext: `${c.region} · Capital: ${c.capital} · VAT: ${c.vatRate}`,
          type: 'country',
          pillar: 'countries',
          item: c,
          metaBadge: c.nomadVisa ? 'Nomad Visa' : 'Atlas',
        });
      }
    });

    // Item & Compare matches
    const topItems = this.search({ query: cleanQuery, limit: 6 });
    topItems.forEach(({ item }) => {
      const d = item.data as any;
      const title = d.title || d.name;
      if (item.itemType === 'countries' && suggestions.some((s) => s.title.includes(d.name))) {
        return;
      }
      suggestions.push({
        id: `sug-item-${d.id}`,
        title,
        subtext: `${d.category || d.region || 'Compare'} · ${d.canonicalPath || ''}`,
        type: item.itemType === 'compare' ? 'compare' : 'item',
        pillar: item.itemType,
        item: d,
        metaBadge: item.itemType.toUpperCase(),
      });
    });

    return suggestions.slice(0, maxResults);
  }
}

export const searchIndex = new SearchIndexEngine();
