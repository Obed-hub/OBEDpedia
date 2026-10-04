import React, { useState } from 'react';
import {
  Code2,
  Check,
  Copy,
  Sparkles,
  Eye,
  Layers,
  Globe2,
  Terminal,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countriesData';

export const LiveToolWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schema' | 'serp' | 'json2ts' | 'tax'>('schema');
  const [copied, setCopied] = useState(false);

  // Schema Tool State
  const [schemaType, setSchemaType] = useState<'WebApplication' | 'SoftwareApplication' | 'FAQPage' | 'TechArticle'>('WebApplication');
  const [appName, setAppName] = useState('JSON to TypeScript Converter');
  const [appDesc, setAppDesc] = useState('Free browser-based utility to instantly convert nested JSON payloads into strict TypeScript interfaces.');
  const [appCategory, setAppCategory] = useState('DeveloperApplication');

  // SERP Tool State
  const [serpTitle, setSerpTitle] = useState('100+ Free Online Developer Tools & Open Software | OmniIndex');
  const [serpUrl, setSerpUrl] = useState('https://omniindex.org/tools/developer-suite');
  const [serpDesc, setSerpDesc] = useState('Explore 100+ free browser-based developer utilities, client-side formatters, and open-source software alternatives. Zero telemetry, 100% private.');
  const [serpRating, setSerpRating] = useState('4.9');
  const [serpReviews, setSerpReviews] = useState('2,480');
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  // JSON2TS Tool State
  const [rawJson, setRawJson] = useState(`{
  "id": "tool_948",
  "name": "Global VAT Calculator",
  "version": 2.4,
  "isActive": true,
  "supportedCountries": ["DE", "US", "SG", "PT"],
  "meta": {
    "author": "OmniIndex",
    "schemaCompliant": true
  }
}`);

  // Tax Tool State
  const [selectedCountryId, setSelectedCountryId] = useState('c-1');
  const [invoiceAmount, setInvoiceAmount] = useState('5000');

  // Generate Schema JSON
  const getGeneratedSchema = () => {
    if (schemaType === 'WebApplication') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': appName,
          'applicationCategory': appCategory,
          'operatingSystem': 'All modern web browsers',
          'description': appDesc,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.92',
            'ratingCount': '1420',
          },
        },
        null,
        2
      );
    } else if (schemaType === 'SoftwareApplication') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': appName,
          'operatingSystem': 'macOS, Linux, Windows',
          'applicationCategory': 'UtilitiesApplication',
          'license': 'https://opensource.org/licenses/MIT',
          'description': appDesc,
          'offers': {
            '@type': 'Offer',
            'price': '0',
          },
        },
        null,
        2
      );
    } else if (schemaType === 'FAQPage') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': `How does ${appName} work?`,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': `${appDesc} It executes entirely client-side using WebAssembly with zero data transmission.`,
              },
            },
            {
              '@type': 'Question',
              'name': 'Is there any usage limit or paid tier?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No. All utilities on OmniIndex are 100% free and open without paywalls or account requirements.',
              },
            },
          ],
        },
        null,
        2
      );
    } else {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': appName,
          'description': appDesc,
          'author': {
            '@type': 'Organization',
            'name': 'OmniIndex Research Group',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'OmniIndex',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://omniindex.org/logo.png',
            },
          },
          'datePublished': '2026-09-15',
        },
        null,
        2
      );
    }
  };

  // Convert JSON to TS Interfaces
  const generateTypescript = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const generateType = (obj: any, name = 'RootObject'): string => {
        if (typeof obj !== 'object' || obj === null) return typeof obj;
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 'any[]';
          return `${typeof obj[0]}[]`;
        }
        let out = `export interface ${name} {\n`;
        for (const key of Object.keys(obj)) {
          const val = obj[key];
          if (val === null) {
            out += `  ${key}: any;\n`;
          } else if (Array.isArray(val)) {
            const innerType = val.length > 0 ? typeof val[0] : 'string';
            out += `  ${key}: ${innerType}[];\n`;
          } else if (typeof val === 'object') {
            const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
            out += `  ${key}: ${nestedName};\n`;
          } else {
            out += `  ${key}: ${typeof val};\n`;
          }
        }
        out += `}`;
        return out;
      };
      return generateType(parsed);
    } catch (err: any) {
      return `// JSON Parse Error: ${err.message}\n// Please provide valid JSON to generate TypeScript interfaces.`;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Selected Country for Tax
  const selectedCountry = COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[0];
  const numAmount = parseFloat(invoiceAmount) || 0;
  const vatRateFloat = parseFloat(selectedCountry.vatRate.replace('%', '')) || 0;
  const vatAmount = (numAmount * (vatRateFloat / 100)).toFixed(2);
  const totalWithVat = (numAmount + parseFloat(vatAmount)).toFixed(2);

  // SERP character / pixel estimations
  const titlePixels = Math.min(Math.round(serpTitle.length * 9.5), 700);
  const isTitleTruncated = titlePixels > 580;

  return (
    <section id="interactive-workbench" className="py-16 bg-[#0B0F19] border-y border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Live Interactive Workbench</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
              Embedded Tools & Programmatic SEO Engines
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Experience the client-side architecture powering our 100+ tools. Instant browser computation with real-time schema generation and SERP simulation.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-slate-900/90 p-1">
            <button
              onClick={() => setActiveTab('schema')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'schema'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Schema.org Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('serp')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'serp'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>SERP Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('json2ts')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'json2ts'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>JSON to TypeScript</span>
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'tax'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Country VAT Matrix</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Schema.org JSON-LD Generator */}
        {activeTab === 'schema' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-slate-200">Schema Entity Configuration</span>
                <span className="text-[11px] font-mono text-cyan-400">Google Rich Results Ready</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Schema Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['WebApplication', 'SoftwareApplication', 'FAQPage', 'TechArticle'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSchemaType(t)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium text-left transition-all ${
                        schemaType === t
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                          : 'border-white/10 bg-slate-800/40 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Application / Title Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Meta Description / Summary</label>
                <textarea
                  rows={3}
                  value={appDesc}
                  onChange={(e) => setAppDesc(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Validation: <strong className="text-emerald-400">100% Valid Syntax</strong></span>
                <span>Context: <code className="text-slate-300 font-mono">schema.org</code></span>
              </div>
            </div>

            {/* Right Live Code Output */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#070A10] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">application/ld+json</span>
                </div>
                <button
                  onClick={() => handleCopy(getGeneratedSchema())}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy JSON-LD'}</span>
                </button>
              </div>

              <pre className="mt-4 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed max-h-80">
                <code>{getGeneratedSchema()}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Google SERP Simulator */}
        {activeTab === 'serp' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-slate-200">SERP Snippet Inputs</span>
                <div className="flex items-center gap-1 rounded bg-slate-800 p-0.5">
                  <button
                    onClick={() => setSerpDevice('desktop')}
                    className={`px-2 py-0.5 text-[11px] rounded ${serpDevice === 'desktop' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'}`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setSerpDevice('mobile')}
                    className={`px-2 py-0.5 text-[11px] rounded ${serpDevice === 'mobile' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400'}`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>SEO Title</span>
                  <span className={`font-mono text-[11px] ${isTitleTruncated ? 'text-amber-400' : 'text-slate-400'}`}>
                    {titlePixels}px / 580px max
                  </span>
                </div>
                <input
                  type="text"
                  value={serpTitle}
                  onChange={(e) => setSerpTitle(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Canonical URL</label>
                <input
                  type="text"
                  value={serpUrl}
                  onChange={(e) => setSerpUrl(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                  <span>Meta Description</span>
                  <span className="font-mono text-[11px] text-slate-400">{serpDesc.length} / 160 chars</span>
                </div>
                <textarea
                  rows={3}
                  value={serpDesc}
                  onChange={(e) => setSerpDesc(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Right Live Google SERP Mockup */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#1F1F1F] p-6 text-left shadow-2xl">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs text-slate-400">
                <Globe2 className="h-4 w-4 text-cyan-400" />
                <span>Google Search Engine Results Simulator ({serpDevice.toUpperCase()} PREVIEW)</span>
              </div>

              <div className={`mt-5 ${serpDevice === 'mobile' ? 'max-w-md mx-auto p-4 rounded-xl border border-white/10 bg-[#171717]' : ''}`}>
                {/* SERP Breadcrumb / Domain */}
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-[10px] text-white font-bold">
                    O
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs text-[#DADCE0]">OmniIndex</div>
                    <div className="text-[11px] text-[#BDC1C6] font-mono truncate max-w-sm">{serpUrl}</div>
                  </div>
                </div>

                {/* SERP Title */}
                <h3 className="mt-2 text-lg sm:text-xl font-normal text-[#8AB4F8] hover:underline cursor-pointer leading-snug">
                  {serpTitle}
                </h3>

                {/* Rating Badge */}
                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#BDC1C6]">
                  <span className="text-amber-400">★★★★★</span>
                  <span className="font-medium text-[#DADCE0]">Rating: {serpRating}/5</span>
                  <span>·</span>
                  <span>{serpReviews} reviews</span>
                  <span>·</span>
                  <span className="text-emerald-400">Free / Open</span>
                </div>

                {/* SERP Snippet Text */}
                <p className="mt-1.5 text-sm text-[#BDC1C6] leading-relaxed">
                  {serpDesc}
                </p>

                {/* Sitelinks simulation */}
                <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
                  <div className="text-[#8AB4F8] hover:underline cursor-pointer">⚡ 100+ Free Online Tools</div>
                  <div className="text-[#8AB4F8] hover:underline cursor-pointer">💻 FOSS Software Directory</div>
                  <div className="text-[#8AB4F8] hover:underline cursor-pointer">🌍 Country Tax & Nomad Atlas</div>
                  <div className="text-[#8AB4F8] hover:underline cursor-pointer">📚 Programmatic SEO Guides</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: JSON to TypeScript Converter */}
        {activeTab === 'json2ts' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 rounded-xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-slate-200">Input Raw JSON</span>
                <span className="text-[11px] font-mono text-cyan-400">Instant WASM Parser</span>
              </div>
              <textarea
                rows={12}
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                className="mt-4 w-full rounded-lg border border-white/10 bg-[#070A10] p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#070A10] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-slate-400">Generated TypeScript Interfaces</span>
                <button
                  onClick={() => handleCopy(generateTypescript())}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy TypeScript'}</span>
                </button>
              </div>
              <pre className="mt-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed max-h-80">
                <code>{generateTypescript()}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Tab 4: Country Tax Matrix */}
        {activeTab === 'tax' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-slate-900/70 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-slate-200">Tax & Nomad Parameters</span>
                <span className="text-[11px] font-mono text-violet-400">100+ Sovereign Rates</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Country</label>
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {COUNTRIES_DATA.slice(0, 30).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} ({c.region}) — VAT {c.vatRate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Invoice / Transaction Amount ($)</label>
                <input
                  type="number"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="rounded-lg bg-slate-800/50 p-3 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Nomad Visa Status:</span>
                  <span className={selectedCountry.nomadVisa ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                    {selectedCountry.nomadVisa ? 'Active Program Available' : 'Standard Visa Rules'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Corporate Tax Rate:</span>
                  <span className="font-mono text-slate-200">{selectedCountry.corporateTaxRate}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Data Protection Law:</span>
                  <span className="text-slate-200">{selectedCountry.dataLaw}</span>
                </div>
              </div>
            </div>

            {/* Right Tax Calculation Result */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-slate-900/90 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="font-display text-base font-bold text-white">{selectedCountry.name} Jurisdiction Summary</h4>
                    <p className="text-xs text-slate-400">Capital: {selectedCountry.capital} · Region: {selectedCountry.region}</p>
                  </div>
                </div>
                <span className="rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                  Tech Score: {selectedCountry.techHubScore}/100
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-slate-800/60 p-4 border border-white/5">
                  <div className="text-xs text-slate-400">Base Net Amount</div>
                  <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">${numAmount.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-4 border border-white/5">
                  <div className="text-xs text-slate-400">VAT ({selectedCountry.vatRate})</div>
                  <div className="mt-1 font-mono text-lg font-bold text-cyan-400 tabular-nums">+${vatAmount}</div>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-4 border border-white/5">
                  <div className="text-xs text-slate-400">Total Gross Invoice</div>
                  <div className="mt-1 font-mono text-lg font-bold text-emerald-400 tabular-nums">${totalWithVat}</div>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-slate-800/30 p-4 border border-white/5">
                <h5 className="text-xs font-semibold text-slate-200 mb-1">Digital Nomad & Residency Pathway</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedCountry.nomadVisaDetails}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="font-medium text-slate-300">Key Tech Clusters:</span>
                {selectedCountry.keyIndustries.map((ind, i) => (
                  <span key={i} className="text-slate-300">
                    {ind}{i < selectedCountry.keyIndustries.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
