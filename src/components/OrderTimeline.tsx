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
};

export function OrderTimeline({ status }: OrderTimelineProps) {
  const current = CURRENT_STEP[status];
  const isDelayed = status === "delayed";
  const isMissing = status === "deliveredNotReceived";

  return (
    <section className="border-t border-border px-4 py-5 sm:px-6 sm:py-6">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">
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
                  className={`absolute top-3 left-[7px] h-[calc(100%-4px)] w-0.5 ${
                    state === "done"
                      ? isDelayed
                        ? "bg-amber-600"
                        : "bg-teal-600"
                      : "bg-border"
                  }`}
                />
              )}

              <span
                aria-hidden
                className={`relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  state === "done"
                    ? isDelayed
                      ? "bg-amber-600 text-white"
                      : "bg-teal-600 text-white"
                    : state === "current"
                      ? isDelayed
                        ? "bg-surface ring-2 ring-amber-600 ring-offset-2 ring-offset-surface"
                        : "bg-surface ring-2 ring-teal-600 ring-offset-2 ring-offset-surface"
                      : "bg-surface ring-2 ring-border"
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
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isDelayed ? "bg-amber-600" : "bg-teal-600"
                    }`}
                  />
                )}
              </span>

              <div className="min-w-0 flex-1 pt-px">
                <p
                  className={`text-sm font-medium sm:text-base ${
                    state === "upcoming"
                      ? "text-muted"
                      : state === "current"
                        ? isDelayed
                          ? "text-amber-900"
                          : "text-teal-800"
                        : "text-foreground"
                  }`}
                >
                  {label}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm">
                  {state === "done" && (
                    <span
                      className={
                        isDeliveredStep
                          ? "font-medium text-rose-700"
                          : isDelayed
                            ? "text-amber-700"
                            : "text-teal-700"
                      }
                    >
                      {isDeliveredStep
                        ? "Delivered · carrier confirmation"
                        : "Completed"}
                    </span>
                  )}
                  {state === "current" && (
                    <span
                      className={`font-medium ${
                        isDelayed ? "text-amber-800" : "text-teal-700"
                      }`}
                    >
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
