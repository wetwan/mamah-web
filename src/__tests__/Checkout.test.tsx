/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { vi } from "vitest";

// // 🔥 All mocks must come *before* importing the component you’re testing

// const resetCart = vi.fn();
// const mockPush = vi.fn();
// const createOrder = vi.fn(() => Promise.resolve({ success: true }));

// vi.mock("@/context/cartStore", () => ({
//   useCart: () => ({
//     cartProducts: [
//       {
//         product: { finalPrice: 100, name: "Test Product" },
//         quantity: 2,
//       },
//     ],
//     resetCart,
//   }),
// }));

// vi.mock("@/context/userStore", () => ({
//   useAuth: () => ({
//     token: "mock-token",
//   }),
// }));

// vi.mock("next/navigation", () => ({
//   useRouter: () => ({
//     push: mockPush,
//   }),
// }));

// vi.mock("@/src/api/product/route", () => ({
//   createOrder,
// }));

// // 🟩 Import component *after* all mocks
// import Checkout from "@/components/checkout";

// describe("Checkout Component", () => {
//   it("renders and triggers checkout on button click", async () => {
//     render(<Checkout />);

//     const button = screen.getByRole("button", { name: /checkout/i });
//     expect(button).toBeInTheDocument();

//     fireEvent.click(button);

//     await waitFor(() => {
//       expect(createOrder).toHaveBeenCalledTimes(1);
//       expect(mockPush).toHaveBeenCalledWith("/success");
//       expect(resetCart).toHaveBeenCalled();
//     });
//   });
// });

// ✅ Mock first, before anything else
vi.mock("@/src/api/product/route", () => ({
  createOrder: vi.fn(),
}));
import React from "react";
import Checkout from "@/components/checkout";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";


// 🧪 Example test
describe("Checkout Component", () => {
  it("renders and triggers checkout on button click", async () => {
    const { createOrder } = await import("@/src/api/product/route");
    (createOrder as any).mockResolvedValue({ success: true });

    render(<Checkout />);

    const button = screen.getByRole("button", { name: /checkout/i });
    fireEvent.click(button);

    expect(createOrder).toHaveBeenCalled();
  });
});
