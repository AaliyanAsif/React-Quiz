import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function NextButton() {
  const { dispatch, numOfQuestions, index, answer } = useQuiz();

  if (answer === null) return null;

  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index >= numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finsih
      </button>
    );
}
