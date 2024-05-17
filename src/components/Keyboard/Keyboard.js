const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function Keyboard({ keyMap = {} }) {
  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={`row-${i + 1}`} className="key-row">
          {row.map((cell, j) => (
            <div key={cell} className={`key-cap ${keyMap[cell]}`}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
