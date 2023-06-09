import {useState, useEffect} from "react"

export default function Question(props){
  let green = "#94D7A2"
  let lightBlue = "#d6dbf5" 
  let lightRed = "#F8BCBC"
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const answersArray = props.wrongAns
    //insert correct answer at random position in array
    const randomPos = Math.floor(Math.random() * (answersArray.length + 1))
    answersArray.splice(randomPos, 0, props.correctAns)
  setAnswers(generateAnswerList(answersArray))
  }, [props.question])

  useEffect(() => {
    checkAnswers()
  }, [props.playingGame])

  const buttonSelection = (id) => {
    //only select buttons when playing game
    if (props.playingGame) {
      setAnswers(oldAns => oldAns.map(ans => {
        return ans.id === id ? 
          {...ans, isSelected: !ans.isSelected} :
          {...ans, isSelected: false}
      }))
    }
  }

  const generateAnswerList = (answerList) =>{
    const newBtns = []
    for (let i=0; i<answerList.length; i++){
      newBtns.push(generateNewButton(answerList[i], i))
    }
    return newBtns
  }

  const generateNewButton = (question, uniqueId) =>{
    return {
      value: question,
      isSelected: false,
      id: uniqueId
    }
  }

  const checkAnswers = () => {
    if (!props.playingGame) {
      const selectedAnswer = answers.find((btn) => btn.isSelected);
      if (selectedAnswer && selectedAnswer.value === props.correctAns) {
        props.increaseScore(true);
      } else {
        props.increaseScore(false);
      }
    }
  };

  const buttonColour = (btn) => {
    let colour = "white"
    if (props.playingGame){
      if (btn.isSelected) colour = lightBlue
    } else{
      if (btn.isSelected && btn.value === props.correctAns) colour = green
        else {
          if (btn.isSelected) colour = lightRed
          else if (btn.value === props.correctAns) colour = green
        }
      }
    return colour
  }

  const buttonElements = answers.map(btn => (
    <button 
      className="question-answerElement" 
      key={btn.id} 
      style={{backgroundColor: buttonColour(btn)}}
      onClick={() => buttonSelection(btn.id)}
    >
    {btn.value}
    </button>
  ))

  return (
    <div className="question">
      <h3>{props.question}</h3>
      <div className="question-answerList">
        {buttonElements}
      </div>
      <hr></hr>
    </div>
  )
}