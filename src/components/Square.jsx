export default function Square({ value }) {
  function handleClick(e) {
    console.log(e.target.value);
  }

  return (
    <button
      className="text-4xl border-2 border-black min-w-[200px] min-h-[200px]"
      onClick={handleClick}
      value={value}
    >
      {value}
    </button>
  );
}
