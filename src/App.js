import { useState } from "react"

import FrontPage from "./pages/FrontPage"
import TriviaPage from "./pages/TriviaPage"

export default function App(){
  const initialSettings = {
    difficulty: "",
    category: "",
  }

  const [startGame, setStartGame] = useState(false)
  const [formData, setFormData] = useState(initialSettings)


  const changeGameState = (event) => {
    event.preventDefault()
    setStartGame((prev) => !prev)
  }

  return (
    <main>
      {!startGame ? 
        <FrontPage 
        changeGameState={changeGameState} 
        formData={formData} 
        setFormData={setFormData}
        /> 
      : 
        <TriviaPage 
          settings={formData} 
          changeGameState={changeGameState}
        />
      }
    </main>
  )
}