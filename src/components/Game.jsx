import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Board
        squares={squares}
        setSquares={setSquares}
        xIsNext={xIsNext}
        setXIsNext={setXIsNext}
      />
    </div>
  );
}
