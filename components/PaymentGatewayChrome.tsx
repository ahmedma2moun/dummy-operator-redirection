import type { ReactNode } from "react";

type Step = 1 | 2 | 3;

const stepLabels: Record<Step, string> = {
  1: "Subscriber",
  2: "Authentication",
  3: "Confirmation",
};

export function PaymentGatewayChrome({
  step,
  children,
}: {
  step: Step;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-gateway-navy/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gateway-accent to-gateway-accentDim shadow-lg shadow-gateway-accent/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gateway-accent">
                Operator Pay
              </p>
              <p className="text-sm font-semibold text-white">Secure payment</p>
            </div>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            TLS 1.3
          </div>
        </div>
        <div className="mx-auto max-w-lg px-4 pb-4 sm:px-6">
          <ol className="flex items-center justify-between gap-2">
            {([1, 2, 3] as const).map((s) => (
              <li key={s} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    s === step
                      ? "bg-gateway-accent text-gateway-navy ring-2 ring-gateway-accent/40 ring-offset-2 ring-offset-gateway-navy"
                      : s < step
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "border border-white/15 bg-white/5 text-slate-500"
                  }`}
                >
                  {s < step ? "✓" : s}
                </span>
                <span
                  className={`hidden text-center text-[10px] font-medium uppercase tracking-wide sm:block ${
                    s === step ? "text-gateway-accent" : "text-slate-500"
                  }`}
                >
                  {stepLabels[s]}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gateway-accent to-emerald-400 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-8 sm:px-6">{children}</main>

      <footer className="border-t border-white/10 bg-black/20 py-6 text-center text-xs text-slate-500">
        <p className="mb-1 font-medium text-slate-400">PCI-DSS aligned processing environment (demo)</p>
        <p>© {new Date().getFullYear()} Operator Pay Gateway · POC only</p>
      </footer>
    </div>
  );
}
