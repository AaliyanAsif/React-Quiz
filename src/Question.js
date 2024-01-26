import React from "react";
import Options from "./Options";

export default function Question({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} answer={answer} dispatch={dispatch} />
    </div>
  );
}
