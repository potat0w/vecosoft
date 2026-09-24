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
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
        <p className="mb-4 text-xs tracking-[0.35em] text-muted uppercase">
          Account
        </p>
        <h1 className="font-display text-4xl leading-[1.15] text-foreground lg:text-5xl">
          Your Orders
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base tracking-wide text-muted lg:text-lg">
          Track shipments and manage delivery updates with quiet clarity.
        </p>
      </div>

      <div className="mb-10 flex justify-center border-b border-border">
        <div
          role="tablist"
          aria-label="Filter orders"
          className="flex gap-1 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2"
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
                className={`shrink-0 border-b-2 px-3 py-3 text-xs tracking-[0.2em] uppercase transition-colors sm:px-4 ${
                  active
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mx-auto flex max-w-4xl flex-col gap-8">
        {pageOrders.map((order) => (
          <li key={order.id}>
            <OrderSummary order={order} />
          </li>
        ))}
      </ul>

      {filteredOrders.length > 0 && (
        <nav
          aria-label="Orders pagination"
          className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between"
        >
          <p className="text-sm tracking-wide text-muted">
            Showing{" "}
            <span className="text-foreground">
              {from}–{to}
            </span>{" "}
            of <span className="text-foreground">{filteredOrders.length}</span>
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 text-xs tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
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
                      className={`flex size-9 items-center justify-center text-sm transition-colors ${
                        active
                          ? "bg-foreground text-background"
                          : "text-muted hover:text-foreground"
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
              className="px-4 py-2 text-xs tracking-[0.2em] text-foreground uppercase transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </main>
  );
}
