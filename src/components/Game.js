import React, { Component } from "react";
import Question from "./Question";

const dummyQuestion = {
  question: "What's the best programming language?",
  answerChoices: ["JavaScript", "Rust", "C#", "Go"]
};

export default class Game extends Component {
  async componentDidMount() {
    const url = `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple`;
    try {
      const res = await fetch(url);
      const { results } = await res.json();
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <>
        <Question question={dummyQuestion} />
      </>
    );
  }
}
