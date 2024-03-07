import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizProvider";

export default function App() {
  // const [
  //   { questions, statuss, index, answer, points, highscore, secondsRemaining },
  //   dispatch,
  // ] = useReducer(reducer, initialState);

  // const numOfQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0
  // );
  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  const { statuss } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {statuss === "loading" && <Loader />}
        {statuss === "error" && <Error />}
        {statuss === "ready" && <StartScreen />}
        {statuss === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
      </Main>

      {statuss === "finished" && <FinishScreen />}
    </div>
  );
}
