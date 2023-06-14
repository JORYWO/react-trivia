import React from 'react'

export default function QuizButton(props){
  return (
    <button type="submit" className="game-button" onClick={props.changeGameState}>Start Quiz</button>   
  )
}

