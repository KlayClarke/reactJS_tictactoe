export default function Square(props) {
  return (
    <button
      className={`${
        props.winner ? "cursor-not-allowed" : ""
      } text-4xl border-2 border-black min-w-[200px] min-h-[200px]`}
      onClick={!props.winner ? () => props.onClick() : ""}
    >
      {props.value}
    </button>
  );
}
