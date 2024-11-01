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
  return nameWithoutMaterial.replace(/_/g, " ");
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

  Object.entries(rawImages).forEach(([path]) => {
    const name = formatName(path);
    items.push({
      id: id++,
      name,
      baseValue: getBaseValue(name, true),
      imageSrc: path,
    });
  });

  Object.entries(goodsImages).forEach(([path]) => {
    const name = formatName(path);
    items.push({
      id: id++,
      name,
      baseValue: getBaseValue(name, false),
      imageSrc: path,
    });
  });

  return items;
}

export const tradeItems: TradeItem[] = generateTradeItems();
