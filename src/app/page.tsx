import { OrderSummary } from "@/components/OrderSummary";
import { mockOrders } from "@/lib/mockOrders";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border bg-surface/80 px-4 py-5 backdrop-blur-sm sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-3xl md:max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Orders
          </p>
          <h1 className="mt-1 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
            Order summary
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:max-w-4xl md:px-8 md:py-10">
        <ul className="flex flex-col gap-4 sm:gap-5">
          {mockOrders.map((order) => (
            <li key={order.id}>
              <OrderSummary order={order} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
