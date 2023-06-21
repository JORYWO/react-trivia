import { useState, useEffect } from "react"
import axios from "axios"
import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

import Question from "../components/Question"
import Spinner from "../components/Spinner"

export default function TimedPage(){
  const {formData} = useFormData();
  const { changeGameMode } = useGameModeData()

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [playingGame, setPlayingGame] = useState(true);
  const [timer, setTimer] = useState(formData.time)


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    initialiseGame()
  }, [score])


  const initialiseGame = () => {
    setIsLoading(true)
    setPlayingGame(true)
    getQuestions()
  }

  const getQuestions = async () => {
    if (playingGame) {
      setIsLoading(true);
      const probabilities = {easy: 0.6, medium: 0.30, hard: 0.10,};
      const questions = [];

      for (let i = 0; i < 5; i++) {
        const randomValue = Math.random();
        let difficulty;

        if (randomValue < probabilities.easy) {
          difficulty = 'easy';
        } else if (randomValue < probabilities.easy + probabilities.medium) {
          difficulty = 'medium';
        } else {
          difficulty = 'hard';
        }

        const res = await axios.get(
          `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`
        );
        questions.push(res.data[0]);
      }

      setQuestions(questions);
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
      key={index}
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
    let formattedTime = ""
    if (minutes > 0) {
      formattedTime += `${minutes} minute${minutes === 1 ? '' : 's'}`;
    }
    if (seconds > 0) {
      formattedTime += `${minutes > 0 ? ' and ' : ''}${seconds} second${seconds === 1 ? '' : 's'}`;
    }
    return formattedTime;
  };
  
  
  if (isLoading) {
    return (<Spinner/>)
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
          <button className="game-button" onClick={() => {
            setPlayingGame(false)
          }}>
          Check Answers
          </button>
      </>
      ) : (
        <div className="timedPage-finishedText">
          <p>{formData.time} Seconds Completed</p>
          <p>Your Score was: {score}</p>
          <h2></h2>
        </div>
      )}
    </>
  );
}
