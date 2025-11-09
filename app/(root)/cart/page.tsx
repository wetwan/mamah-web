import dynamic from "next/dynamic";

const CartClient = dynamic(() => import("@/components/cartPage"), {
  ssr: false,
});

export default function CartPage() {
  return <CartClient />;
}
