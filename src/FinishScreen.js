import React from "react";

export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const percentage = points / maxPossiblePoints / 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥈";
  if (percentage >= 1 && percentage < 50) emoji = "🥈";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="result">
      <p>
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(percentage)}% )
      </p>
      <p className="highscore">(Highscore = {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}
