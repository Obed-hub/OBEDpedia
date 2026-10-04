import React, { useState } from 'react';
import { Network, GitBranch, Layers, ShieldCheck, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SILO_CLUSTERS_DATA } from '../data/categoriesData';

export const TopicalSiloArchitecture: React.FC = () => {
  const [selectedSiloId, setSelectedSiloId] = useState(SILO_CLUSTERS_DATA[0].id);

  const selectedSilo = SILO_CLUSTERS_DATA.find((s) => s.id === selectedSiloId) || SILO_CLUSTERS_DATA[0];

  return (
    <section id="seo-silo-architecture" className="py-16 bg-[#080B12] border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Network className="h-3.5 w-3.5" />
            <span>1,000,000+ Monthly Organic Traffic Blueprint</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Programmatic SEO Silos & Schema-Optimized Graph
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            How OmniIndex structures 400+ programmatic nodes into tight topical clusters, maximizing crawl budget efficiency, internal PageRank flow, and Google Rich Result coverage.
          </p>
        </div>

        {/* 4 Interactive Silo Pillars */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SILO_CLUSTERS_DATA.map((silo) => (
            <button
              key={silo.id}
              onClick={() => setSelectedSiloId(silo.id)}
              className={`rounded-xl border p-5 text-left transition-all ${
                selectedSiloId === silo.id
                  ? 'border-cyan-500 bg-slate-900 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'border-white/10 bg-slate-900/50 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-cyan-400 font-semibold">{silo.totalNodes} Nodes</span>
                <span className="font-mono text-emerald-400 font-bold">{silo.projectedMonthlyTraffic}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-white leading-snug">
                {silo.name}
              </h3>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                <span className="text-slate-400">Topical Authority:</span>
                <span className="font-mono font-bold text-white">{silo.topicalAuthorityScore}/100</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Silo Deep Dive & Schema Graph Visualizer */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Silo Internal Link Strategy */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Cluster Execution Architecture
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {selectedSilo.name}
                </h3>
              </div>

              {/* Internal Link Flow diagram */}
              <div className="rounded-xl border border-white/10 bg-[#070A10] p-4">
                <div className="text-xs font-medium text-slate-400 mb-2 flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Internal Link Authority Flow (Hub & Spoke Model)</span>
                </div>
                <div className="text-xs font-mono text-cyan-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-white/5">
                  {selectedSilo.internalLinkFlow}
                </div>
              </div>

              {/* Primary High-Intent Target Keywords */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-2">High-Intent Seed Keywords in Cluster</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSilo.primaryKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-white/10 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200 font-mono"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Algorithmic Compliance Checklist */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold text-slate-300">Algorithmic Compliance Standards</h4>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero Thin-Content: Every node features runnable client-side code or exhaustive proprietary datasets.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Canonical URL Consistency: Zero duplication across faceted navigation filters.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Sub-200ms TTFB: Edge CDN caching guarantees immediate Googlebot indexing.</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Schema Graph Visualizer */}
            <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#07090E] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Linked Open Data Graph Schema Topology</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400">@graph Array Validated</span>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                {/* Node 1 */}
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-3">
                  <div className="flex justify-between text-cyan-300 font-bold">
                    <span>Root: WebSite Schema</span>
                    <span className="text-[10px] text-slate-400">@id: https://omniindex.org/#website</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Defines Organization publisher + Sitelinks SearchAction query-input
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center text-slate-500 text-xs">↓ isPartOf</div>

                {/* Node 2 */}
                <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 p-3">
                  <div className="flex justify-between text-blue-300 font-bold">
                    <span>CollectionPage Schema</span>
                    <span className="text-[10px] text-slate-400">@id: https://omniindex.org/#collection</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Aggregates 400+ Entity nodes with BreadcrumbList hierarchy
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-center text-slate-500 text-xs">↓ mainEntity / itemListElement</div>

                {/* Node 3 */}
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3">
                  <div className="flex justify-between text-emerald-300 font-bold">
                    <span>Leaf Entity: {selectedSilo.schemaPattern}</span>
                    <span className="text-[10px] text-slate-400">Canonical Leaf URL</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Contains AggregateRating, OperatingSystem, Author citations, and FAQPage rich questions
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-slate-900 p-3 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-300">Google Rich Snippets Eligibility:</span>
                <span className="font-semibold text-cyan-400">Stars, FAQ Accordion, Sitelinks Box</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
