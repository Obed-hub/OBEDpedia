import React from 'react';
import { Sparkles, ArrowRight, Zap, BookOpen, Layers, Globe2, Star, ShieldCheck, Terminal } from 'lucide-react';
import { ToolItem, InfoGuideItem, SoftwareItem, CountryItem, PillarType } from '../types';
import { TOOLS_DATA } from '../data/toolsData';
import { INFO_GUIDES_DATA } from '../data/infoGuidesData';
import { SOFTWARE_DATA } from '../data/softwareData';
import { COUNTRIES_DATA } from '../data/countriesData';

interface FeaturedCollectionsProps {
  onSelectItem: (item: ToolItem | InfoGuideItem | SoftwareItem | CountryItem, type: PillarType) => void;
  onSelectPillar: (pillar: PillarType) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectItem,
  onSelectPillar,
}) => {
  const featuredTools = TOOLS_DATA.filter((t) => t.isFeatured).slice(0, 3);
  const featuredGuides = INFO_GUIDES_DATA.filter((g) => g.isFeatured).slice(0, 2);
  const featuredSoftware = SOFTWARE_DATA.filter((s) => s.isFeatured).slice(0, 3);
  const featuredCountries = COUNTRIES_DATA.filter((c) => c.isFeatured).slice(0, 4);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Curated Marquee Hubs
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              Flagship Utilities & Authoritative Reference Sets
            </h2>
          </div>
          <button
            onClick={() => {
              onSelectPillar('tools');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Explore all 400+ indexed nodes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Bento Marquee 1: Flagship Guide (Large col-span-7) */}
          <div
            onClick={() => onSelectItem(featuredGuides[0], 'guides')}
            className="lg:col-span-7 group surface-card flex flex-col justify-between rounded-2xl p-6 sm:p-8 cursor-pointer transition-all hover:shadow-2xl hover:shadow-blue-950/30"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-blue-400 font-semibold">{featuredGuides[0].category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredGuides[0].readTime}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300 font-mono">
                  {featuredGuides[0].searchVolume.toLocaleString()} monthly search intent
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {featuredGuides[0].title}
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {featuredGuides[0].description}
              </p>

              <div className="mt-6 space-y-2 rounded-xl bg-slate-900/60 p-4 border border-white/5">
                <div className="text-xs font-semibold text-slate-300">Key Implementation Takeaways:</div>
                {featuredGuides[0].keyTakeaways.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <span className="text-slate-400">Published by {featuredGuides[0].author}</span>
              <span className="flex items-center gap-1 font-semibold text-blue-400 group-hover:underline">
                <span>Read Full Technical Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Bento Marquee 2: High-Velocity FOSS Hub (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Trending Open-Source Software
                </div>
                <span className="font-mono text-xs text-slate-400">100% Free & FOSS</span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-white">
                Replace Expensive SaaS with Open Tools
              </h3>

              <div className="mt-4 space-y-3">
                {featuredSoftware.map((soft) => (
                  <div
                    key={soft.id}
                    onClick={() => onSelectItem(soft, 'software')}
                    className="group/item flex items-center justify-between rounded-xl bg-slate-800/40 p-3.5 border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-sm text-white group-hover/item:text-emerald-300 transition-colors">
                        {soft.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        Replaces {soft.alternativeTo.join(', ')} · <span className="font-mono text-slate-300">{soft.license}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs text-amber-400 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{soft.githubStars.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onSelectPillar('software');
                document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-5 flex items-center justify-center gap-1.5 w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all"
            >
              <span>Explore 100+ Free Software Replacements</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bento Row 2: Top Country Tax & Remote Hubs (col-span-12) */}
          <div className="lg:col-span-12 rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                  Global Country Atlas Spotlight
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Top Tech Hubs with Official Digital Nomad & Business Tax Programs
                </h3>
              </div>
              <button
                onClick={() => {
                  onSelectPillar('countries');
                  document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:underline"
              >
                <span>View all 100+ countries</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCountries.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectItem(c, 'countries')}
                  className="group surface-card rounded-xl p-4 cursor-pointer transition-all hover:border-violet-500/50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="font-display font-bold text-white group-hover:text-violet-300 transition-colors">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{c.region}</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>VAT Rate:</span>
                      <span className="font-mono text-cyan-400 font-semibold">{c.vatRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Corp Tax:</span>
                      <span className="font-mono text-slate-200">{c.corporateTaxRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Nomad Visa:</span>
                      <span className={c.nomadVisa ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                        {c.nomadVisa ? 'Available' : 'Standard'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
