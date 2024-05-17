export function HappyBanner({ attempts, children }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{attempts} guesses</strong>.
      </p>
      {children}
    </div>
  );
}
