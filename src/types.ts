export interface TradeItem {
  id: number;
  name: string;
  baseValue: number;
  quantity?: number;
  imageSrc: string;
}

export type MaterialPrices = {
  [key: string]: number;
};
