"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentGatewayChrome } from "@/components/PaymentGatewayChrome";

export default function MsisdnPage() {
  const router = useRouter();
  const [msisdn, setMsisdn] = useState("");
  const [error, setError] = useState<string | null>(null);

  function normalizeMsisdn(raw: string): string {
    return raw.replace(/\D/g, "");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const digits = normalizeMsisdn(msisdn);
    if (digits.length < 8 || digits.length > 15) {
      setError("Enter a valid mobile number (8–15 digits).");
      return;
    }
    setError(null);
    router.push(`/pin?msisdn=${encodeURIComponent(digits)}`);
  }

  return (
    <PaymentGatewayChrome step={1}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="rounded-2xl border border-white/10 bg-gateway-slate/60 p-6 shadow-card backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Mobile subscriber
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Charges will be applied to this MSISDN via your operator wallet.
              </p>
            </div>
            <span className="shrink-0 rounded-md border border-gateway-gold/30 bg-gateway-gold/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gateway-gold">
              Direct billing
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="msisdn" className="mb-2 block text-sm font-medium text-slate-300">
                MSISDN
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-500">
                  +
                </span>
                <input
                  id="msisdn"
                  name="msisdn"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="20 1XX XXX XXXX"
                  value={msisdn}
                  onChange={(ev) => {
                    setMsisdn(ev.target.value);
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 pl-8 pr-4 font-mono text-lg tracking-wide text-white outline-none ring-gateway-accent/40 transition placeholder:text-slate-600 focus:border-gateway-accent/50 focus:ring-2"
                />
              </div>
              {error ? (
                <p className="mt-2 text-sm text-amber-400" role="alert">
                  {error}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">Country code optional; digits only are stored.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-gateway-accent to-emerald-600 py-3.5 text-sm font-semibold text-gateway-navy shadow-lg shadow-gateway-accent/25 transition hover:brightness-110 active:scale-[0.99]"
            >
              Continue to secure PIN
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-500/80" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Encrypted session
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-500/80" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              PIN required
            </span>
          </div>
        </div>
      </div>
    </PaymentGatewayChrome>
  );
}
