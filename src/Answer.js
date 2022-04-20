import React from "react";

export default function Answer(props) {
  const { questionId, answer, handleChange, submitted, dark } = props;

  // Determine styling for answer //
  function setBackground() {
    let bgColor;

    if (!submitted) {
      // If not submitted, check for dark //
      if (dark) {
        bgColor = answer.isChecked ? "darkslateblue" : "#2d2a4c";
      } else {
        bgColor = answer.isChecked ? "#a39ec5" : "white";
      }
    } else if (answer.isChecked) {
      // If submitted and checked.
      bgColor = answer.isCorrect ? "#9ec5a3" : "#c5a39e";
    } else if (!answer.isChecked) {
      // If submitted and not checked.
      bgColor = answer.isCorrect ? "#9ec5a3" : "gray";
    }

    return bgColor;
  }

  const answerStyling = {
    backgroundColor: setBackground(),
  };

  // Function to simulate <input> click if user clicks outside of text
  function handleClick() {
    document.getElementById(answer.answerId).click();
  }

  function answerClass() {
    let aClass = dark
      ? "question-answer question-answer-dark"
      : "question-answer";
    if (submitted) {
      aClass += " disabled";
    }

    console.log(aClass);
    return aClass;
  }

  return (
    <div className={answerClass} style={answerStyling} onClick={handleClick}>
      <input
        value={answer.answerLabel}
        type="radio"
        name={questionId}
        id={answer.answerId}
        checked={answer.isChecked}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <label htmlFor={answer.answerId}>{answer.answerLabel}</label>
    </div>
  );
}
