export function OrdersLoading() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading orders…</p>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border"
        >
          <div className="flex gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="h-24 w-20 shrink-0 animate-pulse rounded-xl bg-border sm:h-36 sm:w-28" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-border" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-border" />
              <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-3">
                <div className="h-8 animate-pulse rounded bg-border" />
                <div className="h-8 animate-pulse rounded bg-border" />
                <div className="h-8 animate-pulse rounded bg-border" />
              </div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-5 sm:px-6">
            <div className="mb-3 h-3 w-28 animate-pulse rounded bg-border" />
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="size-4 animate-pulse rounded-full bg-border" />
                <div className="h-4 w-40 animate-pulse rounded bg-border" />
              </div>
              <div className="flex gap-4">
                <div className="size-4 animate-pulse rounded-full bg-border" />
                <div className="h-4 w-32 animate-pulse rounded bg-border" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrdersEmpty() {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center rounded-2xl bg-surface px-6 py-16 text-center ring-1 ring-border sm:py-20"
    >
      <p className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
        No orders yet
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
        When you place an order, you&apos;ll see tracking and delivery updates
        here.
      </p>
    </div>
  );
}

type OrdersErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export function OrdersError({
  message = "We couldn't load your orders. Please try again.",
  onRetry,
}: OrdersErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl bg-rose-50 px-6 py-14 text-center ring-1 ring-rose-200 sm:py-16"
    >
      <p className="font-display text-xl tracking-tight text-rose-950 sm:text-2xl">
        Something went wrong
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-rose-800/90 sm:text-base">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-rose-800 px-4 py-2.5 text-sm font-medium text-rose-50 transition-colors hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800"
        >
          Try again
        </button>
      )}
    </div>
  );
}
