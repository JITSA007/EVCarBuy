import React, { useState } from 'react';
import { Vehicle } from '../../types/ev';
import { Bell, X, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

interface PriceAlertModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onAlertCreated?: (msg: string) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onAlertCreated
}) => {
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [contactType, setContactType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue) return;

    setSubmitted(true);
    setTimeout(() => {
      onAlertCreated?.(`Price alert set for ${vehicle.name} at ₹${targetPrice || vehicle.startingPriceLakh} Lakh!`);
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Bell className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Track Price &amp; Offers</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-white">Price Alert Active!</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              We will notify you via {contactType} the moment {vehicle.name} receives a manufacturer price correction or festival discount.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
              <img
                src={vehicle.heroImage}
                alt={vehicle.name}
                className="h-12 w-16 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{vehicle.brand} {vehicle.name}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Current: ₹{vehicle.startingPriceLakh} – ₹{vehicle.endingPriceLakh} Lakh
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target Price (in Lakh)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={`e.g. ${(vehicle.startingPriceLakh * 0.95).toFixed(1)}`}
                value={targetPrice}
                onChange={e => setTargetPrice(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500"
              />
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Leave empty to be alerted on ANY price decrease or cashback offer.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Send Notifications Via
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setContactType('whatsapp')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-bold transition-all ${
                    contactType === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setContactType('email')}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-bold transition-all ${
                    contactType === 'email'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </button>
              </div>

              <input
                type={contactType === 'email' ? 'email' : 'tel'}
                required
                placeholder={contactType === 'email' ? 'your.name@example.com' : '+91 98765 43210'}
                value={contactValue}
                onChange={e => setContactValue(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Zero spam. Only official manufacturer price changes and verified subsidies.</span>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 transition-colors shadow-md"
            >
              Set Price Drop Alert
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
