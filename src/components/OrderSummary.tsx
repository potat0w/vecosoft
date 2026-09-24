import Image from "next/image";
import type { Order, OrderStatus } from "@/lib/mockOrders";
import { DelayedNotice } from "@/components/DelayedNotice";
import { NotReceivedReport } from "@/components/NotReceivedReport";
import { OrderTimeline } from "@/components/OrderTimeline";

const STATUS_LABEL: Record<OrderStatus, string> = {
  delayed: "Delayed",
  deliveredNotReceived: "Delivered, not received",
  trackingUnavailable: "Tracking unavailable",
  normal: "On the way",
};

const STATUS_CLASS: Record<OrderStatus, string> = {
  delayed: "bg-amber-50 text-amber-700 ring-amber-700/20",
  deliveredNotReceived: "bg-rose-50 text-rose-700 ring-rose-700/20",
  trackingUnavailable: "bg-stone-100 text-stone-600 ring-stone-600/20",
  normal: "bg-teal-50 text-teal-700 ring-teal-700/20",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

type OrderSummaryProps = {
  order: Order;
};

export function OrderSummary({ order }: OrderSummaryProps) {
  const lineTotal = order.price * order.qty;

  return (
    <article className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border">
      <div className="flex gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-border sm:h-36 sm:w-28 md:h-40 md:w-32">
          <Image
            src={order.image}
            alt={order.productName}
            fill
            sizes="(max-width: 640px) 80px, 128px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 space-y-1">
              <h2 className="font-display text-lg leading-snug tracking-tight text-foreground sm:text-xl md:text-2xl">
                {order.productName}
              </h2>
              <p className="text-sm text-muted">
                Order{" "}
                <span className="font-medium text-foreground">
                  {order.orderNumber}
                </span>
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ring-1 ring-inset sm:text-sm ${STATUS_CLASS[order.status]}`}
            >
              {STATUS_LABEL[order.status]}
            </span>
          </div>

          <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-3 text-sm sm:grid-cols-3 sm:gap-6 sm:pt-4 md:text-base">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Qty
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {order.qty}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Unit price
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {formatPrice(order.price)}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-wider text-muted">
                Total
              </dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {formatPrice(lineTotal)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {order.status === "delayed" && (
        <DelayedNotice
          orderNumber={order.orderNumber}
          estimatedDelivery={order.estimatedDelivery}
          productName={order.productName}
        />
      )}

      {order.status === "deliveredNotReceived" && (
        <NotReceivedReport
          orderNumber={order.orderNumber}
          productName={order.productName}
          estimatedDelivery={order.estimatedDelivery}
        />
      )}

      <OrderTimeline
        status={order.status}
        estimatedDelivery={order.estimatedDelivery}
      />
    </article>
  );
}
