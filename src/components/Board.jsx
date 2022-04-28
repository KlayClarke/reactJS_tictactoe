import Square from "./Square";

export default function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        onClick={() => props.handleSquareClick(i)}
        value={props.squares[i]}
        winner={props.winner}
      />
    );
  }

  return (
    <div className="flex flex-col">
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
