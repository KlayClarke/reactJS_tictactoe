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
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  function changeDifficulty(e) {
    setDifficulty(e.target.value);
    handleRestart();
  }

  function aiChoose() {
    if (!isGameOver) {
      console.log("not game over");
      const current = history[history.length - 1];
      const squaresClone = current.squares.slice();
      let availableSpots = [];
      for (let i = 0; i < squaresClone.length; i++) {
        if (squaresClone[i] === null) {
          availableSpots.push(i);
        }
      }
      if (!availableSpots.length) {
        setIsDraw(true);
      }
      if (!current.xIsNext) {
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
        const random = Math.floor(Math.random() * availableSpots.length);
        let aiChoice;
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (
            (squaresClone[a] === "X" &&
              squaresClone[b] === "X" &&
              squaresClone[c] == null) ||
            (squaresClone[a] === "O" &&
              squaresClone[b] === "O" &&
              squaresClone[c] == null)
          ) {
            aiChoice = c;
          } else if (
            (squaresClone[b] === "X" &&
              squaresClone[c] === "X" &&
              squaresClone[a] === null) ||
            (squaresClone[b] === "O" &&
              squaresClone[c] === "O" &&
              squaresClone[a] == null)
          ) {
            aiChoice = a;
          } else if (
            (squaresClone[a] === "X" &&
              squaresClone[c] === "X" &&
              squaresClone[b] == null) ||
            (squaresClone[a] === "O" &&
              squaresClone[c] === "O" &&
              squaresClone[b] == null)
          ) {
            aiChoice = b;
          }
        }
        if (!aiChoice) {
          aiChoice = availableSpots[random];
        }
        handleSquareClick(aiChoice, "O");
      }
    }
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

  function handleSquareClick(i, symbol) {
    const current = history[history.length - 1];
    if (symbol === "O" && !current.xIsNext) {
      setTimeout(() => {
        const squaresClone = current.squares.slice();
        squaresClone[i] = symbol;
        setHistory(
          history.concat([{ squares: squaresClone, xIsNext: !current.xIsNext }])
        );
      }, 1000);
    } else if (current.xIsNext) {
      const squaresClone = current.squares.slice();
      squaresClone[i] = symbol;
      setHistory(
        history.concat([{ squares: squaresClone, xIsNext: !current.xIsNext }])
      );
    }
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null), xIsNext: true }]);
    setIsDraw(false);
    setIsGameOver(false);
  }

  const moves = history.slice().map((step, move) => {
    const desc = move ? "Return To Move #" + move : "Clear Board";
    return (
      <li key={move}>
        <button
          className={`${isGameOver ? "cursor-not-allowed" : ""} text-2xl `}
          onClick={isGameOver ? undefined : () => jumpTo(move + 1)}
        >
          {desc}
        </button>
      </li>
    );
  });

  status = isDraw
    ? "Draw"
    : winner && winner == "X"
    ? "Congratulations -- You Win!"
    : winner && winner == "O"
    ? "You Lose! Sorry!"
    : !winner
    ? `Next Player: ${current.xIsNext ? "X" : "O"}`
    : "";

  useEffect(() => {
    if (winner || isDraw) {
      setIsGameOver(true);
    } else {
      if (!current.xIsNext) {
        aiChoose();
      }
    }
  }, [current.xIsNext, winner, isGameOver, isDraw, aiChoose]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:flex-row gap-10">
      <div className="flex flex-col justify-center items-center">
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
        {isGameOver && (
          <button
            className="bg-white hover:bg-gray-100 text-gray-500 font-semibold border border-gray-400 py-2 px-4 rounded mb-4 shadow"
            onClick={handleRestart}
          >
            Play Again
          </button>
        )}
        <Board
          squares={current.squares}
          handleSquareClick={handleSquareClick}
          isGameOver={isGameOver}
        />
      </div>
      <div
        className={`${isGameOver ? "blur-sm" : ""} ${
          difficulty == "impossible" ? "hidden" : undefined
        } p-10 border-2 border-gray-400 bg-gray-200 w-[300px] rounded-lg overflow-y-auto lg:h-[450px] shadow`}
      >
        <ol className="list-decimal">{moves}</ol>
      </div>
    </div>
  );
}
