import { useState, useEffect } from "react"
import axios from "axios"
import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

import Question from "../components/Question"
import Spinner from "../components/Spinner"

export default function TriviaPage(props){
  const {formData} = useFormData();
  const { changeGameMode } = useGameModeData()
  
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [playingGame, setPlayingGame] = useState(true)
  
  
  const initialiseGame = () => {
    setIsLoading(true)
    setPlayingGame(true)
    setScore(0)
    getQuestions()
  }

  useEffect(() => {
    initialiseGame()
  },[])

  const getQuestions = async () => {
    const difficulty = formData.difficulty ? `difficulty=${formData.difficulty}` : ""
    const category = formData.category ? `categories=${formData.category}&` : ""
    const res = await axios.get(`https://the-trivia-api.com/api/questions?${category}limit=5&${difficulty}`)
    setQuestions(res.data)
    setIsLoading(false)
  }
  
  const increaseScore = (isCorrect) =>{
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  }

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

  if (isLoading) {
    return (<Spinner/>)
  }

  else {
    return(
      <>
        {questionList}
        {playingGame && <button className="game-button" onClick={() => setPlayingGame(false)}>Check Answers</button>}
        {!playingGame && 
        <div className="play-again-text">
          <button className="game-button" onClick={() => changeGameMode(0)}>Go Back</button>
          <h4 className="fiveQuestionsPage-answerText">You scored {score}/{questionList.length} correct answers</h4>
          <button className="game-button" onClick={() => initialiseGame()}>Play again</button>
        </div>
        }
      </>

    )
  }
}