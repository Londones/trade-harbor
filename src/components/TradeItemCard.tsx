import { TradeItem } from "../types";

type TradeItemCardProps = {
  tradeItem: TradeItem;
  quantity?: number;
  onClick?: () => void;
  selected?: boolean;
};

const TradeItemCard = ({
  tradeItem,
  quantity,
  onClick,
  selected,
}: TradeItemCardProps) => {
  return (
    <div className="relative w-24 h-24 group" onClick={onClick}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          {tradeItem.name}
        </div>
      </div>
      <div
        className={`
        relative h-full rounded-2xl border-2 border-black
        ${
          selected
            ? "bg-gradient-to-b from-orange-200 to-orange-300"
            : "bg-gradient-to-b from-orange-50 to-orange-100"
        }
      `}
      >
        {/* Highlight effect */}
        <div className="absolute inset-[6px] bg-orange-200 rounded-xl border-2 border-orange-950/20 transform opacity-50" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-white/30 rounded-full " />
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="flex-1 flex items-center justify-center w-full p-2">
            <img
              src={tradeItem.imageSrc}
              alt={tradeItem.name}
              className="w-14 h-14 object-contain"
            />
          </div>

          {quantity && (
            <div className="absolute bottom-1 w-full text-center">
              <span className="text-2xl font-bold text-white px-1 py-0.5 drop-shadow-[0_2px_1px_rgba(0,0,0,0.5)] text-stroke-2 text-stroke-black paint-order-fill">
                {quantity}
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-[2px] left-[1px] h-4 w-5 -rotate-45 bg-white/70 rounded-full " />
      </div>
    </div>
  );
};

export default TradeItemCard;
