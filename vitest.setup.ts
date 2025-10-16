import "@testing-library/jest-dom";
import { vi } from "vitest";


// mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
