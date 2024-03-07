import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/QuizProvider";

export default function Question() {
  const { questions: q, index } = useQuiz();

  const questions = q[index];

  return (
    <div>
      <h4>{questions.question}</h4>
      <Options />
    </div>
  );
}
