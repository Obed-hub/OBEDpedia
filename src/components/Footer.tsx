import React from 'react';
import { Globe, ArrowRight, ShieldCheck, FileText, Rss, Code2 } from 'lucide-react';
import { PillarType } from '../types';

interface FooterProps {
  onSelectPillar: (pillar: PillarType) => void;
  onOpenSchemaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPillar,
  onOpenSchemaModal,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#06080E] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Col 1: Brand Wordmark & Abstract */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <span>OmniIndex</span>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed">
              The high-authority programmatic hub indexing 100+ browser tools, 100+ research guides, 100+ free software alternatives, and 100+ sovereign country directories.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono">404+ Programmatic Nodes</span>
            </div>
          </div>

          {/* Col 2: Online Tools Silo */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              Tools Suite (104)
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('tools');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  JSON to TypeScript
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('tools');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Schema JSON-LD Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('tools');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  SERP Snippet Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('tools');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Global VAT Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('tools');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  JWT Signature Inspector
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge Hub Silo */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              Knowledge Hub (100)
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('guides');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Programmatic SEO Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('guides');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Google Core Algorithm (E-E-A-T)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('guides');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  GDPR Cross-Border Handbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('guides');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  FOSS Licensing Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('guides');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Sub-500ms Core Web Vitals
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Free Software & Countries */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              FOSS & Countries
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('software');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Blender 3D Suite
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('software');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Penpot (Figma Alternate)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('countries');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Germany Tech Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('countries');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Portugal D8 Nomad Visa
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('countries');
                    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Estonia e-Residency Tax
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: SEO & Schema Resources */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
              SEO Architecture
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={onOpenSchemaModal} className="flex items-center gap-1 hover:text-white text-cyan-400">
                  <Code2 className="h-3 w-3" />
                  <span>Schema.org Validator</span>
                </button>
              </li>
              <li>
                <a href="#seo-silo-architecture" className="hover:text-white transition-colors">
                  Topical Link Silos
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" onClick={(e) => { e.preventDefault(); onOpenSchemaModal(); }} className="hover:text-white transition-colors">
                  XML Sitemap Index (404 URLs)
                </a>
              </li>
              <li>
                <a href="/robots.txt" onClick={(e) => { e.preventDefault(); alert("Robots.txt Directive:\nUser-agent: *\nAllow: /\nSitemap: https://omniindex.org/sitemap.xml"); }} className="hover:text-white transition-colors">
                  Robots.txt Rules
                </a>
              </li>
              <li>
                <span className="text-slate-500">CC-BY-4.0 Open Data</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} OmniIndex Global Directory Network. Built for open information access & high-speed search crawlability.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span className="hover:text-slate-300">Terms of Service</span>
            <span className="hover:text-slate-300">Editorial Methodology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
