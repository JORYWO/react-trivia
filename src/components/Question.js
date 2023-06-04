import {useState, useEffect} from "react"

export default function Question(props){
    const [answers, setAnswers] = useState([])

    useEffect(() => {
      const answersArray = props.wrongAns
      //insert correct answer at random position in array
      answersArray.splice(Math.floor(Math.random() * answers.length), 0, props.correctAns)
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

    const checkAnswers = () =>{
      if (!props.playingGame){
        answers.forEach((btn) => {
          if (btn.isSelected && btn.value === props.correctAns){
            props.increaseScore()
          }
        })
      }
    }

    const buttonColour = (btn) => {
      let colour = "white"
      if (props.playingGame){
        if (btn.isSelected) colour = "#d6dbf5"
      } else{
        if (btn.isSelected && btn.value === props.correctAns) colour = "#94D7A2"
          else {
            if (btn.isSelected) colour = "#F8BCBC"
            else if (btn.value === props.correctAns) colour = "#94D7A2"
          }
        }
      return colour
    }

    const buttonElements = answers.map(btn => (
      <button 
        className="answer-element" 
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
        <div className="answer-list">
          {buttonElements}
        </div>
        <hr></hr>
      </div>
    )
}