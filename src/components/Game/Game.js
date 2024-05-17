import React from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";

import GuessForm from "../GuessForm";
import Guess from "../Guess";
import { HappyBanner, SadBanner } from "../Banner";
import Keyboard from "../Keyboard";

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [entries, setEntries] = React.useState(() =>
    range(0, NUM_OF_GUESSES_ALLOWED)
  );
  const [entryCount, setEntryCount] = React.useState(0);
  const [keyMap, setKeyMap] = React.useState({});
  const [status, setStatus] = React.useState("pending");

  const addEntry = (guess) => {
    const parsedGuess = checkGuess(guess, answer);

    const nextEntry = {
      id: crypto.randomUUID(),
      guess: parsedGuess,
      valid: parsedGuess.every((cell) => cell.status === "correct"),
    };
    const nextEntries = [...entries];
    nextEntries[entryCount] = nextEntry;
    const nextCount = entryCount + 1;
    const nextKeyMap = { ...keyMap };
    parsedGuess.forEach((cell) => {
      nextKeyMap[cell.letter] = cell.status;
    });

    const nextStatus =
      nextCount <= NUM_OF_GUESSES_ALLOWED && nextEntry.valid
        ? "win"
        : nextCount === NUM_OF_GUESSES_ALLOWED && !nextEntry.valid
        ? "lose"
        : "pending";

    setEntryCount(nextCount);
    setEntries(nextEntries);
    setStatus(nextStatus);
    setKeyMap(nextKeyMap);
  };

  const resetGame = () => {
    setAnswer(sample(WORDS));
    setEntries(range(0, NUM_OF_GUESSES_ALLOWED));
    setEntryCount(0);
    setKeyMap({});
    setStatus("pending");
  };

  return (
    <>
      {status === "win" && (
        <HappyBanner attempts={entryCount}>
          <button onClick={() => resetGame()}>Reset</button>
        </HappyBanner>
      )}
      {status === "lose" && (
        <SadBanner answer={answer}>
          <button onClick={() => resetGame()}>Reset</button>
        </SadBanner>
      )}
      <div className="guess-results">
        {entries.map((entry, i) => (
          <Guess key={`guess-${i + 1}`} data={entry?.guess} />
        ))}
      </div>
      <GuessForm disabled={status === "lose"} onSubmit={addEntry} />
      <Keyboard keyMap={keyMap} />
    </>
  );
}

export default Game;
