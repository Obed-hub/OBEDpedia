/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PillarType, ToolItem, InfoGuideItem, SoftwareItem, CountryItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveCalculatorsSuite } from './components/LiveCalculatorsSuite';
import { LiveToolWorkbench } from './components/LiveToolWorkbench';
import { SiteTreeExplorer } from './components/SiteTreeExplorer';
import { DirectoryExplorer } from './components/DirectoryExplorer';
import { TaxonomyExplorer } from './components/TaxonomyExplorer';
import { FeaturedCollections } from './components/FeaturedCollections';
import { TopicalSiloArchitecture } from './components/TopicalSiloArchitecture';
import { DetailDrawer } from './components/DetailDrawer';
import { CommandPalette } from './components/CommandPalette';
import { SchemaInspectorModal } from './components/SchemaInspectorModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activePillar, setActivePillar] = useState<PillarType>('tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    item: ToolItem | InfoGuideItem | SoftwareItem | CountryItem | null;
    type: PillarType | null;
  }>({ item: null, type: null });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  // Global key listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (
    query: string,
    pillar: PillarType | 'all',
    countryCode = 'all',
    tags: string[] = []
  ) => {
    setSearchQuery(query);
    if (pillar !== 'all') {
      setActivePillar(pillar);
    }
    setSelectedCountryCode(countryCode);
    if (tags.length > 0) {
      setSelectedTags(tags);
    }
  };

  const handleSelectItem = (
    item: ToolItem | InfoGuideItem | SoftwareItem | CountryItem,
    type: PillarType
  ) => {
    setSelectedItem({ item, type });
  };

  const handleCloseDrawer = () => {
    setSelectedItem({ item: null, type: null });
  };

  const handleTagClickFromDrawer = (tagName: string) => {
    setSelectedTags([tagName]);
    setSelectedItem({ item: null, type: null });
    document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Navigation (Strict 3-Zone Contract) */}
      <Navbar
        activePillar={activePillar}
        onSelectPillar={(pillar) => setActivePillar(pillar)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Inverted Index Search Engine */}
        <Hero
          onSearchSubmit={handleSearchSubmit}
          onSelectItem={handleSelectItem}
          onSelectPillar={(pillar) => setActivePillar(pillar)}
        />

        {/* Live Runnable Calculators Suite (/tools/calculators/bmi-calculator, percentage-calculator, age-calculator, and /compare/) */}
        <LiveCalculatorsSuite />

        {/* Live Interactive Developer & SEO Workbench */}
        <LiveToolWorkbench />

        {/* Interactive URL Route Tree & Root Directory Visualizer */}
        <SiteTreeExplorer onSelectItem={handleSelectItem} />

        {/* Directory Explorer with Multi-Facet Category & Tag Filters */}
        <DirectoryExplorer
          activePillar={activePillar}
          onSelectPillar={(pillar) => setActivePillar(pillar)}
          onSelectItem={handleSelectItem}
          initialSearchQuery={searchQuery}
          initialCountryCode={selectedCountryCode}
          initialTags={selectedTags}
        />

        {/* Comprehensive Multi-Tier Category & Tagging System Explorer */}
        <TaxonomyExplorer
          onSelectItem={handleSelectItem}
          onSelectPillar={(pillar) => setActivePillar(pillar)}
          onFilterByTag={(tag) => {
            setSelectedTags([tag]);
            document.getElementById('directory-explorer')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Curated Bento Grid Showcase */}
        <FeaturedCollections
          onSelectItem={handleSelectItem}
          onSelectPillar={(pillar) => setActivePillar(pillar)}
        />

        {/* Programmatic SEO Silo Architecture & Schema Graph Visualizer */}
        <TopicalSiloArchitecture />
      </main>

      {/* Footer with Comprehensive Internal Link Silos */}
      <Footer
        onSelectPillar={(pillar) => setActivePillar(pillar)}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
      />

      {/* Detail Slide-Over Drawer */}
      <DetailDrawer
        item={selectedItem.item}
        type={selectedItem.type}
        onClose={handleCloseDrawer}
        onNavigateItem={handleSelectItem}
        onTagClick={handleTagClickFromDrawer}
      />

      {/* Cmd+K Search Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectItem={handleSelectItem}
      />

      {/* Schema.org Global JSON-LD Inspector Modal */}
      <SchemaInspectorModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
    </div>
  );
}
