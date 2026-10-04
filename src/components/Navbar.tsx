import React from 'react';
import { Search, Code2, Sparkles, Globe, FolderTree, Calculator, GitCompare } from 'lucide-react';
import { PillarType } from '../types';

interface NavbarProps {
  activePillar: PillarType;
  onSelectPillar: (pillar: PillarType) => void;
  onOpenSearch: () => void;
  onOpenSchemaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePillar,
  onSelectPillar,
  onOpenSearch,
  onOpenSchemaModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07090E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <span>OmniIndex</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#interactive-calculators"
            className="text-slate-300 transition-colors hover:text-cyan-400"
          >
            Calculators
          </a>
          <button
            onClick={() => {
              onSelectPillar('tools');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-white ${
              activePillar === 'tools' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => {
              onSelectPillar('software');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-white ${
              activePillar === 'software' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Software
          </button>
          <button
            onClick={() => {
              onSelectPillar('countries');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-white ${
              activePillar === 'countries' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Countries
          </button>
          <button
            onClick={() => {
              onSelectPillar('guides');
              document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-white ${
              activePillar === 'guides' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            Guides
          </button>
          <a
            href="#sitemap-tree"
            className="text-slate-300 transition-colors hover:text-cyan-400"
          >
            URL Tree
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-cyan-500/40 hover:bg-white/[0.08] hover:text-white"
            title="Search all 400+ resources (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenSchemaModal}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 whitespace-nowrap"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Schema Inspector</span>
          </button>
        </div>
      </div>
    </header>
  );
};
