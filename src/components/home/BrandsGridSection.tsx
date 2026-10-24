import React from 'react';
import { Manufacturer } from '../../types/ev';
import { Building2, ArrowRight } from 'lucide-react';

interface BrandsGridSectionProps {
  manufacturers: Manufacturer[];
  onSelectBrand: (brandSlug: string) => void;
}

export const BrandsGridSection: React.FC<BrandsGridSectionProps> = ({
  manufacturers,
  onSelectBrand
}) => {
  return (
    <section className="py-16 border-b border-slate-800/80 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Building2 className="h-3.5 w-3.5" />
              <span>Manufacturers</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Leading EV Brands in India
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Explore electric portfolios from domestic champions and global electric leaders.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {manufacturers.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(brand.slug)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-left transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {brand.name}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    {brand.evMarketSharePercent}% Share
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Origin: {brand.country}</p>
                <p className="mt-3 text-xs font-semibold text-emerald-400">
                  Starts at ₹{brand.startingPriceLakh} Lakh
                </p>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                  {brand.popularModels.join(', ')}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-bold text-slate-400 group-hover:text-emerald-400">
                <span>{brand.totalModels} EV Models</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
