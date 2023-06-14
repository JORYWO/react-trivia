import { createContext, useState } from 'react';
import FrontPage from "./pages/FrontPage"
import TriviaPage from "./pages/FiveQuestionsPage"

export const FormDataContext = createContext();

export default function App(){
  const initialSettings = {
    difficulty: '',
    category: '',
  };

  const [formData, setFormData] = useState(initialSettings);
  const [startGame, setStartGame] = useState(false)

  const changeGameState = (event) => {
    event.preventDefault()
    setStartGame((prev) => !prev)
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
    <main>
      {!startGame ? 
        <FrontPage 
          changeGameState={changeGameState} 
        /> 
      : 
        <TriviaPage 
          changeGameState={changeGameState}
        />
      }
    </main>
    </FormDataContext.Provider>
  )
}