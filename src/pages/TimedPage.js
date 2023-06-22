import { useState, useEffect } from "react";
import Question from "../components/Question";
import Spinner from "../components/Spinner";
import { fetchRandQuestions } from "./exports";

import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

export default function TimedPage(){
  const { formData } = useFormData();
  const { changeGameMode } = useGameModeData();

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [playingGame, setPlayingGame] = useState(true);
  const [timer, setTimer] = useState(formData.time);
  const [questionKey, setQuestionKey] = useState(0); // New state for remounting Question component

  useEffect(() => {
    let interval = null;

    // countdown only updates when not loading
    if (!isLoading) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  useEffect(() => {
    initialiseGame();
  }, [score, playingGame]);

  const resetGame = () => {
    setTimer(formData.time);
    if (score === 0){
      initialiseGame();
    } else{
      setScore(0); // setting score will restart game
    }
  }

  const initialiseGame = () => {
    getQuestions();
    setPlayingGame(true);
    setQuestionKey((prevKey) => prevKey + 1); // Update the question key
  };

  const getQuestions = async () => {
    if (playingGame) {
      setIsLoading(true);

      const fetchQuestions = await fetchRandQuestions();
      setQuestions(fetchQuestions);
      setIsLoading(false);
    }
  };

  const increaseScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => {
        const updatedScore = prevScore + 1;
        initialiseGame(); // Call initialiseGame after updating the score
        return updatedScore;
      });
    }
  };

  const questionList = questions.map((question, index) => (
    <Question
      key={`${questionKey}_${index}`} // Include the questionKey in the key prop
      question={question.question}
      correctAns={question.correctAnswer}
      wrongAns={question.incorrectAnswers}
      increaseScore={increaseScore}
      playingGame={playingGame}
    />
  ));

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    let formattedTime = "";
    if (minutes > 0) {
      formattedTime += `${minutes} minute${minutes === 1 ? "" : "s"}`;
    }
    if (seconds > 0) {
      formattedTime += `${minutes > 0 ? " and " : ""}${seconds} second${seconds === 1 ? "" : "s"}`;
    }
    return formattedTime;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {timer > 0 ? (
        <>
          <div className="timedPage-heading">
            <p>Score: {score}</p>
            {formatTime()}
          </div>
          {questionList}
          <button className="game-button"
            onClick={() => setPlayingGame(false)}
          >
            Check Answers
          </button>
        </>
      ) : (
        <div className="timedPage-finishedText">
          <p>{formData.time} Seconds Completed</p>
          <p>Your Score was: {score}</p>
          <div className="play-again-text">
            <button className="game-button" onClick={() => changeGameMode(0)}>
              Go Back
            </button>
            <button
              className="game-button"
              onClick={() => resetGame()}
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </>
  );
}