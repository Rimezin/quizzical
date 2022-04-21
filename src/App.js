import React from "react";
import Quiz from "./Quiz";
import Splash from "./Splash";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("easy");
  const [category, setCategory] = React.useState("");
  const [dark, setDark] = React.useState(false);

  function setTextAnimation() {
    let paths = document.querySelectorAll(".splash-logo");
    //let mode = repeat ? "infinite" : "forwards";
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const length = path.getTotalLength();
      path.style["stroke-dashoffset"] = `${length}px`;
      path.style["stroke-dasharray"] = `${length}px`;
      path.style["stroke-width"] = `2px`;
      path.style["stroke"] = dark ? "#aca7c8" : "#483d8b";
      path.style["animation"] = `2.9s svg-text-anim forwards linear`;
      path.style["animation-delay"] = `${i * 0.1}s`;
    }
  }

  function clickStart(event) {
    event.preventDefault();
    setStartQuiz((startQuiz) => !startQuiz);
  }

  function chooseDifficulty(event) {
    setDifficulty(event.target.value.toLowerCase());
  }
  function chooseCategory(event) {
    setCategory(event.target.value);
  }

  // Random click event to stimulate the logo animation //
  //React.useEffect(() => {
  setTextAnimation();
  //}, []);

  function handleDark(event) {
    event.preventDefault();
    setDark(!dark);
  }

  return (
    <div className={dark ? "body body-dark" : "body"}>
      {!startQuiz && (
        <Splash
          clickStart={clickStart}
          chooseDifficulty={chooseDifficulty}
          chooseCategory={chooseCategory}
          dark={dark}
          handleDark={handleDark}
        />
      )}
      {startQuiz && (
        <Quiz
          difficulty={difficulty}
          category={category}
          setStartQuiz={setStartQuiz}
          dark={dark}
          handleDark={handleDark}
        />
      )}
    </div>
  );
}
