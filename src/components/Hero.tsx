import React from 'react';
import { Sparkles, ArrowRight, Zap, BookOpen, Layers, Globe2, FolderTree } from 'lucide-react';
import { PillarType } from '../types';
import { PowerfulSearchBar } from './PowerfulSearchBar';

interface HeroProps {
  onSearchSubmit: (query: string, pillar: PillarType | 'all', countryCode: string, tags?: string[]) => void;
  onSelectItem: (item: any, type: PillarType) => void;
  onSelectPillar: (pillar: PillarType) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSubmit,
  onSelectItem,
  onSelectPillar,
}) => {
  const handleQuickTag = (tag: string, pillar: PillarType) => {
    onSearchSubmit(tag, pillar, 'all', [tag]);
    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-20">
      {/* Background Subtle Radial Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-35" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Headline & Value Proposition */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>High-Authority Programmatic Knowledge, Tool & Country Engine</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
            The Definitive Hub for Free Tools, Open Software & Global Country Intelligence
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Architected for organic discovery across <span className="text-white font-medium">100+ interactive online utilities</span>, <span className="text-white font-medium">100+ deep-dive research guides</span>, <span className="text-white font-medium">100+ open-source software replacements</span>, and <span className="text-white font-medium">100+ sovereign country directories</span>.
          </p>

          {/* Master Inverted Search Bar with Auto-Suggestions & Country Filter */}
          <div className="mt-8">
            <PowerfulSearchBar
              onSearchSubmit={(q, p, c, t) => {
                onSearchSubmit(q, p, c, t);
                document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectItem={onSelectItem}
            />
          </div>

          {/* Popular Tag Quick-Jumps */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Suggested Queries:</span>
            <button
              onClick={() => handleQuickTag('TypeScript', 'tools')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #TypeScript (42)
            </button>
            <button
              onClick={() => handleQuickTag('Schema.org', 'tools')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #Schema.org (38)
            </button>
            <button
              onClick={() => handleQuickTag('Programmatic SEO', 'guides')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #Programmatic-SEO (52)
            </button>
            <button
              onClick={() => handleQuickTag('Blender', 'software')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #Blender 3D (12)
            </button>
            <button
              onClick={() => handleQuickTag('Digital Nomad Visa', 'countries')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #Nomad-Visa (48)
            </button>
            <button
              onClick={() => handleQuickTag('VAT & Tax', 'tools')}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-white"
            >
              #VAT & Tax (64)
            </button>
          </div>
        </div>

        {/* 4 Pillars Interactive Quick-Switch Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Tools */}
          <div
            onClick={() => {
              onSelectPillar('tools');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 transition-all hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-semibold text-cyan-400">104 Utilities</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Online Tools Suite
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Browser-native JSON formatters, JWT decoders, SERP simulators, PDF mergers, and code generators.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-cyan-400">
              <span>Browse 100+ tools</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Knowledge Guides */}
          <div
            onClick={() => {
              onSelectPillar('guides');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-semibold text-blue-400">100 Guides</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              Knowledge Hub
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Technical SEO architectures, Google algorithmic blueprints, GDPR cross-border laws, and FOSS licensing.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-400">
              <span>Explore 100+ guides</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Free Software */}
          <div
            onClick={() => {
              onSelectPillar('software');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400">100 FOSS Apps</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Free Software Hub
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Community-driven open-source alternatives to Photoshop, Figma, Notion, Slack, and Autodesk Maya.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span>View 100+ software</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Country Atlas */}
          <div
            onClick={() => {
              onSelectPillar('countries');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 transition-all hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-950/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 group-hover:bg-violet-500 group-hover:text-slate-950 transition-colors">
                <Globe2 className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-semibold text-violet-400">100+ Nations</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
              Country Directory
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Sovereign VAT tax brackets, digital nomad visas, corporate registrations, and tech hub ecosystems.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-violet-400">
              <span>Explore 100+ countries</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
