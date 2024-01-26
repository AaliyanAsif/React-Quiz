import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],
  statuss: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, statuss: "ready" };
    case "dataFailed":
      return {
        ...state,
        statuss: "error",
      };
    case "start":
      return {
        ...state,
        statuss: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [{ questions, statuss, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {statuss === "loading" && <Loader />}
        {statuss === "error" && <Error />}
        {statuss === "ready" && (
          <StartScreen dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {statuss === "active" && (
          <>
            <Progress
              index={index + 1}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              questions={questions[index]}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
