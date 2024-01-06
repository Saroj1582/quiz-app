import { useState } from "react";
import { data } from "./data";
import "./App.css";
import Trivia from "./components/Trivia";
import { useEffect } from "react";
import { useMemo } from "react";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOver, setTimeOver] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [username, setUsername] = useState(null);
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$100" },
        { id: 2, amount: "$200" },
        { id: 3, amount: "$300" },
        { id: 4, amount: "$500" },
        { id: 5, amount: "$1000" },
        { id: 6, amount: "$2000" },
        { id: 7, amount: "$4000" },
        { id: 8, amount: "$8000" },
        { id: 9, amount: "$16000" },
        { id: 10, amount: "$32000" },
        { id: 11, amount: "$64000" },
        { id: 12, amount: "$125000" },
        { id: 13, amount: "$250000" },
        { id: 14, amount: "$500000" },
        { id: 15, amount: "$1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber, moneyPyramid]);

  return (
    <>
      <div className="app">
        {username ? (
          <>
            <div className="main">
              {timeOver ? (
                <h1 className="earned">Your Earned: {earned}</h1>
              ) : (
                <>
                  <div className="top">
                    <div className="timer">
                      <Timer
                        setTimeOver={setTimeOver}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>
                  <div className="bottom">
                    <Trivia
                      data={data}
                      setQuestionNumber={setQuestionNumber}
                      questionNumber={questionNumber}
                      timeOver={timeOver}
                      setTimeOver={setTimeOver}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyPyramid.map((item) => (
                  <li
                    key={item.id}
                    className={
                      questionNumber === item.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                  >
                    <span className="moneyListItemNumber">{item.id}</span>
                    <span className="moneyListItemAmount">{item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Start setUsername={setUsername} />
        )}
      </div>
    </>
  );
}

export default App;
