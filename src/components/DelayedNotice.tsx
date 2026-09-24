type DelayedNoticeProps = {
  orderNumber: string;
  estimatedDelivery: string;
  productName: string;
};

function formatDeliveryDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

function daysOverdue(isoDate: string) {
  const estimated = new Date(`${isoDate}T23:59:59`);
  const now = new Date();
  const ms = now.getTime() - estimated.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function DelayedNotice({
  orderNumber,
  estimatedDelivery,
  productName,
}: DelayedNoticeProps) {
  const overdueDays = daysOverdue(estimatedDelivery);
  const supportHref = `mailto:support@example.com?subject=${encodeURIComponent(
    `Delayed order ${orderNumber}`,
  )}&body=${encodeURIComponent(
    `Hi Support,\n\nMy order ${orderNumber} (${productName}) was estimated for ${estimatedDelivery} and has not arrived yet.\n\nPlease help.\n`,
  )}`;

  return (
    <div
      role="alert"
      className="border-t border-border bg-muted-bg px-5 py-5 sm:px-8 sm:py-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 space-y-2">
          <p className="text-xs tracking-[0.2em] text-foreground uppercase">
            Delivery is overdue
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Estimated delivery was{" "}
            <time
              dateTime={estimatedDelivery}
              className="text-foreground line-through decoration-foreground/40"
            >
              {formatDeliveryDate(estimatedDelivery)}
            </time>
            . That date has passed — this order is{" "}
            <span className="text-foreground">
              {overdueDays} {overdueDays === 1 ? "day" : "days"} late
            </span>
            .
          </p>
        </div>

        <a
          href={supportHref}
          className="inline-flex shrink-0 items-center justify-center bg-foreground px-6 py-3 text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-80 sm:self-center"
        >
          Contact support
        </a>
      </div>
    </div>
  );
}
