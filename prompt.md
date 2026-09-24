# Order Tracking — Build Prompts

## Create mock order data

Create `lib/mockOrders.ts` with these order status types: `delayed`, `deliveredNotReceived`, `trackingUnavailable`, and `normal`. Add a few sample orders for each state, including product name, image, quantity, price, order number, and estimated delivery date.

## Build the order summary

Build the order summary section with product image, name, quantity, price, order number, and current status. Make it responsive for both mobile and desktop.

## Add the order timeline

Add a vertical timeline showing Processing → Shipped → Out for Delivery → Delivered, with clear visual styles for completed, current, and upcoming stages.

## Handle special order states

For **Delayed** orders, show that the estimated delivery time has passed and provide a Contact Support action.

For **Delivered but Not Received**, still show the order as delivered and provide a “Didn't receive this” action that starts a report flow.

For **Tracking Unavailable**, don't leave the tracking section blank. Show a message saying the tracking information will be updated once the order ships.

## Add UI states and preview switcher

Add loading, empty, and error states.

Add a small switcher at the top to preview the mock order states: All, Normal, Delayed, Not Received, No Tracking. Do not include Loading, Empty, or Error in the switcher.
