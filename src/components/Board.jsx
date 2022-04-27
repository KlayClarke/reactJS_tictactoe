import Square from "./Square";

export default function Board({ value }) {
  function renderSquare(i) {
    return <Square value={i} />;
  }
  return (
    <div className="">
      <div className="grid grid-cols-3 border-2 border-black">
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        {renderSquare(9)}
      </div>
    </div>
  );
}
