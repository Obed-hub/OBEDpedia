import React, { useState, useMemo } from 'react';
import {
  Tag,
  Layers,
  ChevronRight,
  FolderTree,
  Sparkles,
  Check,
  Zap,
  BookOpen,
  Globe2,
  Filter,
  ArrowRight,
  Code2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PillarType, ToolItem, InfoGuideItem, SoftwareItem, CountryItem } from '../types';
import { TAXONOMY_HIERARCHY, MASTER_TAGS } from '../data/taxonomyData';
import { searchIndex } from '../services/searchIndex';

interface TaxonomyExplorerProps {
  onSelectItem: (item: any, type: PillarType) => void;
  onSelectPillar: (pillar: PillarType) => void;
  onFilterByTag?: (tagName: string) => void;
}

export const TaxonomyExplorer: React.FC<TaxonomyExplorerProps> = ({
  onSelectItem,
  onSelectPillar,
  onFilterByTag,
}) => {
  const [activePillar, setActivePillar] = useState<PillarType>('tools');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(TAXONOMY_HIERARCHY[0].slug);
  const [selectedSubCategorySlug, setSelectedSubCategorySlug] = useState<string>('all');
  const [activeSelectedTags, setActiveSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  // Categories for current pillar
  const pillarCategories = useMemo(() => {
    return TAXONOMY_HIERARCHY.filter((c) => c.pillar === activePillar);
  }, [activePillar]);

  // Current selected category
  const currentCategory = useMemo(() => {
    return (
      pillarCategories.find((c) => c.slug === selectedCategorySlug) ||
      pillarCategories[0] ||
      TAXONOMY_HIERARCHY[0]
    );
  }, [pillarCategories, selectedCategorySlug]);

  // Tags filter
  const filteredTags = useMemo(() => {
    const q = tagSearchQuery.toLowerCase().trim();
    return MASTER_TAGS.filter(
      (t) =>
        (activePillar === 'tools' || t.pillar === activePillar || t.pillar === 'universal') &&
        (!q || t.name.toLowerCase().includes(q) || t.slug.includes(q))
    );
  }, [activePillar, tagSearchQuery]);

  // Toggle active tag
  const toggleTag = (tagName: string) => {
    setActiveSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  // Switch pillar
  const handlePillarSwitch = (pillar: PillarType) => {
    setActivePillar(pillar);
    const firstCat = TAXONOMY_HIERARCHY.find((c) => c.pillar === pillar);
    if (firstCat) {
      setSelectedCategorySlug(firstCat.slug);
      setSelectedSubCategorySlug('all');
    }
  };

  // Fetch results based on taxonomy hierarchy and active tags
  const matchedResults = useMemo(() => {
    return searchIndex.search({
      pillar: activePillar,
      category: currentCategory.title,
      subCategory: selectedSubCategorySlug === 'all' ? undefined : selectedSubCategorySlug,
      tags: activeSelectedTags,
      limit: 6,
    });
  }, [activePillar, currentCategory, selectedSubCategorySlug, activeSelectedTags]);

  return (
    <section id="taxonomy-hierarchy" className="py-16 bg-[#080C14] border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <FolderTree className="h-3.5 w-3.5" />
              <span>Multi-Tier Category & Tagging System</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
              Semantic Taxonomy & Tag Ontology
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              A structured hierarchy mapping Master Pillars $\rightarrow$ Primary Categories $\rightarrow$ Sub-categories $\rightarrow$ Recommended Tag Clusters to power faceted indexing and rich Google BreadcrumbList schema.
            </p>
          </div>

          {/* Pillar Selector Buttons */}
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-900/80 p-1">
            <button
              onClick={() => handlePillarSwitch('tools')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePillar === 'tools'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Tools</span>
            </button>
            <button
              onClick={() => handlePillarSwitch('guides')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePillar === 'guides'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Guides</span>
            </button>
            <button
              onClick={() => handlePillarSwitch('software')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePillar === 'software'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Software</span>
            </button>
            <button
              onClick={() => handlePillarSwitch('countries')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activePillar === 'countries'
                  ? 'bg-violet-500 text-slate-950 shadow-md shadow-violet-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>Countries</span>
            </button>
          </div>
        </div>

        {/* 3-Column Taxonomy Drilldown Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Primary Categories in Current Pillar (col-span-4) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-semibold text-slate-300">
              <span>Primary Categories</span>
              <span className="font-mono text-cyan-400">{pillarCategories.length} Categories</span>
            </div>

            <div className="space-y-2">
              {pillarCategories.map((cat) => {
                const isSelected = selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategorySlug(cat.slug);
                      setSelectedSubCategorySlug('all');
                    }}
                    className={`w-full rounded-xl p-3.5 text-left transition-all border ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/40'
                        : 'border-white/5 bg-slate-800/40 text-slate-300 hover:border-white/20 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">{cat.title}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-cyan-400">
                        {cat.totalCount} items
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Sub-categories & Suggested Tags (col-span-4) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-semibold text-slate-300">
              <span>Sub-Categories & Suggested Tags</span>
              <span className="font-mono text-blue-400">{currentCategory.subCategories.length} Sub-branches</span>
            </div>

            {/* Subcategories list */}
            <div className="space-y-3">
              <button
                onClick={() => setSelectedSubCategorySlug('all')}
                className={`w-full rounded-xl p-3 text-left text-xs transition-all border ${
                  selectedSubCategorySlug === 'all'
                    ? 'border-blue-500 bg-blue-950/40 text-white font-semibold'
                    : 'border-white/5 bg-slate-800/30 text-slate-300 hover:border-white/15'
                }`}
              >
                <span>All Sub-categories in {currentCategory.title}</span>
              </button>

              {currentCategory.subCategories.map((sub) => {
                const isSubSelected = selectedSubCategorySlug === sub.title;
                return (
                  <div
                    key={sub.id}
                    className={`rounded-xl p-3 border transition-all ${
                      isSubSelected
                        ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/30'
                        : 'border-white/5 bg-slate-800/30 hover:border-white/15'
                    }`}
                  >
                    <div
                      onClick={() => setSelectedSubCategorySlug(sub.title)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-xs font-bold text-white hover:text-blue-300">
                        {sub.title}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{sub.itemCount} items</span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">{sub.description}</p>

                    {/* Suggested Tag Chips inside subcategory */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {sub.suggestedTags.map((tag, i) => {
                        const isTagActive = activeSelectedTags.includes(tag);
                        return (
                          <button
                            key={i}
                            onClick={() => toggleTag(tag)}
                            className={`rounded px-2 py-0.5 text-[10px] font-medium transition-all ${
                              isTagActive
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Tag Ontology Cloud & Live Results (col-span-4) */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-semibold text-slate-300">
              <span>Master Tag Registry</span>
              {activeSelectedTags.length > 0 && (
                <button
                  onClick={() => setActiveSelectedTags([])}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Clear ({activeSelectedTags.length})
                </button>
              )}
            </div>

            {/* Tag Search Input */}
            <input
              type="text"
              value={tagSearchQuery}
              onChange={(e) => setTagSearchQuery(e.target.value)}
              placeholder="Filter 20+ semantic tags..."
              className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />

            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
              {filteredTags.map((t) => {
                const isSelected = activeSelectedTags.includes(t.name);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleTag(t.name)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'border border-white/10 bg-slate-800/60 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                    }`}
                  >
                    <span>#{t.name}</span>
                    <span className="font-mono text-[10px] opacity-70">({t.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Matched Content Preview */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span>Matched Content in Taxonomy Path</span>
                <span className="text-[11px] font-mono text-cyan-400">{matchedResults.length} matches</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {matchedResults.map(({ item }) => {
                  const d = item.data as any;
                  return (
                    <div
                      key={d.id}
                      onClick={() => onSelectItem(d, item.itemType)}
                      className="group/item flex items-center justify-between rounded-xl bg-slate-800/50 p-2.5 border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover/item:text-cyan-300 transition-colors">
                          {d.title || d.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {d.subCategory || d.category} · {d.executionMode || d.license || d.readTime || `VAT: ${d.vatRate}`}
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover/item:text-cyan-400 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
