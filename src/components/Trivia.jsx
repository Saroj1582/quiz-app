import { useEffect } from "react";
import { useState } from "react";
import { useSound } from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

function Trivia({
  data,
  setQuestionNumber,
  questionNumber,
  timeOver,
  setTimeOver,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [newClassName, setClassName] = useState("option");
  let [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);

  useEffect(() => {
    setCurrentQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  function delay(duration, callback) {
    setTimeout(() => {
      callback();
    }, duration);
  }

  function handleClick(ans) {
    setSelectedAnswer(ans);
    setClassName("option active");
    delay(2000, () =>
      setClassName(ans.correct ? "option correct" : "option wrong")
    );
    delay(5000, () => {
      if (ans.correct) {
        correctAnswer();
        delay(3000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOver(true);
        });
      }
    });
  }

  return (
    <>
      <div className="trivia">
        <div className="question">{currentQuestion?.question}</div>
        <div className="answer">
          {currentQuestion?.answers.map((ans) => (
            <div
              key={ans.text}
              className={selectedAnswer === ans ? newClassName : "option"}
              onClick={() => handleClick(ans)}
            >
              {ans.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trivia;
