import { OrdersPreview } from "@/components/OrdersPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <OrdersPreview />
      <SiteFooter />
    </>
  );
}
