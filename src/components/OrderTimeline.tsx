import type { OrderStatus } from "@/lib/mockOrders";

const STEPS = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
] as const;

/** Maps order exception/status to the active timeline step index. */
const CURRENT_STEP: Record<OrderStatus, number> = {
  trackingUnavailable: 0,
  delayed: 1,
  normal: 2,
  deliveredNotReceived: 3,
};

type StepState = "done" | "current" | "upcoming";

function getStepState(
  index: number,
  current: number,
  status: OrderStatus,
): StepState {
  // Carrier marked delivered — keep Delivered visible as completed.
  if (status === "deliveredNotReceived") {
    return index <= current ? "done" : "upcoming";
  }
  if (index < current) return "done";
  if (index === current) return "current";
  return "upcoming";
}

type OrderTimelineProps = {
  status: OrderStatus;
  estimatedDelivery?: string;
};

function formatDeliveryDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function OrderTimeline({ status, estimatedDelivery }: OrderTimelineProps) {
  if (status === "trackingUnavailable") {
    return (
      <section className="border-t border-border px-5 py-6 sm:px-8 sm:py-8">
        <h3 className="mb-4 text-[10px] tracking-[0.3em] text-muted uppercase">
          Tracking progress
        </h3>
        <div className="border border-border bg-muted-bg px-5 py-5">
          <p className="text-sm tracking-wide text-foreground sm:text-base">
            Tracking isn&apos;t available yet
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We&apos;ll update you once it ships
            {estimatedDelivery ? (
              <>
                . Estimated delivery{" "}
                <time dateTime={estimatedDelivery} className="text-foreground">
                  {formatDeliveryDate(estimatedDelivery)}
                </time>
              </>
            ) : (
              "."
            )}
          </p>
        </div>
      </section>
    );
  }

  const current = CURRENT_STEP[status];
  const isDelayed = status === "delayed";
  const isMissing = status === "deliveredNotReceived";

  return (
    <section className="border-t border-border px-5 py-6 sm:px-8 sm:py-8">
      <h3 className="mb-5 text-[10px] tracking-[0.3em] text-muted uppercase">
        Tracking progress
      </h3>

      <ol className="relative ms-1.5 space-y-0">
        {STEPS.map((label, index) => {
          const state = getStepState(index, current, status);
          const isLast = index === STEPS.length - 1;
          const isDeliveredStep = isLast && isMissing;

          return (
            <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden
                  className={`absolute top-3 left-[7px] h-[calc(100%-4px)] w-px ${
                    state === "done" ? "bg-foreground" : "bg-border"
                  }`}
                />
              )}

              <span
                aria-hidden
                className={`relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  state === "done"
                    ? "bg-foreground text-background"
                    : state === "current"
                      ? "bg-surface ring-1 ring-foreground ring-offset-2 ring-offset-surface"
                      : "bg-surface ring-1 ring-border"
                }`}
              >
                {state === "done" && (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2.5 6.2 4.8 8.5 9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {state === "current" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                )}
              </span>

              <div className="min-w-0 flex-1 pt-px">
                <p
                  className={`text-sm tracking-wide sm:text-base ${
                    state === "upcoming" ? "text-muted" : "text-foreground"
                  }`}
                >
                  {label}
                </p>
                <p className="mt-0.5 text-xs tracking-wide sm:text-sm">
                  {state === "done" && (
                    <span
                      className={
                        isDeliveredStep ? "text-rose-800" : "text-muted"
                      }
                    >
                      {isDeliveredStep
                        ? "Delivered · carrier confirmation"
                        : "Completed"}
                    </span>
                  )}
                  {state === "current" && (
                    <span className="text-foreground">
                      {isDelayed ? "Delayed here" : "Current status"}
                    </span>
                  )}
                  {state === "upcoming" && (
                    <span className="text-muted">Upcoming</span>
                  )}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
