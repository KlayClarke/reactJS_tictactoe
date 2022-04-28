import Board from "./Board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      xIsNext: true,
    },
  ]);

  function handleSquareClick(i) {
    const current = history[history.length - 1];
    const squaresClone = current.squares.slice();
    current.xIsNext ? (squaresClone[i] = "X") : (squaresClone[i] = "O");
    setHistory(
      history.concat([{ squares: squaresClone, xIsNext: !current.xIsNext }])
    );
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null), xIsNext: true }]);
  }

  function jumpTo(index) {
    // cut history array up to desired gameboard then render squares
    const newHistory = history.slice();
    setHistory(newHistory.splice(0, index));
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
    : `Next Player: ${current.xIsNext ? "X" : "O"}`;

  const moves = history.slice().map((step, move) => {
    const desc = move ? "Jump to move #" + move : "Jump to game start";
    return (
      <li key={move}>
        <button
          className={`${winner ? "cursor-not-allowed" : ""} text-3xl `}
          onClick={winner ? undefined : () => jumpTo(move + 1)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="flex justify-center items-center gap-20">
      <div className="flex flex-col justify-center items-center min-h-screen">
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
      <div
        className={`${
          winner ? "blur-sm" : ""
        } border-2 border-black border-opacity-0 p-10 min-h-fit`}
      >
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
