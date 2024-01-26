import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  statuss: "loading",
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
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [{ questions, statuss }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
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
        {statuss === "ready" && <StartScreen numOfQuestions={numOfQuestions} />}
      </Main>
    </div>
  );
}
