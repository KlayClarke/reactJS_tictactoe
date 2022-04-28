import Board from "./Board";
import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      xIsNext: true,
    },
  ]);
  const [isDraw, setIsDraw] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
  }

  function aiChoose() {
    const current = history[history.length - 1];
    if (!current.xIsNext && !winner) {
      const squaresClone = current.squares.slice();
      let availableSpots = [];
      for (let i = 0; i < current.squares.length; i++) {
        if (current.squares[i] == null) {
          availableSpots.push(i);
        }
      }
      const random = Math.floor(Math.random() * availableSpots.length);
      setTimeout(() => {
        squaresClone[availableSpots[random]] = "O";
        setHistory(
          history.concat([{ squares: squaresClone, xIsNext: !current.xIsNext }])
        );
      }, 1000);
    }
  }

  function handleSquareClick(i) {
    const current = history[history.length - 1];
    if (current.xIsNext) {
      const squaresClone = current.squares.slice();
      squaresClone[i] = "X";
      setHistory(
        history.concat([{ squares: squaresClone, xIsNext: !current.xIsNext }])
      );
    }
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
        if (squares[a] == "X") {
          jsConfetti.addConfetti({
            confettiRadius: 6,
            confettiNumber: 1000,
          });
        }
        return squares[a];
      }
    }
    return null;
  }

  const current = history[history.length - 1];

  const winner = findWinner(current.squares);

  let status;

  status =
    winner && winner == "X"
      ? "Congratulations -- You Win!"
      : winner && winner == "O"
      ? "You Lose! Sorry!"
      : !winner
      ? `Next Player: ${current.xIsNext ? "X" : "O"}`
      : "";

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

  useEffect(() => {
    console.log(difficulty);

    let availableSpots = [];
    for (let i = 0; i < current.squares.length; i++) {
      if (current.squares[i] == null) {
        availableSpots.push(i);
      }
    }
    if (!availableSpots.length) {
      setIsDraw(true);
    }
  });

  aiChoose();

  return (
    <div className="flex justify-center items-center gap-20">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="inline-block relative w-64">
          <select
            onChange={changeDifficulty}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="easy">Easy</option>
            <option value="impossible">Impossible</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <br />
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
