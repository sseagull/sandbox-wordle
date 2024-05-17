import React from "react";

export default function GuessForm({ disabled, onSubmit }) {
  const [guess, setGuess] = React.useState("");
  const [valid, setValid] = React.useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!valid) {
      return;
    }
    console.log("submitting");
    onSubmit?.(guess);
    setGuess("");
  };

  const handleOnChange = (event) => {
    const nextGuess = event.target.value;
    const nextValid = event.target.validity.valid;
    setGuess(nextGuess.toUpperCase());
    setValid(nextValid);
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleOnSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern="\w{5}"
        disabled={disabled}
        value={guess}
        onChange={handleOnChange}
      />
    </form>
  );
}
