import { TradeItem } from "./types";
import { GOODS_PRICES, RAW_MATERIAL_PRICES } from "./constants";

const rawImages = import.meta.glob("/src/assets/resources/raw/*.png", {
  eager: true,
});

const goodsImages = import.meta.glob("/src/assets/resources/goods/*.png", {
  eager: true,
});

function formatName(filename: string): string {
  const baseName = filename.split("/").pop()?.replace(".png", "") || "";
  const nameWithoutMaterial = baseName.replace("Material_", "");
  return nameWithoutMaterial
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getBaseValue(name: string, isRawMaterial: boolean): number {
  if (isRawMaterial) {
    return RAW_MATERIAL_PRICES[name];
  }
  return GOODS_PRICES[name];
}

function generateTradeItems(): TradeItem[] {
  const items: TradeItem[] = [];
  let id = 1;

  Object.entries(rawImages).forEach(([path, module]) => {
    const name = formatName(path);
    items.push({
      id: id++,
      name,
      baseValue: getBaseValue(name, true),
      imageSrc: (module as { default: string }).default,
    });
  });

  Object.entries(goodsImages).forEach(([path, module]) => {
    const name = formatName(path);
    items.push({
      id: id++,
      name,
      baseValue: getBaseValue(name, false),
      imageSrc: (module as { default: string }).default,
    });
  });

  return items;
}

export const tradeItems: TradeItem[] = generateTradeItems();
