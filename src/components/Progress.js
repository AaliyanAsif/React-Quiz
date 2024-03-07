import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Progress() {
  const {
    index: i,
    numOfQuestions,
    points,
    maxPossiblePoints,
    answer,
  } = useQuiz();

  const index = i + 1;

  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
