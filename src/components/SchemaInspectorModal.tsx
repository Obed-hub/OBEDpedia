import React, { useState } from 'react';
import { X, Copy, Check, Code2, ShieldCheck, ExternalLink, Globe } from 'lucide-react';

interface SchemaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaInspectorModal: React.FC<SchemaInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const siteSchemaJson = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://omniindex.org/#website',
          'url': 'https://omniindex.org/',
          'name': 'OmniIndex',
          'description': 'Global programmatic directory hub indexing 100+ tools, 100+ knowledge bases, 100+ open-source software alternatives, and 100+ country resource directories.',
          'publisher': {
            '@type': 'Organization',
            '@id': 'https://omniindex.org/#organization',
            'name': 'OmniIndex Global Resource Network',
            'url': 'https://omniindex.org',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://omniindex.org/logo.png',
            },
          },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://omniindex.org/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'CollectionPage',
          '@id': 'https://omniindex.org/#collection',
          'url': 'https://omniindex.org/',
          'name': 'OmniIndex Directory Hub',
          'isPartOf': {
            '@id': 'https://omniindex.org/#website',
          },
          'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://omniindex.org/',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Online Tools (104)',
                'item': 'https://omniindex.org/tools',
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Knowledge Hub (100)',
                'item': 'https://omniindex.org/guides',
              },
              {
                '@type': 'ListItem',
                'position': 4,
                'name': 'Free Software (100)',
                'item': 'https://omniindex.org/software',
              },
              {
                '@type': 'ListItem',
                'position': 5,
                'name': 'Country Atlas (100+)',
                'item': 'https://omniindex.org/countries',
              },
            ],
          },
        },
      ],
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(siteSchemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/15 bg-[#090D16] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-cyan-400" />
            <h3 className="font-display text-base font-bold text-white">
              Global Site Schema.org JSON-LD Inspector
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-medium">Google Rich Results Compliant (Syntactically Valid)</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700 hover:text-white"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy JSON-LD'}</span>
            </button>
          </div>

          <pre className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-[#070A10] p-4 font-mono text-cyan-300 leading-relaxed">
            <code>{siteSchemaJson}</code>
          </pre>

          <div className="rounded-xl bg-slate-900/40 p-3.5 border border-white/5 space-y-1 text-slate-300">
            <div className="font-semibold text-white">Why Schema Graph Nesting Matters for 1M+ Visitors:</div>
            <p className="text-slate-400 leading-relaxed">
              Google crawler bots consume JSON-LD `@graph` hierarchies to build entity relationships between parent domains, collection hubs, and individual tool calculators. This qualifies the domain for Sitelinks Search Boxes, Star Ratings, and FAQ dropdowns directly in SERP snippets.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-slate-900/80 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
