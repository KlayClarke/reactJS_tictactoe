import { useState } from "react";

export default function Square({ value, onClick }) {
  return (
    <button
      className="text-4xl border-2 border-black min-w-[200px] min-h-[200px]"
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
}
