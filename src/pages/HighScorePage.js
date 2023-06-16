import { useState, useEffect } from "react";
import Question from "../components/Question";
import Spinner from "../components/Spinner";
import axios from "axios";

export default function HighScorePage() {
  const QUESTIONNUMBER = 1;
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [playingGame, setPlayingGame] = useState(true);
  const [showLoserText, setShowLoserText] = useState(false);

  const initialiseGame = () => {
    setPlayingGame(true);
    setIsLoading(true);
    getQuestions();
  };

  useEffect(() => {
    initialiseGame();
  }, []);

  const getQuestions = async () => {
    const res = await axios.get(`https://the-trivia-api.com/api/questions?limit=${QUESTIONNUMBER}`);
    setQuestions(res.data);
    setIsLoading(false);
  };

  const increaseScore = (isCorrect) => {
    console.log(isCorrect)
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      initialiseGame()
    }
    else {
      setShowLoserText(true);
    }
  };

  const questionList = questions.map((question, index) => (
    <Question
      key={index}
      question={question.question}
      correctAns={question.correctAnswer}
      wrongAns={question.incorrectAnswers}
      increaseScore={isCorrect => increaseScore(isCorrect)}
      playingGame={playingGame}
    />
  ));

  if (isLoading) {
    return <Spinner />;
  }

  if (showLoserText) {
    return <h1>Loser</h1>;
  }

  return (
    <>
      <div className="trivia__highScorePage-container">
        <h1 className="trivia__highScorePage-heading">Score: {score}</h1>
        <h3>Answering any question wrong ends the game</h3>
      </div>
      {questionList}
      {playingGame && (
        <button className="game-button" onClick={() => setPlayingGame(false)}>
          Check Answers
        </button>
      )}
    </>
  );
}