import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import he from "he";

export default function Quiz(props) {
  const { difficulty, category, setStartQuiz } = props;

  const [questions, setQuestions] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [error, setError] = React.useState("");

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  //   function getAnswers(questionObj) {
  //     let correctAnswer = [questionObj.correct_answer];
  //     let allAnswers = questionObj.incorrect_answers;
  //     allAnswers = allAnswers.concat(correctAnswer);
  //     allAnswers = shuffle(allAnswers);

  //     return allAnswers;
  //   }

  // Establish category colors
  React.useEffect(() => {
    let getCategory = category === "any" ? "" : `&category=${category}`;

    const apiUrl = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple${getCategory}`;

    const catColors = {
      "Science: Computers": "#EDBB99",
      "Science: Gadgets": "#EDBB99",
      "Science & Nature": "lightgreen",
      "Science: Mathematics": "whitesmoke",
      "Entertainment: Television": "#AED6F1",
      "Entertainment: Film": "#A9CCE3",
      "Entertainment: Board Games": "#9fefe7",
      "Entertainment: Video Games": "#CCCCFF",
      "Entertainment: Books": "#E9967A",
      "Entertainment: Japanese Anime & Manga": "#9FE2BF",
      "Entertainment: Music": "#ffe599",
      "Entertainment: Cartoon & Animations": "#f5ffb2",
      "Entertainment: Comics": "#f5ffb2",
      "Entertainment: Musicals & Theatres": "#a39ec5",
      Sports: "#D2B4DE",
      Politics: "#D7BDE2",
      Vehicles: "#E6B0AA",
      Mythology: "#A3E4D7",
      "General Knowledge": "lightgra,",
      Geography: "#A2D9CE",
      Celebrities: "#A9DFBF",
      Art: "#F9E79F",
      Animals: "#FAD7A0",
      History: "#F5CBA7",
    };

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((questionObj) => ({
            ...questionObj,
            isAnswered: false,
            isCorrect: false,
            questionId: nanoid(),
            question: he.decode(questionObj.question),
            catColor: catColors[questionObj.category],
            answers: function () {
              let correctAnswer = [questionObj.correct_answer];
              let allAnswers = questionObj.incorrect_answers;
              allAnswers = allAnswers.concat(correctAnswer);
              allAnswers = shuffle(allAnswers);

              return allAnswers.map((answer) => ({
                answerId: nanoid(),
                answerLabel: he.decode(answer),
                isChecked: false,
                isCorrect: answer === questionObj.correct_answer ? true : false,
              }));
            },
          }))
        )
      );
  }, [difficulty, category]);

  // Function for setting answers checked, returns new answers object array.
  /* Params:
   * question object in the state's array
   * the questionId containing the clicked answer.
   * the answerId of the clicked answer.
   */
  function setChecked(questionObj, questId, aid) {
    return questionObj.answers.map((answer) => {
      // If the answer selected is equal to this item in the array, set true //
      if (questionObj.questionId === questId) {
        return {
          ...answer,
          isChecked: aid === answer.answerId ? true : false,
        };
      } else {
        return { ...answer };
      }
    });
  }

  // Function for determining if question has a selected answer. Returns boolean
  // function checkIfAnswered(questionObj) {
  //     let imAnswered = false;
  //     for(let i=0; i < questionObj.answers.length; i++) {
  //         let ans = questionObj.answers[i]
  //         imAnswered = (ans.isChecked) ? true : imAnswered;
  //     }
  //     return imAnswered;
  // }

  // Function for checking if the selected answer is correct. Returns boolean
  function scoreQuestion(questionObj) {
    let myScore = false;
    if (questionObj.isAnswered) {
      for (let i = 0; i < questionObj.answers.length; i++) {
        let ans = questionObj.answers[i];
        if (
          ans.isChecked &&
          ans.answerLabel === he.decode(questionObj.correct_answer)
        ) {
          myScore = true;
        }
      }
    }

    return myScore;
  }

  // Function for handling onChange, returns new array of question objects
  function handleChange(event) {
    /* Bring in variables from event.target:
     * - the answerId of the clicked answer
     * - the questionId of the question, held in name.
     */
    const { id, name } = event.target;

    setQuestions((prevQuestions) =>
      prevQuestions.map((quest) => {
        let newQuestion = { ...quest };
        // Set new answers array, pass the id that was checked //
        newQuestion.answers = setChecked(newQuestion, name, id);

        // If the selected item was in this question in the array, set isAnswered to true.//
        newQuestion.isAnswered =
          name === newQuestion.questionId ? true : newQuestion.isAnswered;

        // Figure out if question was answered correctly //
        newQuestion.isCorrect = scoreQuestion(newQuestion);

        return newQuestion;
      })
    );
  }

  function handleSubmit() {
    if (!submitted) {
      let errorOut = false;
      setError("");
      // If not submitted, score the game.
      let totalScore = 0;
      for (let i = 0; i < 10; i++) {
        let thisQuestion = questions[i];
        if (!thisQuestion.isAnswered) {
          setError("You forgot to answer some questions!");
          errorOut = true;
        } else {
          if (thisQuestion.isCorrect) {
            totalScore++;
          }
        }
      }
      if (!errorOut) {
        setSubmitted(true);
        setScore(totalScore);
        setError("");
      }
    } else {
      // If submitted, reset the game.
      setSubmitted(false);
      setScore(0);
      setStartQuiz(false);
    }
  }

  const renderQuestions = questions.map((question) => {
    return (
      <Question
        key={question.questionId}
        question={question}
        answers={question.answers}
        handleChange={handleChange}
        submitted={submitted}
      />
    );
  });

  const quizStyles = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div className="container" style={quizStyles}>
      <h2>
        Quizzical <span className="alpha">({difficulty})</span>
      </h2>
      {renderQuestions}
      {error !== "" && (
        <span
          style={{
            color: "red",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {error}
        </span>
      )}
      <div className="container-finish">
        <button className="button-normal" onClick={handleSubmit}>
          {submitted ? "New Game" : "Submit Answers"}
        </button>
        {submitted && (
          <button className="score">
            Score:
            <br />
            {score}/10
          </button>
        )}
      </div>
    </div>
  );
}

/*
[
    {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "In past times, what would a gentleman keep in his fob pocket?",
        correct_answer: "Watch",
        incorrect_answers: ["Money", "Keys", "Notebook"]
    }
]
*/
