import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 relative w-fit flex overflow-hidden text-white rounded-full 
        outline outline-2 outline-black
        ${
          disabled
            ? "bg-gray-400 opacity-50 cursor-not-allowed drop-shadow-none"
            : "bg-blue-400 drop-shadow-[0px_2px_0px_rgba(0,0,0,0.5)] hover:bg-blue-500"
        }
      `}
    >
      <div className="absolute inset-x-[2px] left-0 w-full top-0 curved-edge" />
      <div className="absolute h-2 rounded-[100%] w-3 -rotate-45 left-2 top-1 bg-white" />
      <span className="font-cookierun text-xl font-bold drop-shadow-[0px_2px_0px_rgba(0,0,0,0.5)] text-stroke-2 text-stroke-black paint-order-fill">
        {children}
      </span>
      <div className="absolute w-full left-0 bottom-0 curved-edge-bottom" />
    </button>
  );
};

export default Button;
