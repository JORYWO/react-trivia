import { useState } from 'react';
import { FormDataContext } from "./Context/FormDataContext"
import FrontPage from "./pages/FrontPage"
import FiveQuestionsPage from "./pages/FiveQuestionsPage"


export default function App(){
  const [startGame, setStartGame] = useState(false)

  const changeGameState = (event) => {
    event.preventDefault()
    setStartGame((prev) => !prev)
  }

  return (
    <FormDataContext>
    <main>
      {!startGame ? 
        <FrontPage 
          changeGameState={changeGameState} 
        /> 
      : 
        <FiveQuestionsPage 
          changeGameState={changeGameState}
        />
      }
    </main>
    </FormDataContext>
  )
}