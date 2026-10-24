import React from 'react';
import { ShieldCheck, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { DataConfidence } from '../../types/ev';

interface TrustBadgeProps {
  source: string;
  verifiedDate: string;
  confidence: DataConfidence;
  isDemoData?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  source,
  verifiedDate,
  confidence,
  isDemoData = false
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span className="font-semibold text-slate-200">Source:</span>
        <span className="text-slate-300 truncate max-w-[200px]" title={source}>
          {source}
        </span>
      </div>

      <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-400">
        <Calendar className="h-3 w-3 text-slate-400" />
        <span>Verified: {verifiedDate}</span>
      </div>

      <div
        className={`flex items-center gap-1 rounded-lg px-2 py-0.5 font-semibold text-[11px] border ${
          confidence === 'Verified' || confidence === 'High'
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
        }`}
      >
        <CheckCircle2 className="h-3 w-3" />
        <span>{confidence}</span>
      </div>

      {isDemoData && (
        <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
          Demo Dataset
        </span>
      )}
    </div>
  );
};
