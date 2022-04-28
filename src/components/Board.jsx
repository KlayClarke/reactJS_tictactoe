import { useState, useEffect } from "react";
import Square from "./Square";

export default function Board(props) {
  function handleSquareClick(i) {
    const squaresClone = props.squares.slice();
    props.xIsNext ? (squaresClone[i] = "X") : (squaresClone[i] = "O");
    props.setSquares(squaresClone);
    props.setXIsNext(!props.xIsNext);
  }

  function handleRestart() {
    props.setSquares(Array(9).fill(null));
    props.setXIsNext(true);
  }

  function renderSquare(i) {
    return (
      <Square value={props.squares[i]} onClick={() => handleSquareClick(i)} />
    );
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
  const winner = findWinner(props.squares);
  const status = winner
    ? `The Winner Is ${winner}`
    : `Next Player: ${props.xIsNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col">
      <div className="text-4xl flex justify-center items-center mb-4">
        {status}
      </div>
      {winner && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleRestart}
        >
          Play again
        </button>
      )}
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
