import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const squaresClone = squares.slice();
    xIsNext ? (squaresClone[i] = "X") : (squaresClone[i] = "O");
    setSquares(squaresClone);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const status = `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="">
      <div className="text-4xl">{status}</div>
      <div className="grid grid-cols-3 border-2 border-black">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
