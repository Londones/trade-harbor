import { useState } from "react";
import { TradeItem } from "./types";
import TradeItemCard from "./components/TradeItemCard";
import Modal from "./components/Modal";
import Button from "./components/ui/Button";
import { tradeItems } from "./utils";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoostedItems, setSelectedBoostedItems] = useState<TradeItem[]>(
    []
  );
  const [optimalLoadout, setOptimalLoadout] = useState<
    { item: TradeItem; count: number }[]
  >([]);

  const handleItemClick = (item: TradeItem) => {
    setSelectedBoostedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      if (prev.length < 2) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const findOptimalLoadout = (
    targetSum: number,
    tradeItems: TradeItem[],
    selectedBoostedItems: TradeItem[]
  ) => {
    const itemsCopy = tradeItems.map((item) => ({
      ...item,
      baseValue: selectedBoostedItems.find((boost) => boost.id === item.id)
        ? item.baseValue * 2
        : item.baseValue,
    }));

    const resultCounts = new Map<number, number>();
    let currentSum = 0;

    while (currentSum < targetSum) {
      const remainingSum = targetSum - currentSum;
      let bestValue = 0;
      let bestIndex = -1;

      // Find the highest value item that fits in remaining sum
      for (let i = 0; i < itemsCopy.length; i++) {
        const value = itemsCopy[i].baseValue;
        if (value <= remainingSum && value > bestValue) {
          bestValue = value;
          bestIndex = i;
        }
      }

      // If no valid item found, break
      if (bestIndex === -1) break;

      // Add the best item
      currentSum += bestValue;
      resultCounts.set(bestIndex, (resultCounts.get(bestIndex) || 0) + 1);
    }

    return Array.from(resultCounts.entries()).map(([index, count]) => ({
      item: tradeItems[index],
      count,
    }));
  };

  const calculateOptimalLoadout = () => {
    if (selectedBoostedItems.length !== 2) return;
    const result = findOptimalLoadout(50000, tradeItems, selectedBoostedItems);
    setOptimalLoadout(result);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 flex flex-col justify-center">
      <h1 className="text-2xl mb-6">Trade Harbor Calculator</h1>

      {/* Selected Items */}
      {/* <div className="mb-6">
        <h2 className="text-lg mb-2">Selected 2x Value Items ({selectedBoostedItems.length}/2):</h2>
        <div className="flex gap-4">
          {selectedBoostedItems.map(item => (
            <TradeItemCard
              key={item.id}
              tradeItem={{...item, baseValue: item.baseValue * 2}}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div> */}

      <Button
        onClick={calculateOptimalLoadout}
        disabled={selectedBoostedItems.length !== 2}
      >
        Calculate Best Loadout
      </Button>

      {/* Available Items Grid */}
      <div className="grid grid-cols-12 gap-4 mt-6">
        {tradeItems.map((item) => (
          <div key={item.id}>
            <TradeItemCard
              tradeItem={item}
              onClick={() => handleItemClick(item)}
              selected={selectedBoostedItems.some(
                (selected) => selected.id === item.id
              )}
            />
          </div>
        ))}
      </div>

      <Modal
        items={optimalLoadout.map(({ item, count }) => ({
          ...item,
          quantity: count,
        }))}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </div>
  );
}

export default App;
