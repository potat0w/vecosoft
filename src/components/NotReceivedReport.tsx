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
    setReportId(
      `RPT-${orderNumber.replace(/\D/g, "")}-${Date.now().toString().slice(-4)}`,
    );
    setStep("submitted");
  }

  if (step === "idle") {
    return (
      <div
        role="status"
        className="border-t border-border bg-muted-bg px-5 py-5 sm:px-8 sm:py-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0 space-y-2">
            <p className="text-xs tracking-[0.2em] text-foreground uppercase">
              Marked as delivered
            </p>
            <p className="text-sm leading-relaxed text-muted">
              The carrier marked this order delivered on{" "}
              <time dateTime={estimatedDelivery} className="text-foreground">
                {formatDeliveryDate(estimatedDelivery)}
              </time>
              , but you can still report it if you never got it.
            </p>
          </div>

          <button
            type="button"
            onClick={startReport}
            className="inline-flex shrink-0 items-center justify-center bg-foreground px-6 py-3 text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80 sm:self-center"
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
        className="border-t border-border bg-muted-bg px-5 py-5 sm:px-8 sm:py-6"
      >
        <p className="text-xs tracking-[0.2em] text-foreground uppercase">
          Report submitted
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We opened case{" "}
          <span className="text-foreground">{reportId}</span> for {productName}{" "}
          ({orderNumber}). Support will follow up shortly.
        </p>
        <button
          type="button"
          onClick={() => setStep("idle")}
          className="mt-4 text-xs tracking-[0.2em] text-foreground uppercase underline-offset-4 hover:underline"
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
      className="border-t border-border bg-muted-bg px-5 py-5 sm:px-8 sm:py-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p
            id={titleId}
            className="text-xs tracking-[0.2em] text-foreground uppercase"
          >
            Report missing delivery
          </p>
          <p className="mt-1 text-xs tracking-wide text-muted">
            Order {orderNumber} · Step {step === "reason" ? "1" : "2"} of 2
          </p>
        </div>
        <button
          type="button"
          onClick={cancel}
          className="text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>

      {step === "reason" && (
        <fieldset className="space-y-2">
          <legend className="mb-3 text-sm text-foreground">What happened?</legend>
          {REASONS.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                reason === item.id
                  ? "border-foreground bg-surface text-foreground"
                  : "border-border bg-surface/50 text-muted hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              <input
                type="radio"
                name={`missing-reason-${orderNumber}`}
                value={item.id}
                checked={reason === item.id}
                onChange={() => setReason(item.id)}
                className="size-4 accent-foreground"
              />
              {item.label}
            </label>
          ))}
          <div className="flex justify-end pt-3">
            <button
              type="button"
              disabled={!reason}
              onClick={() => setStep("details")}
              className="inline-flex items-center justify-center bg-foreground px-6 py-3 text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continue
            </button>
          </div>
        </fieldset>
      )}

      {step === "details" && (
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm text-foreground">
              Anything else we should know?{" "}
              <span className="text-muted">(optional)</span>
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Gate code, neighbors, porch location…"
              className="w-full resize-y border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            />
          </label>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setStep("reason")}
              className="inline-flex items-center justify-center border border-border px-6 py-3 text-xs tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-60"
            >
              Back
            </button>
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center justify-center bg-foreground px-6 py-3 text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80"
            >
              Submit report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
