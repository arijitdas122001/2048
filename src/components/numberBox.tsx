import React from "react";

const NumberBox = (props: any) => {
  const { rowIndex, col, colIndex } = props;
  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      0: "bg-[#cdc1b4]",
      2: "bg-[#eee4da] text-[#776e65]",
      4: "bg-[#ede0c8] text-[#776e65]",
      8: "bg-[#f2b179] text-white",
      16: "bg-[#f59563] text-white",
      32: "bg-[#f67c5f] text-white",
      64: "bg-[#f65e3b] text-white",
      128: "bg-[#edcf72] text-white",
      256: "bg-[#edcc61] text-white",
      512: "bg-[#edc850] text-white",
      1024: "bg-[#edc53f] text-white",
      2048: "bg-[#edc22e] text-white",
    };
    return colors[value] || "bg-[#cdc1b4]";
  };
  const getTileSize = (value: number) => {
    if (value >= 1024) return "text-3xl";
    if (value >= 128) return "text-4xl";
    return "text-5xl";
  };
  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={`${getTileColor(
        col
      )} rounded aspect-square flex items-center justify-center font-bold transition-all duration-100 ${getTileSize(
        col
      )}`}
    >
      {col !== 0 && col}
    </div>
  );
};

export default NumberBox;
