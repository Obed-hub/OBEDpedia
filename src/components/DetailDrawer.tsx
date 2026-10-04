import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Code2,
  ExternalLink,
  Star,
  CheckCircle2,
  Share2,
  Globe,
  Sparkles,
  Layers,
  Zap,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Tag,
  FolderTree,
} from 'lucide-react';
import { ToolItem, InfoGuideItem, SoftwareItem, CountryItem, PillarType } from '../types';

interface DetailDrawerProps {
  item: ToolItem | InfoGuideItem | SoftwareItem | CountryItem | null;
  type: PillarType | null;
  onClose: () => void;
  onNavigateItem: (item: any, type: PillarType) => void;
  onTagClick?: (tagName: string) => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({
  item,
  type,
  onClose,
  onNavigateItem,
  onTagClick,
}) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'taxonomy' | 'seo'>('overview');

  if (!item || !type) return null;

  // Generate dynamic Schema.org JSON-LD for this leaf node
  const getLeafSchema = () => {
    if (type === 'tools') {
      const tool = item as ToolItem;
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': tool.title,
          'url': `https://omniindex.org${tool.canonicalPath}`,
          'applicationCategory': tool.category,
          'applicationSubCategory': tool.subCategory,
          'keywords': tool.tags.join(', '),
          'operatingSystem': 'Web Browser',
          'description': tool.description,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': tool.rating.toString(),
            'ratingCount': tool.reviewsCount.toString(),
          },
        },
        null,
        2
      );
    } else if (type === 'guides') {
      const guide = item as InfoGuideItem;
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': guide.schemaType || 'TechArticle',
          'headline': guide.title,
          'url': `https://omniindex.org${guide.canonicalPath}`,
          'articleSection': guide.category,
          'keywords': guide.tags.join(', '),
          'datePublished': guide.publishDate,
          'author': {
            '@type': 'Organization',
            'name': guide.author,
          },
          'description': guide.description,
        },
        null,
        2
      );
    } else if (type === 'software') {
      const soft = item as SoftwareItem;
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': soft.title,
          'url': `https://omniindex.org${soft.canonicalPath}`,
          'operatingSystem': soft.platforms.join(', '),
          'applicationCategory': soft.category,
          'softwareVersion': soft.version,
          'keywords': soft.tags.join(', '),
          'offers': {
            '@type': 'Offer',
            'price': '0',
          },
        },
        null,
        2
      );
    } else {
      const country = item as CountryItem;
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          'name': country.name,
          'url': `https://omniindex.org${country.canonicalPath}`,
          'identifier': country.isoCode,
          'keywords': country.tags.join(', '),
          'description': `${country.name} country intelligence directory. Capital: ${country.capital}. VAT Rate: ${country.vatRate}. Corporate Tax: ${country.corporateTaxRate}.`,
        },
        null,
        2
      );
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(getLeafSchema());
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
      <div
        className="relative flex h-full w-full max-w-2xl flex-col bg-[#090D16] border-l border-white/10 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#090D16]/95 px-6 py-4 backdrop-blur-md">
          {/* Multi-Tier Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono truncate max-w-md">
            <span>OmniIndex</span>
            <span>/</span>
            <span className="capitalize">{type}</span>
            <span>/</span>
            <span className="text-slate-300">{(item as any).category || (item as any).region}</span>
            <span>/</span>
            <span className="text-cyan-400 truncate font-semibold">{(item as any).title || (item as any).name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-slate-900/40 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('taxonomy')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'taxonomy'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="h-3.5 w-3.5" />
            <span>Category & Tags</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Schema.org JSON-LD</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'seo'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SEO Intent & Silo
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-semibold">
                    {(item as any).category || (item as any).region}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{(item as any).subCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold">Verified Programmatic Node</span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  {(item as any).flag && <span className="text-3xl">{(item as any).flag}</span>}
                  <h2 className="font-display text-2xl font-bold text-white">
                    {(item as any).title || (item as any).name}
                  </h2>
                </div>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {(item as any).description || (item as any).nomadVisaDetails}
                </p>

                {/* Tag Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {((item as any).tags || []).map((tag: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => onTagClick && onTagClick(tag)}
                      className="rounded-lg border border-white/10 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-white transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Data Sections */}
              {type === 'tools' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                      Core Functional Capabilities
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {((item as ToolItem).features || []).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-xs text-slate-400">Execution Engine</div>
                      <div className="mt-1 font-mono text-xs font-semibold text-white">
                        {(item as ToolItem).executionMode} (Client-Side)
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-xs text-slate-400">User Rating</div>
                      <div className="mt-1 font-mono text-xs font-semibold text-amber-400 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span>{(item as ToolItem).rating} / 5.0 ({(item as ToolItem).reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'guides' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                      Key Takeaways & Citations
                    </h4>
                    <div className="space-y-2">
                      {((item as InfoGuideItem).keyTakeaways || []).map((takeaway, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-slate-400">Target Audience Difficulty</div>
                      <div className="mt-1 font-semibold text-white">{(item as InfoGuideItem).difficulty}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-slate-400">Verified Peer Citations</div>
                      <div className="mt-1 font-mono text-blue-400 font-semibold">
                        {(item as InfoGuideItem).citationsCount} Technical Sources
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'software' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                      Proprietary Software Replaced
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {((item as SoftwareItem).alternativeTo || []).map((alt, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                        >
                          Alternative to {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-slate-400">Open-Source License</div>
                      <div className="mt-1 font-mono text-emerald-400 font-semibold">
                        {(item as SoftwareItem).license}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3">
                      <div className="text-slate-400">Cross-Platform Support</div>
                      <div className="mt-1 text-slate-200">
                        {(item as SoftwareItem).platforms.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'countries' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Tax & Business Regulation Matrix
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-slate-400">Standard VAT Rate</div>
                        <div className="mt-0.5 font-mono text-sm font-bold text-cyan-400">
                          {(item as CountryItem).vatRate}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Corporate Income Tax</div>
                        <div className="mt-0.5 font-mono text-sm font-bold text-white">
                          {(item as CountryItem).corporateTaxRate}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Data Privacy Standard</div>
                        <div className="mt-0.5 text-slate-300 font-medium">
                          {(item as CountryItem).dataLaw}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Innovation Index</div>
                        <div className="mt-0.5 font-mono text-violet-400 font-bold">
                          {(item as CountryItem).techHubScore} / 100
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'taxonomy' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3 text-xs">
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider">
                  Complete Taxonomy Node Mapping
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300 border-b border-white/5 pb-2">
                    <span className="text-slate-400">Master Pillar:</span>
                    <span className="font-semibold text-cyan-400 uppercase">{type}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-white/5 pb-2">
                    <span className="text-slate-400">Primary Category:</span>
                    <span className="font-semibold text-white">{(item as any).category || (item as any).region}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-white/5 pb-2">
                    <span className="text-slate-400">Sub-category Branch:</span>
                    <span className="font-semibold text-blue-400">{(item as any).subCategory}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3 text-xs">
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider">
                  Associated Semantic Tags ({((item as any).tags || []).length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {((item as any).tags || []).map((t: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 font-mono"
                    >
                      <Tag className="h-3 w-3" />
                      <span>#{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Embedded Schema.org Structured Data:</span>
                <button
                  onClick={handleCopySchema}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
                >
                  {copiedSchema ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedSchema ? 'Copied' : 'Copy JSON-LD'}</span>
                </button>
              </div>
              <pre className="rounded-xl border border-white/10 bg-[#070A10] p-4 text-xs font-mono text-cyan-300 overflow-x-auto max-h-96">
                <code>{getLeafSchema()}</code>
              </pre>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Programmatic SEO Architecture Metadata
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Canonical Path:</span>
                    <code className="font-mono text-cyan-300">{(item as any).canonicalPath}</code>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Search Engine Indexability:</span>
                    <span className="text-emerald-400 font-semibold">Index, Follow (High Priority)</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Topical Cluster / Silo:</span>
                    <span className="text-white capitalize">{type} Master Directory</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Monthly Projected Keyword Volume:</span>
                    <span className="font-mono text-slate-200">
                      {((item as any).monthlySearches || (item as any).searchVolume || 25000).toLocaleString()} searches/mo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 border-t border-white/10 bg-[#090D16]/95 p-4 backdrop-blur-md flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Close Drawer
          </button>
          <button
            onClick={() => {
              handleCopySchema();
            }}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Copy Schema JSON-LD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
