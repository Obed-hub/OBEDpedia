import React, { useState } from 'react';
import {
  FolderTree,
  Folder,
  FolderOpen,
  FileCode,
  Globe2,
  Zap,
  BookOpen,
  Layers,
  GitCompare,
  FileText,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Code2,
  Sparkles,
} from 'lucide-react';
import { PillarType, ToolItem, InfoGuideItem, SoftwareItem, CountryItem, CompareItem, ResourceItem } from '../types';
import { TOOLS_DATA } from '../data/toolsData';
import { SOFTWARE_DATA } from '../data/softwareData';
import { COUNTRIES_DATA } from '../data/countriesData';
import { INFO_GUIDES_DATA } from '../data/infoGuidesData';
import { COMPARE_DATA } from '../data/compareData';
import { RESOURCES_DATA } from '../data/resourcesData';

interface SiteTreeExplorerProps {
  onSelectItem: (item: any, type: PillarType) => void;
}

export const SiteTreeExplorer: React.FC<SiteTreeExplorerProps> = ({ onSelectItem }) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'tools': true,
    'tools-calculators': true,
    'software': true,
    'countries': true,
    'guides': true,
    'compare': true,
    'resources': true,
  });

  const [activeSelectedPath, setActiveSelectedPath] = useState<string>('/tools/calculators/bmi-calculator');

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  return (
    <section id="sitemap-tree" className="py-16 bg-[#070A12] border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <FolderTree className="h-3.5 w-3.5" />
              <span>Programmatic URL Hierarchy & Directory Tree</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
              Root Directory Architecture & URL Topology
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Explore the exact multi-tier directory structure powering our 400+ indexed nodes, Schema breadcrumb graphs, and canonical SEO routing.
            </p>
          </div>

          <div className="text-xs font-mono text-cyan-400 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg">
            Active Route: <span className="text-white">{activeSelectedPath}</span>
          </div>
        </div>

        {/* Tree Container */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#06090F] p-6 font-mono text-xs shadow-2xl">
          {/* Root node */}
          <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-white/10">
            <span className="text-cyan-400">/</span>
            <span>OmniIndex Root Specification (Canonical URL Tree)</span>
          </div>

          <div className="mt-4 space-y-3 pl-2 text-slate-300">
            {/* 1. /tools/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('tools')}
                className="flex items-center gap-1.5 text-cyan-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['tools'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['tools'] ? <FolderOpen className="h-3.5 w-3.5 text-cyan-400" /> : <Folder className="h-3.5 w-3.5 text-cyan-400" />}
                <span>├── tools/</span>
                <span className="text-[11px] text-slate-500 font-normal">({TOOLS_DATA.length} utilities)</span>
              </div>

              {expandedFolders['tools'] && (
                <div className="pl-6 space-y-1.5 border-l border-white/10 ml-2 mt-1">
                  {/* tools/calculators/ */}
                  <div>
                    <div
                      onClick={() => toggleFolder('tools-calculators')}
                      className="flex items-center gap-1.5 text-slate-200 hover:text-white cursor-pointer select-none"
                    >
                      {expandedFolders['tools-calculators'] ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      <Folder className="h-3 w-3 text-cyan-400" />
                      <span className="font-semibold text-cyan-400">├── calculators/</span>
                    </div>

                    {expandedFolders['tools-calculators'] && (
                      <div className="pl-6 space-y-1 border-l border-white/10 ml-2 mt-1 text-[11px]">
                        <div
                          onClick={() => {
                            setActiveSelectedPath('/tools/calculators/bmi-calculator');
                            onSelectItem(TOOLS_DATA[0], 'tools');
                          }}
                          className="hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                        >
                          <FileCode className="h-3 w-3 text-slate-500" />
                          <span>├── bmi-calculator</span>
                        </div>
                        <div
                          onClick={() => {
                            setActiveSelectedPath('/tools/calculators/percentage-calculator');
                            onSelectItem(TOOLS_DATA[1], 'tools');
                          }}
                          className="hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                        >
                          <FileCode className="h-3 w-3 text-slate-500" />
                          <span>├── percentage-calculator</span>
                        </div>
                        <div
                          onClick={() => {
                            setActiveSelectedPath('/tools/calculators/age-calculator');
                            onSelectItem(TOOLS_DATA[2], 'tools');
                          }}
                          className="hover:text-cyan-300 cursor-pointer flex items-center gap-1"
                        >
                          <FileCode className="h-3 w-3 text-slate-500" />
                          <span>└── age-calculator</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* other tools folders */}
                  {['finance', 'productivity', 'health', 'business', 'education', 'technology', 'seo'].map((sub, i) => (
                    <div key={sub} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200">
                      <Folder className="h-3 w-3 text-slate-500" />
                      <span>{i === 6 ? '└──' : '├──'} {sub}/</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. /software/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('software')}
                className="flex items-center gap-1.5 text-emerald-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['software'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['software'] ? <FolderOpen className="h-3.5 w-3.5 text-emerald-400" /> : <Folder className="h-3.5 w-3.5 text-emerald-400" />}
                <span>├── software/</span>
                <span className="text-[11px] text-slate-500 font-normal">({SOFTWARE_DATA.length} FOSS packages)</span>
              </div>

              {expandedFolders['software'] && (
                <div className="pl-6 space-y-1.5 border-l border-white/10 ml-2 mt-1">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>├── pdf-tools/</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>├── image-tools/ (blender-3d, gimp, inkscape)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>├── text-tools/</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>├── video-tools/ (obs-studio, kdenlive, audacity)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>├── developer-tools/ (vscodium, neovim, zed)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Folder className="h-3 w-3 text-emerald-500/70" />
                    <span>└── free/ | alternatives/ | open-source/</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. /countries/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('countries')}
                className="flex items-center gap-1.5 text-violet-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['countries'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['countries'] ? <FolderOpen className="h-3.5 w-3.5 text-violet-400" /> : <Folder className="h-3.5 w-3.5 text-violet-400" />}
                <span>├── countries/</span>
                <span className="text-[11px] text-slate-500 font-normal">({COUNTRIES_DATA.length} jurisdictions)</span>
              </div>

              {expandedFolders['countries'] && (
                <div className="pl-6 space-y-1 border-l border-white/10 ml-2 mt-1 text-[11px]">
                  <div
                    onClick={() => {
                      const nigeria = COUNTRIES_DATA.find((c) => c.slug === 'nigeria') || COUNTRIES_DATA[0];
                      setActiveSelectedPath('/countries/nigeria');
                      onSelectItem(nigeria, 'countries');
                    }}
                    className="hover:text-violet-300 cursor-pointer flex items-center gap-1"
                  >
                    <FileCode className="h-3 w-3 text-slate-500" />
                    <span>├── nigeria/ (🇳🇬 Lagos Tech Cluster, NDPA, VAT 7.5%)</span>
                  </div>
                  <div
                    onClick={() => {
                      const usa = COUNTRIES_DATA.find((c) => c.slug === 'united-states') || COUNTRIES_DATA[1];
                      setActiveSelectedPath('/countries/usa');
                      onSelectItem(usa, 'countries');
                    }}
                    className="hover:text-violet-300 cursor-pointer flex items-center gap-1"
                  >
                    <FileCode className="h-3 w-3 text-slate-500" />
                    <span>├── usa/ (🇺🇸 Silicon Valley, CCPA, Federal Tax)</span>
                  </div>
                  <div
                    onClick={() => {
                      const uk = COUNTRIES_DATA.find((c) => c.slug === 'united-kingdom') || COUNTRIES_DATA[3];
                      setActiveSelectedPath('/countries/uk');
                      onSelectItem(uk, 'countries');
                    }}
                    className="hover:text-violet-300 cursor-pointer flex items-center gap-1"
                  >
                    <FileCode className="h-3 w-3 text-slate-500" />
                    <span>├── uk/ (🇬🇧 London Fintech Hub, Global Talent Visa)</span>
                  </div>
                  <div
                    onClick={() => {
                      const canada = COUNTRIES_DATA.find((c) => c.slug === 'canada') || COUNTRIES_DATA[4];
                      setActiveSelectedPath('/countries/canada');
                      onSelectItem(canada, 'countries');
                    }}
                    className="hover:text-violet-300 cursor-pointer flex items-center gap-1"
                  >
                    <FileCode className="h-3 w-3 text-slate-500" />
                    <span>├── canada/ (🇨🇦 Toronto/Montreal AI Hub, Startup Visa)</span>
                  </div>
                  <div className="text-slate-500">
                    <span>└── ... (100+ additional sovereign countries)</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. /guides/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('guides')}
                className="flex items-center gap-1.5 text-blue-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['guides'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['guides'] ? <FolderOpen className="h-3.5 w-3.5 text-blue-400" /> : <Folder className="h-3.5 w-3.5 text-blue-400" />}
                <span>├── guides/</span>
                <span className="text-[11px] text-slate-500 font-normal">({INFO_GUIDES_DATA.length} whitepapers)</span>
              </div>

              {expandedFolders['guides'] && (
                <div className="pl-6 space-y-1 border-l border-white/10 ml-2 mt-1 text-[11px]">
                  <div className="text-slate-400">├── technology/ (programmatic-seo, core-web-vitals, wasm-architecture)</div>
                  <div className="text-slate-400">├── finance/ (cross-border-vat, saas-ltv-cac-economics)</div>
                  <div className="text-slate-400">├── business/ (open-source-monetization, enterprise-procurement)</div>
                  <div className="text-slate-400">└── education/ (academic-grade-scales, research-methodologies)</div>
                </div>
              )}
            </div>

            {/* 5. /compare/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('compare')}
                className="flex items-center gap-1.5 text-amber-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['compare'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['compare'] ? <FolderOpen className="h-3.5 w-3.5 text-amber-400" /> : <Folder className="h-3.5 w-3.5 text-amber-400" />}
                <span>├── compare/</span>
                <span className="text-[11px] text-slate-500 font-normal">({COMPARE_DATA.length} comparison matrices)</span>
              </div>

              {expandedFolders['compare'] && (
                <div className="pl-6 space-y-1 border-l border-white/10 ml-2 mt-1 text-[11px]">
                  {COMPARE_DATA.slice(0, 4).map((cmp, i) => (
                    <div
                      key={cmp.id}
                      onClick={() => {
                        setActiveSelectedPath(cmp.canonicalPath);
                        document.getElementById('interactive-calculators')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-amber-300 cursor-pointer flex items-center gap-1"
                    >
                      <GitCompare className="h-3 w-3 text-slate-500" />
                      <span>{i === 3 ? '└──' : '├──'} {cmp.slug}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. /resources/ */}
            <div className="space-y-1">
              <div
                onClick={() => toggleFolder('resources')}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer select-none font-bold"
              >
                {expandedFolders['resources'] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                {expandedFolders['resources'] ? <FolderOpen className="h-3.5 w-3.5 text-slate-400" /> : <Folder className="h-3.5 w-3.5 text-slate-400" />}
                <span>└── resources/</span>
                <span className="text-[11px] text-slate-500 font-normal">({RESOURCES_DATA.length} datasets & cheatsheets)</span>
              </div>

              {expandedFolders['resources'] && (
                <div className="pl-6 space-y-1 border-l border-white/10 ml-2 mt-1 text-[11px]">
                  {RESOURCES_DATA.map((res, i) => (
                    <div key={res.id} className="text-slate-400 flex items-center gap-1">
                      <FileText className="h-3 w-3 text-slate-500" />
                      <span>{i === RESOURCES_DATA.length - 1 ? '└──' : '├──'} {res.slug} ({res.format})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
