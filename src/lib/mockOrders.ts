export type OrderStatus =
  | "delayed"
  | "deliveredNotReceived"
  | "trackingUnavailable"
  | "normal";

export type Order = {
  id: string;
  productName: string;
  image: string;
  qty: number;
  price: number;
  orderNumber: string;
  estimatedDelivery: string;
  status: OrderStatus;
};

const IMG = {
  coat: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop",
  dress: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
  blazer: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
  sweater: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
  shirt: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
  bag: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
  skirt: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop",
  oxford: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop",
  scarf: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=500&fit=crop",
  backpack: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
  boots: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
  pocketSquare: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
} as const;

export const mockOrders: Order[] = [
  // delayed
  {
    id: "1",
    productName: "Silk Evening Coat",
    image: IMG.coat,
    qty: 1,
    price: 2450,
    orderNumber: "ORD-78421",
    estimatedDelivery: "2026-09-18",
    status: "delayed",
  },
  {
    id: "2",
    productName: "Cashmere Wrap Dress",
    image: IMG.dress,
    qty: 1,
    price: 1890,
    orderNumber: "ORD-78455",
    estimatedDelivery: "2026-09-20",
    status: "delayed",
  },
  {
    id: "3",
    productName: "Tailored Wool Blazer",
    image: IMG.blazer,
    qty: 2,
    price: 1650,
    orderNumber: "ORD-78502",
    estimatedDelivery: "2026-09-22",
    status: "delayed",
  },

  // deliveredNotReceived
  {
    id: "4",
    productName: "Merino Knit Sweater",
    image: IMG.sweater,
    qty: 1,
    price: 890,
    orderNumber: "ORD-78110",
    estimatedDelivery: "2026-09-20",
    status: "deliveredNotReceived",
  },
  {
    id: "5",
    productName: "Linen Summer Shirt",
    image: IMG.shirt,
    qty: 1,
    price: 420,
    orderNumber: "ORD-78144",
    estimatedDelivery: "2026-09-18",
    status: "deliveredNotReceived",
  },
  {
    id: "6",
    productName: "Leather Crossbody Bag",
    image: IMG.bag,
    qty: 1,
    price: 780,
    orderNumber: "ORD-78201",
    estimatedDelivery: "2026-09-22",
    status: "deliveredNotReceived",
  },

  // trackingUnavailable
  {
    id: "7",
    productName: "Pleated Midi Skirt",
    image: IMG.skirt,
    qty: 3,
    price: 560,
    orderNumber: "ORD-78633",
    estimatedDelivery: "2026-10-02",
    status: "trackingUnavailable",
  },
  {
    id: "8",
    productName: "Cotton Oxford Shirt",
    image: IMG.oxford,
    qty: 1,
    price: 310,
    orderNumber: "ORD-78670",
    estimatedDelivery: "2026-10-01",
    status: "trackingUnavailable",
  },
  {
    id: "9",
    productName: "Wool Blend Scarf",
    image: IMG.scarf,
    qty: 1,
    price: 180,
    orderNumber: "ORD-78705",
    estimatedDelivery: "2026-10-05",
    status: "trackingUnavailable",
  },

  // normal
  {
    id: "10",
    productName: "Everyday Backpack",
    image: IMG.backpack,
    qty: 1,
    price: 450,
    orderNumber: "ORD-78820",
    estimatedDelivery: "2026-09-29",
    status: "normal",
  },
  {
    id: "11",
    productName: "Suede Ankle Boots",
    image: IMG.boots,
    qty: 1,
    price: 920,
    orderNumber: "ORD-78841",
    estimatedDelivery: "2026-09-27",
    status: "normal",
  },
  {
    id: "12",
    productName: "Silk Pocket Square",
    image: IMG.pocketSquare,
    qty: 2,
    price: 95,
    orderNumber: "ORD-78890",
    estimatedDelivery: "2026-10-03",
    status: "normal",
  },
];
