import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleSquareClick(i) {
    const current = history[history.length - 1];
    const squaresClone = current.squares.slice();
    xIsNext ? (squaresClone[i] = "X") : (squaresClone[i] = "O");
    setHistory(history.concat([{ squares: squaresClone }]));
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setXIsNext(true);
  }

  function findWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const current = history[history.length - 1];

  const winner = findWinner(current.squares);
  const status = winner
    ? `The Winner Is ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-4">{status}</h1>
      {winner && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleRestart}
        >
          Play Again
        </button>
      )}
      <Board
        squares={current.squares}
        handleSquareClick={handleSquareClick}
        winner={winner}
      />
    </div>
  );
}
