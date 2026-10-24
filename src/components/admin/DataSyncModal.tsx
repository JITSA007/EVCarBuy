import React, { useState } from 'react';
import { Vehicle, SyncAuditEntry } from '../../types/ev';
import { vehicleDataProvider } from '../../services/dataProvider';
import { ShieldCheck, RefreshCw, X, CheckCircle2, History, Database, AlertCircle } from 'lucide-react';

interface DataSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onDataUpdated: () => void;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onDataUpdated
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0]?.id || '');
  const [newStartingPrice, setNewStartingPrice] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<SyncAuditEntry[]>(() => vehicleDataProvider.getSyncLogs());
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(newStartingPrice);
    if (!priceNum || isNaN(priceNum)) return;

    const targetVehicle = vehicles.find(v => v.id === selectedVehicleId);
    const variantId = targetVehicle?.variants[0]?.id || 'base';

    await vehicleDataProvider.updateVehiclePrice(selectedVehicleId, variantId, priceNum, 'Admin manual calibration');
    setAuditLogs(vehicleDataProvider.getSyncLogs());
    setSyncMessage(`Successfully updated vehicle price to ₹${priceNum} Lakh!`);
    onDataUpdated();
    setNewStartingPrice('');
    setTimeout(() => setSyncMessage(null), 3000);
  };

  const handleTriggerReverification = async () => {
    await vehicleDataProvider.triggerManualSync('Admin Portal Telemetry Engine');
    const freshLogs = vehicleDataProvider.getSyncLogs();
    setAuditLogs(freshLogs);
    setSyncMessage('All vehicle telemetry & ARAI certificates re-verified.');
    setTimeout(() => setSyncMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Data Freshness &amp; Audit Logs</h3>
              <p className="text-[11px] text-slate-400">Vehicle spec integrity &amp; manual price management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            Specifications and pricing are based on official OEM releases, ARAI homologation test certificates, and published state EV road-tax policies.
          </span>
        </div>

        {/* Admin Quick Price Override */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Manual Price Correction (Admin / Local Override)
          </h4>
          <form onSubmit={handleUpdatePrice} className="mt-3 space-y-3">
            <div>
              <label className="text-xs text-slate-400">Select Vehicle</label>
              <select
                value={selectedVehicleId}
                onChange={e => setSelectedVehicleId(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white"
              >
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.brand} {v.name} (Current: ₹{v.startingPriceLakh}L)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="New Starting Price (in Lakh)"
                value={newStartingPrice}
                onChange={e => setNewStartingPrice(e.target.value)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
              >
                Apply Update
              </button>
            </div>
          </form>

          {syncMessage && (
            <p className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {syncMessage}
            </p>
          )}
        </div>

        {/* Audit Logs */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-slate-400" />
              Audit Trail &amp; Verification History
            </span>
            <button
              onClick={handleTriggerReverification}
              className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              Re-check Logs
            </button>
          </div>

          <div className="mt-3 max-h-48 overflow-y-auto space-y-2 pr-1">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 text-xs text-slate-300"
              >
                <div className="flex justify-between font-semibold">
                  <span className="text-white">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp.slice(0, 10)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
