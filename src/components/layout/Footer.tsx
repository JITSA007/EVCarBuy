import React from 'react';
import { Zap, ShieldCheck, Github, ExternalLink, RefreshCw, Layers, Building2, Gauge, Calculator } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-300">
      {/* Top Banner: Bharat EV Portal Intel */}
      <div className="border-b border-orange-500/20 bg-slate-900/60 px-4 py-4 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-bold text-white">Bharat EV Data Intelligence:</span>
            <span className="text-slate-300">30+ Verified electric cars, MG Tomahawk EV, state-wise subsidies &amp; authentic ARAI vs real-world range.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('subsidies')}
              className="inline-flex items-center gap-1.5 font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4"
            >
              Explore 0% State Road Tax Waivers
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 text-white shadow-md shadow-orange-500/25">
                <Zap className="h-4 w-4 fill-white stroke-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                EVClub<span className="text-orange-500">India</span>
              </span>
              <span className="rounded bg-gradient-to-r from-orange-500 via-white to-emerald-600 px-1.5 py-0.5 text-[9px] font-black text-slate-950 shadow-sm shadow-orange-500/30">
                BHARAT
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              India&apos;s premier electric car club, buyer&apos;s advisory, and real-world benchmarking portal.
              Grounded in verified ARAI testing, Indian state EV subsidies, salary affordability calculations, and real-world highway range.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-white font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-orange-400" />
                <span>ARAI &amp; Bharat NCAP Grounded</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-slate-200">
                <RefreshCw className="h-3 w-3 text-emerald-400" />
                <span>2026 Master Directory</span>
              </div>
            </div>
          </div>

          {/* Col 2: Popular EV Cars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trending EV Cars</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {['MG Tomahawk EV', 'Tata Nexon EV', 'MG Windsor EV', 'Tata Curvv EV', 'Maruti e Vitara', 'Mahindra Thar.e', 'Tesla Model Y', 'BYD Seal'].map(name => (
                <li key={name}>
                  <button
                    onClick={() => {
                      onNavigate('cars');
                    }}
                    className="text-slate-300 hover:text-orange-400 transition-colors text-left font-medium"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Comparison & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Interactive EV Tools</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('salarycalc')} className="text-orange-400 hover:text-orange-300 transition-colors font-bold flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-orange-400" />
                  Salary Affordability Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subsidies')} className="text-slate-300 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-orange-400" />
                  State Subsidies &amp; RTO
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rangesim')} className="text-slate-300 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-orange-400" />
                  Real-World Range Sim
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="text-slate-300 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-orange-400" />
                  TCO &amp; Fuel Savings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="text-slate-300 hover:text-orange-400 transition-colors font-medium flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-orange-400" />
                  4-Way EV Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: State EV Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">0% Road Tax States</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {['Delhi (100% Tax Waiver)', 'Maharashtra (Zero Cess)', 'Uttar Pradesh (Extended 2027)', 'Tamil Nadu (Zero Tax)', 'Telangana (100% Exemption)', 'Karnataka (4% Slab)'].map(item => (
                <li key={item}>
                  <button onClick={() => onNavigate('subsidies')} className="text-slate-400 hover:text-orange-400 transition-colors text-left text-xs font-medium">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong className="text-white">EVClubIndia</strong>. The intelligent EV car club &amp; buying guide for India.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">All prices in Indian Lakhs (INR). Ex-showroom + State RTO guidelines.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
