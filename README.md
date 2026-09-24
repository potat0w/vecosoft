# Shipment

A responsive Next.js screen for viewing and tracking orders. Built to handle common delivery edge cases—delays, missing packages, and tracking that isn’t available yet—with a clear status timeline and mock data for local preview.

## Features

- **Order summary** — product image, name, quantity, price, order number, and status
- **Vertical timeline** — Processing → Shipped → Out for Delivery → Delivered (done / current / upcoming)
- **Delayed orders** — overdue estimated delivery callout and Contact support action
- **Delivered, not received** — still shows Delivered, plus a “Didn’t receive this” report flow
- **Tracking unavailable** — placeholder message instead of an empty timeline
- **Preview switcher** — filter mock orders by status (All, Normal, Delayed, Not received, No tracking)
- **Pagination** — three orders per page
- **List states** — reusable loading, empty, and error UI (`OrderStates`)

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm start`     | Serve the production build |
| `npm run lint`  | Run ESLint               |

## Project structure

```
src/
  app/                  # App Router layout and home page
  components/
    OrderSummary.tsx    # Product + order details card
    OrderTimeline.tsx   # Status timeline / unavailable message
    DelayedNotice.tsx   # Overdue delivery + support CTA
    NotReceivedReport.tsx  # Missing-delivery report flow
    OrdersPreview.tsx   # Status filter + pagination
    OrderStates.tsx     # Loading / empty / error UI
  lib/
    mockOrders.ts       # Sample orders and status types
```

## Mock order statuses

| Status                  | Behavior                                              |
| ----------------------- | ----------------------------------------------------- |
| `normal`                | In transit; timeline at Out for Delivery              |
| `delayed`               | Overdue notice + Contact support                      |
| `deliveredNotReceived`  | Delivered on timeline + report missing package        |
| `trackingUnavailable`   | “We’ll update you once it ships” instead of timeline  |

Data lives in `src/lib/mockOrders.ts`.
