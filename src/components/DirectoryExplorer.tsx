import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Grid,
  List,
  ArrowUpDown,
  Filter,
  ExternalLink,
  Star,
  Download,
  Calendar,
  Clock,
  Globe,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  Layers,
  Globe2,
  ChevronRight,
  Code2,
  Tag,
  X,
} from 'lucide-react';
import { PillarType, ToolItem, InfoGuideItem, SoftwareItem, CountryItem } from '../types';
import { searchIndex } from '../services/searchIndex';
import { TAXONOMY_HIERARCHY, MASTER_TAGS } from '../data/taxonomyData';
import { COUNTRIES_DATA } from '../data/countriesData';

interface DirectoryExplorerProps {
  activePillar: PillarType;
  onSelectPillar: (pillar: PillarType) => void;
  onSelectItem: (item: ToolItem | InfoGuideItem | SoftwareItem | CountryItem, type: PillarType) => void;
  initialSearchQuery?: string;
  initialCountryCode?: string;
  initialTags?: string[];
}

export const DirectoryExplorer: React.FC<DirectoryExplorerProps> = ({
  activePillar,
  onSelectPillar,
  onSelectItem,
  initialSearchQuery = '',
  initialCountryCode = 'all',
  initialTags = [],
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountryCode);
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);
  const [sortBy, setSortBy] = useState<'relevance' | 'volume' | 'rating' | 'alpha'>('volume');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync external search updates
  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
      setCurrentPage(1);
    }
  }, [initialSearchQuery]);

  useEffect(() => {
    if (initialCountryCode) {
      setSelectedCountry(initialCountryCode);
      setCurrentPage(1);
    }
  }, [initialCountryCode]);

  useEffect(() => {
    if (initialTags && initialTags.length > 0) {
      setActiveTags(initialTags);
      setCurrentPage(1);
    }
  }, [initialTags]);

  // Categories & Subcategories for active pillar
  const pillarHierarchies = useMemo(() => {
    return TAXONOMY_HIERARCHY.filter((c) => c.pillar === activePillar);
  }, [activePillar]);

  // Current category subcategories
  const activeSubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const cat = pillarHierarchies.find((c) => c.title === selectedCategory);
    return cat ? cat.subCategories : [];
  }, [selectedCategory, pillarHierarchies]);

  // Query Inverted Search Index
  const searchResults = useMemo(() => {
    return searchIndex.search({
      query: searchQuery,
      pillar: activePillar,
      category: selectedCategory,
      subCategory: selectedSubCategory === 'all' ? undefined : selectedSubCategory,
      countryCode: selectedCountry,
      tags: activeTags,
      sortBy,
    });
  }, [searchQuery, activePillar, selectedCategory, selectedSubCategory, selectedCountry, activeTags, sortBy]);

  // Total pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage) || 1;
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return searchResults.slice(start, start + itemsPerPage);
  }, [searchResults, currentPage, itemsPerPage]);

  const handlePillarChange = (pillar: PillarType) => {
    onSelectPillar(pillar);
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setCurrentPage(1);
  };

  const handleTagClick = (tagName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedCountry('all');
    setActiveTags([]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedSubCategory !== 'all' ||
    selectedCountry !== 'all' ||
    activeTags.length > 0;

  return (
    <section id="directory-explorer" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Topical Directory Explorer & Tag Matrix
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              Indexed Repositories & Knowledge Graph
            </h2>
          </div>

          {/* Master 4-Pillar Tab Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/90 p-1 backdrop-blur-sm">
            <button
              onClick={() => handlePillarChange('tools')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activePillar === 'tools'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="h-4 w-4" />
              <span>Tools (104)</span>
            </button>
            <button
              onClick={() => handlePillarChange('guides')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activePillar === 'guides'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Guides (100)</span>
            </button>
            <button
              onClick={() => handlePillarChange('software')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activePillar === 'software'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Software (100)</span>
            </button>
            <button
              onClick={() => handlePillarChange('countries')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activePillar === 'countries'
                  ? 'bg-violet-500 text-slate-950 shadow-md shadow-violet-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe2 className="h-4 w-4" />
              <span>Countries (100+)</span>
            </button>
          </div>
        </div>

        {/* Filter & Controls Toolbar */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-5 space-y-4 shadow-xl">
          {/* Row 1: Search + Country + Sort + View */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search within ${activePillar} (${searchResults.length} matches)...`}
                className="w-full rounded-xl border border-white/10 bg-slate-800/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Country Picker Filter */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Globe2 className="h-3.5 w-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Country:</span>
              </div>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">Global (All 100+)</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="US">🇺🇸 United States</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="PT">🇵🇹 Portugal</option>
                <option value="JP">🇯🇵 Japan</option>
                <option value="EE">🇪🇪 Estonia</option>
                <option value="AE">🇦🇪 UAE</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="CH">🇨🇭 Switzerland</option>
              </select>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-1">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="volume">Monthly Search Volume</option>
                <option value="relevance">Relevance & Match Score</option>
                <option value="rating">Rating & Citations</option>
                <option value="alpha">Alphabetical (A - Z)</option>
              </select>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-slate-800/80 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Card Grid View"
                >
                  <Grid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`rounded-lg p-1.5 transition-colors ${
                    viewMode === 'table' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Dense Data Table View"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Category Hierarchy Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setCurrentPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {pillarHierarchies.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.title);
                  setSelectedSubCategory('all');
                  setCurrentPage(1);
                }}
                className={`rounded-lg px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.title
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.title} ({cat.totalCount})
              </button>
            ))}
          </div>

          {/* Row 3: Sub-category & Active Tags Drilldown */}
          {(activeSubcategories.length > 0 || activeTags.length > 0) && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
              {/* Subcategories */}
              {activeSubcategories.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-slate-400 font-medium">Sub-branch:</span>
                  <button
                    onClick={() => {
                      setSelectedSubCategory('all');
                      setCurrentPage(1);
                    }}
                    className={`rounded px-2 py-0.5 text-[11px] ${
                      selectedSubCategory === 'all'
                        ? 'bg-blue-500 text-white font-semibold'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {activeSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubCategory(sub.title);
                        setCurrentPage(1);
                      }}
                      className={`rounded px-2 py-0.5 text-[11px] whitespace-nowrap ${
                        selectedSubCategory === sub.title
                          ? 'bg-blue-500 text-white font-semibold shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {sub.title} ({sub.itemCount})
                    </button>
                  ))}
                </div>
              )}

              {/* Active Selected Tags Badge Chips */}
              {activeTags.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">Filtered Tags:</span>
                  {activeTags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[11px] text-cyan-300"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => handleTagClick(tag)}
                        className="hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Counter & Showing Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-white font-mono">{paginatedResults.length}</strong> of{' '}
              <strong className="text-white font-mono">{searchResults.length}</strong> {activePillar} pages
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-cyan-400 hover:underline text-[11px]"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="font-mono text-[11px] text-cyan-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Content Display: Grid View vs Table View */}
        {viewMode === 'grid' ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paginatedResults.map(({ item }) => {
              if (item.itemType === 'tools') {
                const tool = item.data;
                return (
                  <div
                    key={tool.id}
                    onClick={() => onSelectItem(tool, 'tools')}
                    className="group surface-card flex flex-col justify-between rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer"
                  >
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-cyan-400 font-medium">{tool.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tool.executionMode}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-slate-300">
                          {tool.monthlySearches.toLocaleString()}/mo search
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {tool.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Subcategory Breadcrumb */}
                      <div className="mt-3 text-[11px] text-slate-400">
                        <span>Branch: </span>
                        <span className="text-slate-300 font-medium">{tool.subCategory}</span>
                      </div>

                      {/* Tag list */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {tool.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            onClick={(e) => handleTagClick(tag, e)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span className="font-semibold text-white">{tool.rating}</span>
                        <span className="text-slate-400">({tool.reviewsCount})</span>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-cyan-400 group-hover:underline">
                        <span>Launch & Schema</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              } else if (item.itemType === 'guides') {
                const guide = item.data;
                return (
                  <div
                    key={guide.id}
                    onClick={() => onSelectItem(guide, 'guides')}
                    className="group surface-card flex flex-col justify-between rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-blue-950/20 cursor-pointer"
                  >
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-blue-400 font-medium">{guide.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{guide.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{guide.difficulty}</span>
                      </div>

                      <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {guide.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {guide.description}
                      </p>

                      <div className="mt-3 text-[11px] text-slate-400">
                        <span>Branch: </span>
                        <span className="text-slate-300 font-medium">{guide.subCategory}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {guide.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            onClick={(e) => handleTagClick(tag, e)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-blue-500 hover:text-slate-950 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="font-mono text-slate-300">{guide.citationsCount} citations</span>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-blue-400 group-hover:underline">
                        <span>Read Whitepaper</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              } else if (item.itemType === 'software') {
                const soft = item.data;
                return (
                  <div
                    key={soft.id}
                    onClick={() => onSelectItem(soft, 'software')}
                    className="group surface-card flex flex-col justify-between rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-emerald-950/20 cursor-pointer"
                  >
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-emerald-400 font-medium">{soft.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-300">{soft.license}</span>
                        <span aria-hidden="true">·</span>
                        <span>v{soft.version}</span>
                      </div>

                      <h3 className="mt-3 font-display text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {soft.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {soft.description}
                      </p>

                      <div className="mt-3 border-t border-white/5 pt-2 text-xs">
                        <span className="text-slate-400">Replaces: </span>
                        <span className="text-emerald-300 font-medium">{soft.alternativeTo.join(', ')}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {soft.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            onClick={(e) => handleTagClick(tag, e)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{soft.githubStars.toLocaleString()}</span>
                        <span className="text-slate-400">stars</span>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-emerald-400 group-hover:underline">
                        <span>FOSS Matrix</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              } else if (item.itemType === 'countries') {
                const country = item.data as CountryItem;
                return (
                  <div
                    key={country.id}
                    onClick={() => onSelectItem(country, 'countries')}
                    className="group surface-card flex flex-col justify-between rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-violet-950/20 cursor-pointer"
                  >
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-violet-400 font-medium">{country.region}</span>
                        <span aria-hidden="true">·</span>
                        <span>Capital: {country.capital}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-300">{country.isoCode}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-2.5">
                        <span className="text-2xl">{country.flag}</span>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                          {country.name}
                        </h3>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs rounded-lg bg-slate-800/40 p-3 border border-white/5">
                        <div>
                          <div className="text-slate-400">VAT Rate</div>
                          <div className="font-mono font-bold text-cyan-400">{country.vatRate}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Nomad Visa</div>
                          <div className={country.nomadVisa ? 'font-semibold text-emerald-400' : 'text-slate-400'}>
                            {country.nomadVisa ? 'Available' : 'Standard'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {(country.tags || []).slice(0, 3).map((tag: string, i: number) => (
                          <span
                            key={i}
                            onClick={(e) => handleTagClick(tag, e)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-violet-500 hover:text-slate-950 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <span className="font-mono text-slate-300">Score: {country.techHubScore}/100</span>
                      <span className="flex items-center gap-1 font-medium text-violet-400 group-hover:underline">
                        <span>Directory Dossier</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            })}

          </div>
        ) : (
          /* Table View */
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 bg-slate-800/80 font-medium text-slate-200">
                <tr>
                  <th className="px-4 py-3">Resource / Name</th>
                  <th className="px-4 py-3">Hierarchy / Branch</th>
                  <th className="px-4 py-3">Tags</th>
                  <th className="px-4 py-3">Monthly Traffic / Stats</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedResults.map(({ item }) => {
                  const d = item.data as any;
                  return (
                    <tr
                      key={d.id}
                      onClick={() => onSelectItem(d, item.itemType)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        <div className="flex items-center gap-2">
                          {d.flag && <span>{d.flag}</span>}
                          <span>{d.title || d.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-cyan-400">
                        {d.category || d.region} &rarr; <span className="text-slate-300">{d.subCategory}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(d.tags || []).slice(0, 2).map((t: string, i: number) => (
                            <span key={i} className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums text-slate-200">
                        {d.monthlySearches
                          ? `${d.monthlySearches.toLocaleString()} searches/mo`
                          : d.githubStars
                          ? `${d.githubStars.toLocaleString()} stars`
                          : d.searchVolume
                          ? `${d.searchVolume.toLocaleString()} searches/mo`
                          : `Tech Hub: ${d.techHubScore}/100`}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-cyan-400 hover:underline">
                        Inspect &rarr;
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-mono font-medium transition-all ${
                    currentPage === page
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'border border-white/10 bg-slate-800/40 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
