import { React, useState } from "react";
import "./Main.css";
import Paper from "./images/icon-paper.svg";
import Rock from "./images/icon-rock.svg";
import Scissor from "./images/icon-scissors.svg";
import Logo from "./images/logo.svg";
import Triangle from "./images/bg-triangle.svg";
import Close from "./images/icon-close.svg";
import Rules from "./images/image-rules.svg";

export default function Main() {
  var [score, setScore] = useState(0);

  var [rules, setRules] = useState(false);

  var [bot, setBot] = useState("");

  var [played, setPlayed] = useState(false);

  var [chosen, setChosen] = useState("");

  var [botChosen, setBotChosen] = useState("");

  var [botImg, setBotImg] = useState();

  var [playerImg, setPlayerImg] = useState();

  var [result, setResult] = useState();

  function playPart2(x) {
    var bot_choice = Math.floor(Math.random() * 3);
    if (bot_choice == 0) {
      bot_choice = "rock";
      setBotChosen("r");
      setBotImg(Rock);
    } else if (bot_choice == 1) {
      bot_choice = "paper";
      setBotChosen("b");
      setBotImg(Paper);
    } else if (bot_choice == 2) {
      bot_choice = "scissors";
      setBotChosen("y");
      setBotImg(Scissor);
    }

    // 0 = rock
    // 1 = paper
    // 2 = scissors

    if (
      (x == Rock && bot_choice == "rock") ||
      (x == Paper && bot_choice == "paper") ||
      (x == Scissor && bot_choice == "scissors")
    ) {
      setResult("TIE");
    } else if (
      (x == Rock && bot_choice == "paper") ||
      (x == Paper && bot_choice == "scissors") ||
      (x == Scissor && bot_choice == "rock")
    ) {
      setScore(score - 1);
      setResult("YOU LOSE");
    } else if (
      (x == Rock && bot_choice == "scissors") ||
      (x == Paper && bot_choice == "rock") ||
      (x == Scissor && bot_choice == "paper")
    ) {
      setScore(score + 1);
      setResult("YOU WIN");
    }
  }

  function play(x) {
    setPlayed(true);
    setPlayerImg(x);

    if (x == Paper) {
      setChosen("b");
    } else if (x == Rock) setChosen("r");
    else if (x == Scissor) setChosen("y");

    setTimeout(() => playPart2(x), 2000);
  }

  function playAgain() {
    setPlayed(false);
    setPlayerImg("");
    setChosen("");
    setResult("");
    setBotChosen("");
    setBotImg("");
  }

  return (
    <div className="back">
      {rules ? (
        <div className="rules-shadow">
          <div className="rules-box">
            <div className="top-rules-flex">
              <span className="rules-title">RULES{rules}</span>
              <img
                src={Close}
                onClick={() => setRules(!rules)}
                className="close"
              />
            </div>
            <img src={Rules} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="top-flex">
        <img src={Logo} />
        <div className="score-box">
          {" "}
          <span className="score-title">SCORE</span>{" "}
          <div className="score">{score}</div>
        </div>
      </div>
      {played ? (
        <div className="play-flex">
          {" "}
          <div className="play-flex-info">
            {" "}
            <span className="play-flex-title">YOU PICKED</span>{" "}
            {result == "YOU WIN" ? (
              <div className="win-circle1">
                <div className="win-circle2">
                  <div className="win-circle3">
                    <div className={`img-border-${chosen}-big-2`}>
                      <div className="img-holder-big">
                        <img src={playerImg} className="img-big" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`img-border-${chosen}-big`}>
                <div className="img-holder-big">
                  <img src={playerImg} className="img-big" />
                </div>
              </div>
            )}
          </div>{" "}
          {botChosen == "" ? (
            ""
          ) : (
            <div className="result-info">
              <div className="result">{result}</div>
              <div className="play-again" onClick={() => playAgain()}>
                PLAY AGAIN
              </div>
            </div>
          )}
          {botChosen == "" ? (
            <div className="play-empty"></div>
          ) : (
            <div className="play-flex-info">
              <span className="play-flex-title">THE HOUSE PICKED</span>
              {result == "YOU LOSE" ? (
                <div className="win-circle1">
                  <div className="win-circle2">
                    <div className="win-circle3">
                      {" "}
                      <div className={`img-border-${botChosen}-big-2`}>
                        <div className="img-holder-big">
                          <img src={botImg} className="img-big" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`img-border-${botChosen}-big`}>
                  <div className="img-holder-big">
                    <img src={botImg} className="img-big" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="img-box">
          <img src={Triangle} className="triangle" />
          <div className="top-imgs">
            <div onClick={() => setTimeout(() => play(Paper), 300)}>
              <div className="img-border-b">
                <div className="img-holder">
                  <img src={Paper} className="img" />
                </div>
              </div>
            </div>
            <div onClick={() => setTimeout(() => play(Scissor), 300)}>
              <div className="img-border-y">
                <div className="img-holder">
                  <img src={Scissor} className="img" />
                </div>
              </div>
            </div>
          </div>
          <div className="lower-imgs">
            {" "}
            <div onClick={() => setTimeout(() => play(Rock), 300)}>
              <div className="img-border-r">
                <div className="img-holder">
                  <img src={Rock} className="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {rules ? (
        ""
      ) : (
        <div className="rules" onClick={() => setRules(!rules)}>
          RULES
        </div>
      )}
    </div>
  );
}
