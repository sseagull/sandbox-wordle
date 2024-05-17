export default function Guess({ data = [null, null, null, null, null] }) {
  return (
    <p className="guess">
      {data.map((cell, i) => (
        <span key={`cell-${i + 1}`} className={`cell ${cell?.status}`}>
          {cell?.letter}
        </span>
      ))}
    </p>
  );
}
