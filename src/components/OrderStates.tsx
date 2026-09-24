export function OrdersLoading() {
  return (
    <div
      className="flex flex-col gap-8"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="sr-only">Loading orders…</p>
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden border border-border bg-surface">
          <div className="flex gap-5 p-5 sm:gap-8 sm:p-8">
            <div className="h-28 w-[5.5rem] shrink-0 animate-pulse bg-muted-bg sm:h-40 sm:w-32" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="h-5 w-2/3 animate-pulse bg-muted-bg" />
              <div className="h-3 w-1/3 animate-pulse bg-muted-bg" />
              <div className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-4">
                <div className="h-8 animate-pulse bg-muted-bg" />
                <div className="h-8 animate-pulse bg-muted-bg" />
                <div className="h-8 animate-pulse bg-muted-bg" />
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
      className="flex flex-col items-center justify-center border border-border bg-surface px-6 py-20 text-center sm:py-24"
    >
      <p className="font-display text-2xl text-foreground sm:text-3xl">
        No orders yet
      </p>
      <p className="mt-3 max-w-sm text-sm tracking-wide text-muted sm:text-base">
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
      className="flex flex-col items-center justify-center border border-border bg-muted-bg px-6 py-16 text-center sm:py-20"
    >
      <p className="font-display text-2xl text-foreground sm:text-3xl">
        Something went wrong
      </p>
      <p className="mt-3 max-w-sm text-sm tracking-wide text-muted sm:text-base">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex items-center justify-center bg-foreground px-8 py-3 text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80"
        >
          Try again
        </button>
      )}
    </div>
  );
}
