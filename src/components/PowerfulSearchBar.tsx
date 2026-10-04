import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Globe2,
  Zap,
  BookOpen,
  Layers,
  ChevronDown,
  History,
  Tag,
  Check,
  Flame,
} from 'lucide-react';
import { PillarType, AutoSuggestion, ToolItem, InfoGuideItem, SoftwareItem, CountryItem } from '../types';
import { searchIndex } from '../services/searchIndex';
import { COUNTRIES_DATA } from '../data/countriesData';

interface PowerfulSearchBarProps {
  onSearchSubmit: (query: string, pillar: PillarType | 'all', countryCode: string, tags?: string[]) => void;
  onSelectItem?: (item: any, type: PillarType) => void;
  initialQuery?: string;
  initialPillar?: PillarType | 'all';
  placeholder?: string;
  compact?: boolean;
}

export const PowerfulSearchBar: React.FC<PowerfulSearchBarProps> = ({
  onSearchSubmit,
  onSelectItem,
  initialQuery = '',
  initialPillar = 'all',
  placeholder = 'Search 400+ tools, guides, FOSS software, VAT rates & countries...',
  compact = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>(initialPillar);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<AutoSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('omni_recent_searches');
      return saved ? JSON.parse(saved) : ['JSON to TypeScript', 'Schema.org JSON-LD', 'Blender 3D', 'Germany VAT'];
    } catch {
      return ['JSON to TypeScript', 'Schema.org JSON-LD', 'Blender 3D', 'Germany VAT'];
    }
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedPillar(initialPillar);
  }, [initialPillar]);

  // Compute auto-suggestions dynamically on query change
  useEffect(() => {
    const list = searchIndex.getAutoSuggestions(query, 7);
    setSuggestions(list);
    setSelectedIndex(-1);
  }, [query]);

  // Handle click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpenSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('omni_recent_searches', JSON.stringify(updated));
    } catch {}
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpenSuggestions(false);
    if (query.trim()) {
      saveRecentSearch(query);
    }
    onSearchSubmit(query.trim(), selectedPillar, selectedCountry);
  };

  const handleSuggestionClick = (sug: AutoSuggestion) => {
    setIsOpenSuggestions(false);
    if (sug.type === 'item' && sug.item && onSelectItem) {
      onSelectItem(sug.item, sug.pillar || 'tools');
      saveRecentSearch(sug.title);
    } else if (sug.type === 'tag') {
      setQuery(sug.title);
      saveRecentSearch(sug.title);
      onSearchSubmit(sug.title, selectedPillar, selectedCountry, [sug.title]);
    } else {
      setQuery(sug.title);
      saveRecentSearch(sug.title);
      onSearchSubmit(sug.title, sug.pillar || selectedPillar, selectedCountry);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpenSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpenSuggestions(false);
    }
  };

  const clearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
    onSearchSubmit('', selectedPillar, selectedCountry);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-4xl mx-auto">
      {/* Search Container Box */}
      <form
        onSubmit={handleFormSubmit}
        className={`rounded-2xl border border-white/15 bg-slate-900/95 shadow-2xl transition-all ${
          isOpenSuggestions ? 'border-cyan-500/50 ring-1 ring-cyan-500/30' : 'hover:border-white/25'
        }`}
      >
        {/* Top Facet Tabs (All, Tools, Info, Software, Countries) */}
        {!compact && (
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-3 pt-2 pb-1.5 gap-2 text-xs">
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              <button
                type="button"
                onClick={() => setSelectedPillar('all')}
                className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedPillar === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                All 400+ Nodes
              </button>
              <button
                type="button"
                onClick={() => setSelectedPillar('tools')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedPillar === 'tools'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Zap className="h-3 w-3" />
                <span>Tools (104)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPillar('guides')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedPillar === 'guides'
                    ? 'bg-blue-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="h-3 w-3" />
                <span>Guides (100)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPillar('software')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedPillar === 'software'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="h-3 w-3" />
                <span>Software (100)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPillar('countries')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  selectedPillar === 'countries'
                    ? 'bg-violet-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Globe2 className="h-3 w-3" />
                <span>Countries (100+)</span>
              </button>
            </div>

            {/* Country / Jurisdiction Picker Dropdown */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="rounded-md border border-white/10 bg-slate-800 px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">Global (All 100+ Jurisdictions)</option>
                <option value="DE">🇩🇪 Germany (DE)</option>
                <option value="US">🇺🇸 United States (US)</option>
                <option value="SG">🇸🇬 Singapore (SG)</option>
                <option value="GB">🇬🇧 United Kingdom (GB)</option>
                <option value="PT">🇵🇹 Portugal (PT)</option>
                <option value="JP">🇯🇵 Japan (JP)</option>
                <option value="EE">🇪🇪 Estonia (EE)</option>
                <option value="AE">🇦🇪 UAE (AE)</option>
                <option value="CA">🇨🇦 Canada (CA)</option>
                <option value="CH">🇨🇭 Switzerland (CH)</option>
                <option value="KR">🇰🇷 South Korea (KR)</option>
                <option value="TW">🇹🇼 Taiwan (TW)</option>
                <option value="BR">🇧🇷 Brazil (BR)</option>
                <option value="MX">🇲🇽 Mexico (MX)</option>
              </select>
            </div>
          </div>
        )}

        {/* Search Input Row */}
        <div className="flex items-center gap-3 p-2.5 sm:p-3">
          <div className="pl-2">
            <Search className="h-5 w-5 text-cyan-400" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpenSuggestions(true);
            }}
            onFocus={() => setIsOpenSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 sm:px-5 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 whitespace-nowrap"
          >
            <span>Search</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {/* Auto-Suggestions & Quick-Jump Dropdown */}
      {isOpenSuggestions && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/15 bg-[#090D16]/98 shadow-2xl backdrop-blur-xl overflow-hidden divide-y divide-white/10 animate-in fade-in zoom-in-95 duration-100">
          {/* Suggestions List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Smart Search Predictions</span>
              <span className="font-mono text-cyan-400 font-normal">Sub-1ms Inverted Index</span>
            </div>

            {suggestions.map((sug, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={sug.id}
                  onClick={() => handleSuggestionClick(sug)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer transition-all ${
                    isSelected ? 'bg-cyan-950/50 border border-cyan-500/40 text-white' : 'hover:bg-slate-800/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        sug.type === 'item'
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : sug.type === 'tag'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : sug.type === 'country'
                          ? 'bg-violet-500/10 text-violet-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}
                    >
                      {sug.type === 'item' ? (
                        <Zap className="h-3.5 w-3.5" />
                      ) : sug.type === 'tag' ? (
                        <Tag className="h-3.5 w-3.5" />
                      ) : sug.type === 'country' ? (
                        <Globe2 className="h-3.5 w-3.5" />
                      ) : (
                        <Layers className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {sug.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-md">{sug.subtext}</div>
                    </div>
                  </div>

                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-mono font-medium ${
                      sug.type === 'item'
                        ? 'bg-cyan-500/15 text-cyan-300'
                        : sug.type === 'tag'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : sug.type === 'country'
                        ? 'bg-violet-500/15 text-violet-300'
                        : 'bg-blue-500/15 text-blue-300'
                    }`}
                  >
                    {sug.metaBadge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Recent Searches Footer */}
          {recentSearches.length > 0 && (
            <div className="p-3 bg-slate-900/60">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-2">
                <History className="h-3.5 w-3.5 text-cyan-400" />
                <span>Recent Lookups:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((rec, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuery(rec);
                      setIsOpenSuggestions(false);
                      onSearchSubmit(rec, selectedPillar, selectedCountry);
                    }}
                    className="rounded-lg border border-white/10 bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-cyan-500/40 hover:text-white transition-colors"
                  >
                    {rec}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
