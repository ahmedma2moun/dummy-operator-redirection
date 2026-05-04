"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentGatewayChrome } from "@/components/PaymentGatewayChrome";

function randomHex(byteLength: number): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function PinForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const msisdn = searchParams.get("msisdn") ?? "";
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const displayMsisdn = msisdn.length > 0 ? `+${msisdn}` : "—";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\d{8,15}$/.test(msisdn)) {
      setError("Invalid session. Go back and enter your MSISDN.");
      return;
    }
    if (pin.length < 4 || pin.length > 8 || !/^\d+$/.test(pin)) {
      setError("Enter a numeric PIN between 4 and 8 digits.");
      return;
    }
    setError(null);

    const params = new URLSearchParams({
      signature: randomHex(32),
      operationStatusCode: "0",
      subscriptionContractId: "8743291056123",
      errorMessage: "",
      responseCode: "00",
      paymentStatus: "SUCCESS",
    });

    router.push(`/success?${params.toString()}`);
  }

  if (!msisdn) {
    return (
      <PaymentGatewayChrome step={2}>
        <div className="flex flex-1 flex-col justify-center">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/30 p-6 text-center shadow-card">
            <p className="text-amber-200">No subscriber number in session.</p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-4 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              Start over
            </button>
          </div>
        </div>
      </PaymentGatewayChrome>
    );
  }

  return (
    <PaymentGatewayChrome step={2}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="rounded-2xl border border-white/10 bg-gateway-slate/60 p-6 shadow-card backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Authenticate</h1>
            <p className="mt-1 text-sm text-slate-400">Enter your operator billing PIN to authorize this payment.</p>
          </div>

          <div className="mb-6 rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Paying from</p>
            <p className="mt-1 font-mono text-lg text-white">{displayMsisdn}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="pin" className="mb-2 block text-sm font-medium text-slate-300">
                Billing PIN
              </label>
              <input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={8}
                placeholder="••••"
                value={pin}
                onChange={(ev) => {
                  setPin(ev.target.value.replace(/\D/g, ""));
                  setError(null);
                }}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-3.5 px-4 text-center font-mono text-2xl tracking-[0.5em] text-white outline-none ring-gateway-accent/40 transition placeholder:text-slate-600 focus:border-gateway-accent/50 focus:ring-2"
              />
              {error ? (
                <p className="mt-2 text-sm text-amber-400" role="alert">
                  {error}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">Dummy flow — any valid-length PIN completes payment.</p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-gateway-accent to-emerald-600 py-3.5 text-sm font-semibold text-gateway-navy shadow-lg shadow-gateway-accent/25 transition hover:brightness-110 active:scale-[0.99]"
              >
                Authorize payment
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-xl border border-white/15 bg-transparent py-3.5 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Change number
              </button>
            </div>
          </form>
        </div>
      </div>
    </PaymentGatewayChrome>
  );
}

export default function PinPage() {
  return (
    <Suspense
      fallback={
        <PaymentGatewayChrome step={2}>
          <div className="flex flex-1 items-center justify-center py-24 text-slate-400">Loading…</div>
        </PaymentGatewayChrome>
      }
    >
      <PinForm />
    </Suspense>
  );
}
