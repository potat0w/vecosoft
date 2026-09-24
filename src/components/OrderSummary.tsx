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
  delayed: "border-amber-800/30 text-amber-900",
  deliveredNotReceived: "border-rose-800/30 text-rose-900",
  trackingUnavailable: "border-foreground/20 text-muted",
  normal: "border-foreground/20 text-foreground",
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
    <article className="overflow-hidden border border-border bg-surface">
      <div className="flex gap-5 p-5 sm:gap-8 sm:p-8">
        <div className="relative h-28 w-[5.5rem] shrink-0 overflow-hidden bg-muted-bg sm:h-40 sm:w-32">
          <Image
            src={order.image}
            alt={order.productName}
            fill
            sizes="(max-width: 640px) 88px, 128px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-2">
              <h2 className="font-display text-xl leading-snug text-foreground sm:text-2xl">
                {order.productName}
              </h2>
              <p className="text-xs tracking-[0.15em] text-muted uppercase">
                Order {order.orderNumber}
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center border px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase ${STATUS_CLASS[order.status]}`}
            >
              {STATUS_LABEL[order.status]}
            </span>
          </div>

          <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Qty
              </dt>
              <dd className="mt-1 text-foreground">{order.qty}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Unit price
              </dt>
              <dd className="mt-1 text-foreground">
                {formatPrice(order.price)}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Total
              </dt>
              <dd className="mt-1 text-foreground">
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
