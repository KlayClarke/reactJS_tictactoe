export default function Square(props) {
  return (
    <button
      className={`${props.winner ? "cursor-not-allowed" : ""} ${
        !props.value && !props.winner ? "hover:bg-slate-50" : ""
      } text-4xl  border border-gray-400 rounded-xl h-[100px] w-[100px] md:h-[150px] md:w-[150px]`}
      onClick={props.winner || props.value ? undefined : () => props.onClick()}
    >
      <div className="flex justify-center items-center text-6xl">
        {props.value}
      </div>
    </button>
  );
}
