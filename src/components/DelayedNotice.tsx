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
      className="border-t border-amber-200 bg-amber-50 px-4 py-4 sm:px-6 sm:py-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 space-y-1.5">
          <p className="text-sm font-semibold text-amber-900 sm:text-base">
            Delivery is overdue
          </p>
          <p className="text-sm leading-relaxed text-amber-800/90">
            Estimated delivery was{" "}
            <time
              dateTime={estimatedDelivery}
              className="font-medium text-amber-950 line-through decoration-amber-700/60"
            >
              {formatDeliveryDate(estimatedDelivery)}
            </time>
            . That date has passed — this order is{" "}
            <span className="font-semibold text-amber-950">
              {overdueDays} {overdueDays === 1 ? "day" : "days"} late
            </span>
            .
          </p>
        </div>

        <a
          href={supportHref}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-800 px-4 py-2.5 text-sm font-medium text-amber-50 transition-colors hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 sm:self-center"
        >
          Contact support
        </a>
      </div>
    </div>
  );
}
