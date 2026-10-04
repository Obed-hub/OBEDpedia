import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Zap, BookOpen, Layers, Globe2, Tag, ArrowRight } from 'lucide-react';
import { PillarType, ToolItem, InfoGuideItem, SoftwareItem, CountryItem } from '../types';
import { searchIndex } from '../services/searchIndex';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: any, type: PillarType) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'all'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedPillar('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!isOpen) return [];
    return searchIndex.search({
      query,
      pillar: selectedPillar,
      limit: 12,
    });
  }, [isOpen, query, selectedPillar]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 bg-black/80 backdrop-blur-md px-4 animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#090D16] shadow-2xl overflow-hidden divide-y divide-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-900/70">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search 400+ indexed tools, guides, software, tags & countries..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/40 text-xs overflow-x-auto">
          {(['all', 'tools', 'guides', 'software', 'countries'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPillar(p)}
              className={`rounded-lg px-2.5 py-1 font-medium capitalize transition-colors ${
                selectedPillar === p
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white'
              }`}
            >
              {p === 'all' ? 'All (400+)' : p}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-3 space-y-1.5 text-xs">
          {searchResults.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              No matching resources found for <span className="text-white font-semibold">"{query}"</span>.
            </div>
          ) : (
            searchResults.map(({ item }) => {
              const d = item.data as any;
              return (
                <div
                  key={d.id}
                  onClick={() => {
                    onSelectItem(d, item.itemType);
                    onClose();
                  }}
                  className="group flex items-center justify-between rounded-xl p-2.5 hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-cyan-500/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        item.itemType === 'tools'
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : item.itemType === 'guides'
                          ? 'bg-blue-500/10 text-blue-400'
                          : item.itemType === 'software'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-violet-500/10 text-violet-400'
                      }`}
                    >
                      {d.flag ? (
                        <span className="text-base">{d.flag}</span>
                      ) : item.itemType === 'tools' ? (
                        <Zap className="h-4 w-4" />
                      ) : item.itemType === 'guides' ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <Layers className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {d.title || d.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-sm sm:max-w-md">
                        {d.category || d.region} · {d.subCategory || d.executionMode || d.license || d.readTime || ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-mono font-medium ${
                        item.itemType === 'tools'
                          ? 'bg-cyan-500/15 text-cyan-300'
                          : item.itemType === 'guides'
                          ? 'bg-blue-500/15 text-blue-300'
                          : item.itemType === 'software'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-violet-500/15 text-violet-300'
                      }`}
                    >
                      {item.itemType.toUpperCase()}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-white/10 bg-slate-900/80 px-4 py-2 text-[11px] text-slate-400 flex justify-between items-center">
          <span>Inverted search index with instant token matching</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
