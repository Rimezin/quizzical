import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  const { question, answers, handleChange, submitted } = props;

  const renderAnswers = answers.map((ans) => {
    return (
      <Answer
        key={ans.answerId}
        answer={ans}
        questionId={question.questionId}
        handleChange={handleChange}
        submitted={submitted}
      />
    );
  });

  return (
    <div className="quiz-question">
      <span className="quiz-cat" style={{ backgroundColor: question.catColor }}>
        {question.category}
      </span>
      <h3>{question.question}</h3>
      <fieldset>{renderAnswers}</fieldset>

      <hr />
    </div>
  );
}
