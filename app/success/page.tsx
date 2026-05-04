import Link from "next/link";
import { PaymentGatewayChrome } from "@/components/PaymentGatewayChrome";

type SuccessSearchParams = {
  signature?: string;
  operationStatusCode?: string;
  subscriptionContractId?: string;
  errorMessage?: string;
  responseCode?: string;
  paymentStatus?: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/5 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
      <span className="break-all font-mono text-sm text-slate-100 sm:text-right sm:max-w-[60%]">{value}</span>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<SuccessSearchParams>;
}) {
  const p = await searchParams;
  const signature = p.signature ?? "—";
  const operationStatusCode = p.operationStatusCode ?? "—";
  const subscriptionContractId = p.subscriptionContractId ?? "—";
  const errorMessage = p.errorMessage === "" || p.errorMessage === undefined ? "(empty)" : p.errorMessage;
  const responseCode = p.responseCode ?? "—";
  const paymentStatus = p.paymentStatus ?? "—";

  const isSuccess =
    paymentStatus.toUpperCase() === "SUCCESS" && (operationStatusCode === "0" || responseCode === "00");

  return (
    <PaymentGatewayChrome step={3}>
      <div className="flex flex-1 flex-col justify-center">
        <div className="rounded-2xl border border-white/10 bg-gateway-slate/60 p-6 shadow-card backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                isSuccess
                  ? "bg-emerald-500/20 ring-2 ring-emerald-400/50"
                  : "bg-amber-500/20 ring-2 ring-amber-400/50"
              }`}
            >
              {isSuccess ? (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {isSuccess ? "Payment authorized" : "Result"}
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              Callback-style parameters are reflected below as query string values (dummy gateway).
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gateway-accent">Query parameters</p>
            <div className="divide-y divide-white/5">
              <Row label="signature" value={signature} />
              <Row label="operationStatusCode" value={operationStatusCode} />
              <Row label="subscriptionContractId" value={subscriptionContractId} />
              <Row label="errorMessage" value={errorMessage} />
              <Row label="responseCode" value={responseCode} />
              <Row label="paymentStatus" value={paymentStatus} />
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <p className="text-center text-[10px] uppercase tracking-widest text-slate-500">Merchant return URL would receive this payload</p>
          </div>

          <Link
            href="/"
            className="mt-6 flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            New payment
          </Link>
        </div>
      </div>
    </PaymentGatewayChrome>
  );
}
