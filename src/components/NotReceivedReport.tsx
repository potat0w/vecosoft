"use client";

import { useId, useState } from "react";

const REASONS = [
  { id: "never-arrived", label: "Package never arrived" },
  { id: "wrong-address", label: "Delivered to wrong address" },
  { id: "stolen", label: "Package was stolen or missing" },
  { id: "other", label: "Something else" },
] as const;

type ReasonId = (typeof REASONS)[number]["id"];

type Step = "idle" | "reason" | "details" | "submitted";

type NotReceivedReportProps = {
  orderNumber: string;
  productName: string;
  estimatedDelivery: string;
};

function formatDeliveryDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function NotReceivedReport({
  orderNumber,
  productName,
  estimatedDelivery,
}: NotReceivedReportProps) {
  const titleId = useId();
  const [step, setStep] = useState<Step>("idle");
  const [reason, setReason] = useState<ReasonId | null>(null);
  const [notes, setNotes] = useState("");
  const [reportId, setReportId] = useState<string | null>(null);

  function startReport() {
    setStep("reason");
    setReason(null);
    setNotes("");
    setReportId(null);
  }

  function cancel() {
    setStep("idle");
    setReason(null);
    setNotes("");
  }

  function submit() {
    setReportId(`RPT-${orderNumber.replace(/\D/g, "")}-${Date.now().toString().slice(-4)}`);
    setStep("submitted");
  }

  if (step === "idle") {
    return (
      <div
        role="status"
        className="border-t border-rose-200 bg-rose-50 px-4 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 space-y-1.5">
            <p className="text-sm font-semibold text-rose-900 sm:text-base">
              Marked as delivered
            </p>
            <p className="text-sm leading-relaxed text-rose-800/90">
              The carrier marked this order delivered on{" "}
              <time dateTime={estimatedDelivery} className="font-medium text-rose-950">
                {formatDeliveryDate(estimatedDelivery)}
              </time>
              , but you can still report it if you never got it.
            </p>
          </div>

          <button
            type="button"
            onClick={startReport}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-rose-800 px-4 py-2.5 text-sm font-medium text-rose-50 transition-colors hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800 sm:self-center"
          >
            Didn&apos;t receive this
          </button>
        </div>
      </div>
    );
  }

  if (step === "submitted" && reportId) {
    return (
      <div
        role="status"
        className="border-t border-rose-200 bg-rose-50 px-4 py-4 sm:px-6 sm:py-5"
      >
        <p className="text-sm font-semibold text-rose-900 sm:text-base">
          Report submitted
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-rose-800/90">
          We opened case{" "}
          <span className="font-medium text-rose-950">{reportId}</span> for{" "}
          {productName} ({orderNumber}). Support will follow up shortly.
        </p>
        <button
          type="button"
          onClick={() => setStep("idle")}
          className="mt-4 text-sm font-medium text-rose-900 underline-offset-2 hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="border-t border-rose-200 bg-rose-50 px-4 py-4 sm:px-6 sm:py-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p id={titleId} className="text-sm font-semibold text-rose-900 sm:text-base">
            Report missing delivery
          </p>
          <p className="mt-0.5 text-xs text-rose-800/80 sm:text-sm">
            Order {orderNumber} · Step {step === "reason" ? "1" : "2"} of 2
          </p>
        </div>
        <button
          type="button"
          onClick={cancel}
          className="text-sm font-medium text-rose-800 underline-offset-2 hover:underline"
        >
          Cancel
        </button>
      </div>

      {step === "reason" && (
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm text-rose-900">
            What happened?
          </legend>
          {REASONS.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                reason === item.id
                  ? "border-rose-400 bg-white text-rose-950"
                  : "border-rose-200/80 bg-rose-50/50 text-rose-900 hover:border-rose-300"
              }`}
            >
              <input
                type="radio"
                name={`missing-reason-${orderNumber}`}
                value={item.id}
                checked={reason === item.id}
                onChange={() => setReason(item.id)}
                className="size-4 accent-rose-700"
              />
              {item.label}
            </label>
          ))}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={!reason}
              onClick={() => setStep("details")}
              className="inline-flex items-center justify-center rounded-xl bg-rose-800 px-4 py-2.5 text-sm font-medium text-rose-50 transition-colors hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </fieldset>
      )}

      {step === "details" && (
        <div className="space-y-3">
          <label className="block space-y-1.5">
            <span className="text-sm text-rose-900">
              Anything else we should know?{" "}
              <span className="text-rose-700/70">(optional)</span>
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Gate code, neighbors, porch location…"
              className="w-full resize-y rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
            />
          </label>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setStep("reason")}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-rose-900 ring-1 ring-inset ring-rose-300 transition-colors hover:bg-rose-100"
            >
              Back
            </button>
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center justify-center rounded-xl bg-rose-800 px-4 py-2.5 text-sm font-medium text-rose-50 transition-colors hover:bg-rose-900"
            >
              Submit report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
