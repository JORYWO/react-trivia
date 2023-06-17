import { useState, useEffect } from "react";
import Question from "../components/Question";
import Spinner from "../components/Spinner";
import axios from "axios";

import { useGameModeData } from '../Context/GameModeContext';

export default function HighScorePage() {
  const QUESTIONNUMBER = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [playingGame, setPlayingGame] = useState(true);
  const [showLoserText, setShowLoserText] = useState(false);

  const { changeGameMode } = useGameModeData()


  const resetGame = () => {
    setShowLoserText(false);
    setPlayingGame(true);
  };
  
  // User answers all questions right and resets questions
  const initialiseGame = () => {
    if (score === QUESTIONNUMBER) {
      resetGame();
    }
  };
  
  // User Clicks Play Again Button
  const handlePlayAgain = () => {
    setScore(0);
    resetGame();
  };

  useEffect(() => {
    initialiseGame();
  }, [score]);

  useEffect(() => {
    if (playingGame){
      getQuestions()
    }
  }, [playingGame])

  const getQuestions = async () => {
    if (playingGame) {
      setIsLoading(true);
      const res = await axios.get(`https://the-trivia-api.com/api/questions?limit=${QUESTIONNUMBER}&medium`)
      setQuestions(res.data);
      setIsLoading(false);
    }
  };

  const increaseScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    else {
      setShowLoserText(true);
      setPlayingGame(false)
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

  return (
    <>
      {!showLoserText ? (
      <div className="trivia__highScorePage-container">
        <h1>Score: {score}</h1>
        <h3>Answering any question wrong ends the game</h3>
      </div>
      ) : (
      <div className="trivia__highScorePage-loserContainer">
        <h1>You Lost!</h1>
        <p>Your Score was: {score}</p>
      </div>
      )}

      {questionList}
      {!showLoserText ? (
        <button className="game-button" onClick={() => setPlayingGame(false)}>
          Check Answers
        </button>
      ) : (
        <div className="play-again-text">
          <button className="game-button" onClick={() => changeGameMode(0)}>Go Back</button>
          <button className="game-button" onClick={() => handlePlayAgain()}>Play again</button>
        </div>
      )}
    </>
  );
}