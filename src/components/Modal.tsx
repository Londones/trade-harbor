import { useEffect } from "react";
import { TradeItem } from "../types";
import TradeItemCard from "./TradeItemCard";
import Button from "./ui/Button";

type ModalProps = {
  items: TradeItem[];
  onClose: () => void;
  open: boolean;
};

function Modal({ items, onClose, open }: ModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed outline outline-2 outline-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-50 rounded-lg p-6 z-50 w-11/12 max-w-2xl max-h-[90vh]">
        <div className="absolute -right-5 -top-5">
          <Button onClick={onClose}>X</Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {items.map((item, index) => (
            <div key={index}>
              <TradeItemCard tradeItem={item} quantity={item.quantity} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Modal;
