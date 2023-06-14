import { useState, useEffect } from "react"
import Question from "../components/Question";
import Spinner from "../components/Spinner";
import axios from "axios"

export default function HighScorePage(){
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState([])
  const [score, setScore] = useState(0)
  const [playingGame, setPlayingGame] = useState(true)
  // const {formData} = useContext(FormDataContext);
  
  const initaliseGame = () => {
    setIsLoading(true)
    setPlayingGame(true)
    setScore(0)
    getQuestion()
  }

  useEffect(() => {
    initaliseGame()
  },[])

  const getQuestion = async () => {
    const res = await axios.get("https://the-trivia-api.com/api/questions?limit=1")
    setQuestion(res.data)
    setIsLoading(false)
  }
  
  const increaseScore = () =>{
    setScore((prevScore) => prevScore + 1) 
  }

  if (isLoading) {
    return (<Spinner/>)
  }

  return(
    <>
    <div>
      <h1>Score: </h1>
      <h3>Answering wrong ends the game</h3>
    </div>
    <Question
      question={question[0].question}
      correctAns={question[0].correctAnswer}
      wrongAns={question[0].incorrectAnswers}
      increaseScore={increaseScore}
      playingGame={playingGame} 
    />
    </>
  )
}