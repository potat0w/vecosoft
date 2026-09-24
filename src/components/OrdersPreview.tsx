"use client";

import { useEffect, useMemo, useState } from "react";
import { OrderSummary } from "@/components/OrderSummary";
import { mockOrders, type OrderStatus } from "@/lib/mockOrders";

type PreviewMode = "all" | OrderStatus;

const PREVIEW_OPTIONS: { id: PreviewMode; label: string }[] = [
  { id: "all", label: "All" },
  { id: "normal", label: "Normal" },
  { id: "delayed", label: "Delayed" },
  { id: "deliveredNotReceived", label: "Not received" },
  { id: "trackingUnavailable", label: "No tracking" },
];

const PAGE_SIZE = 3;

export function OrdersPreview() {
  const [mode, setMode] = useState<PreviewMode>("all");
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    if (mode === "all") return mockOrders;
    return mockOrders.filter((order) => order.status === mode);
  }, [mode]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [mode]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, page]);

  const from = filteredOrders.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filteredOrders.length);

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

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              Preview
            </p>
            <div
              role="tablist"
              aria-label="Preview order states"
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {PREVIEW_OPTIONS.map((option) => {
                const active = mode === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMode(option.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm ${
                      active
                        ? "bg-foreground text-surface"
                        : "bg-background text-muted ring-1 ring-border hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:max-w-4xl md:px-8 md:py-10">
        <ul className="flex flex-col gap-4 sm:gap-5">
          {pageOrders.map((order) => (
            <li key={order.id}>
              <OrderSummary order={order} />
            </li>
          ))}
        </ul>

        {filteredOrders.length > 0 && (
          <nav
            aria-label="Orders pagination"
            className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"
          >
            <p className="text-sm text-muted">
              Showing{" "}
              <span className="font-medium text-foreground">
                {from}–{to}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredOrders.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => {
                    const active = pageNumber === page;
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        aria-label={`Page ${pageNumber}`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setPage(pageNumber)}
                        className={`flex size-9 items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                          active
                            ? "bg-foreground text-surface"
                            : "text-muted ring-1 ring-border hover:text-foreground"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </main>
    </div>
  );
}
