import React, { useState } from 'react';
import { Search, X, ExternalLink, Globe, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { searchLiveEvGrounding } from '../../services/liveEvService';
import { LiveSearchResult } from '../../types/ev';

interface LiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const LiveSearchModal: React.FC<LiveSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LiveSearchResult | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await searchLiveEvGrounding(query.trim());
      setResult(res);
    } catch {
      // Handled in service
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    'MG Windsor EV BaaS battery rental pricing in India',
    'Tata Curvv EV 55 vs Nexon EV 45 real highway range',
    'Mahindra BE 6e booking status and delivery timeline',
    'Which Indian states have 100% EV road tax waiver in 2025-2026?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl flex flex-col max-h-[85vh] dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Live Indian EV Intelligence</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Grounded via Google Search with real-time automotive sources</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="p-6 border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about Indian EVs (pricing, battery, real range, subsidies)..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-28 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:placeholder-slate-400"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Syncing
                </>
              ) : (
                <>
                  Search
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Quick Query Suggestions */}
          {!result && !loading && (
            <div className="mt-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Try asking:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {sampleQueries.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setQuery(sample);
                    }}
                    className="text-left rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:border-amber-500 hover:text-amber-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-amber-500/50 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500 mb-3" />
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Grounded Search in Progress...</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Querying latest Indian automotive manufacturer circulars, RTO notifications, and press releases.
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Answer Content */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Verified Web Search Grounding
                  </span>
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {result.answer}
                </div>
              </div>

              {/* Source Attribution Cards */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Live Grounding Sources ({result.sources.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {result.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-start justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-amber-500 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-amber-500/40 dark:hover:bg-slate-850 transition-all shadow-xs"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-900 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {src.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {src.uri.replace(/^https?:\/\//, '')}
                          </p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5 group-hover:text-amber-500 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>Real-time data powered by Google Search Grounding</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
