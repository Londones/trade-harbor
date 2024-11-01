// App.test.tsx
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { TradeItem } from "./types";

// Mock dependencies
vi.mock("./components/TradeItemCard", () => ({
  default: ({
    tradeItem,
    onClick,
    selected,
  }: {
    tradeItem: TradeItem;
    onClick: () => void;
    selected: boolean;
  }) => (
    <div
      data-testid={`trade-item-${tradeItem.id}`}
      onClick={onClick}
      data-selected={selected}
    >
      {tradeItem.name}
    </div>
  ),
}));

vi.mock("./components/Modal", () => ({
  default: ({ open, items }: { open: boolean; items: TradeItem[] }) =>
    open ? <div data-testid="modal">{items.length} items</div> : null,
}));

vi.mock("./utils", () => ({
  tradeItems: [
    { id: 1, name: "Item 1", baseValue: 100, imageSrc: "test1.png" },
    { id: 2, name: "Item 2", baseValue: 200, imageSrc: "test2.png" },
    { id: 3, name: "Item 3", baseValue: 300, imageSrc: "test3.png" },
  ],
}));

describe("App", () => {
  test("renders all trade items", () => {
    render(<App />);
    expect(screen.getByTestId("trade-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("trade-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("trade-item-3")).toBeInTheDocument();
  });

  test("allows selecting up to two items", () => {
    render(<App />);

    // Select first item
    fireEvent.click(screen.getByTestId("trade-item-1"));
    expect(screen.getByTestId("trade-item-1")).toHaveAttribute(
      "data-selected",
      "true"
    );

    // Select second item
    fireEvent.click(screen.getByTestId("trade-item-2"));
    expect(screen.getByTestId("trade-item-2")).toHaveAttribute(
      "data-selected",
      "true"
    );

    // Try to select third item (should not work)
    fireEvent.click(screen.getByTestId("trade-item-3"));
    expect(screen.getByTestId("trade-item-3")).toHaveAttribute(
      "data-selected",
      "false"
    );
  });

  test("deselects items when clicked again", () => {
    render(<App />);

    // Select and deselect item
    fireEvent.click(screen.getByTestId("trade-item-1"));
    expect(screen.getByTestId("trade-item-1")).toHaveAttribute(
      "data-selected",
      "true"
    );

    fireEvent.click(screen.getByTestId("trade-item-1"));
    expect(screen.getByTestId("trade-item-1")).toHaveAttribute(
      "data-selected",
      "false"
    );
  });

  test("calculates optimal loadout when two items are selected", () => {
    render(<App />);

    // Select two items
    fireEvent.click(screen.getByTestId("trade-item-1"));
    fireEvent.click(screen.getByTestId("trade-item-2"));

    // Click calculate button
    fireEvent.click(screen.getByText("Calculate Best Loadout"));

    // Modal should appear with results
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  test("calculate button is disabled when fewer than 2 items selected", () => {
    render(<App />);

    const calculateButton = screen.getByRole("button", {
      name: /calculate best loadout/i,
    });
    expect(calculateButton).toBeDisabled();

    // Select one item
    fireEvent.click(screen.getByTestId("trade-item-1"));
    expect(calculateButton).toBeDisabled();

    // Select second item
    fireEvent.click(screen.getByTestId("trade-item-2"));
    expect(calculateButton).not.toBeDisabled();
  });
});
