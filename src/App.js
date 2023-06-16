import { FormDataContext } from "./Context/FormDataContext"
import { useGameModeData } from './Context/GameModeContext';
import { FrontPage, FiveQuestionsPage, HighScorePage, TimedPage } from "./pages/exports"


export default function App(){
  const {gameMode} = useGameModeData();
  
  const GameModeEnum = [
    { label: 'FrontPage', value: 0, component: <FrontPage />},
    { label: 'FiveQuestions', value: 1, component: <FiveQuestionsPage /> },
    { label: 'HighScore', value: 2, component: <HighScorePage />},
    { label: 'Timed', value: 3, component: <TimedPage />},
  ];

  
  return (
    <FormDataContext>
    <main>
      {GameModeEnum[gameMode].component}
    </main>
    </FormDataContext>
  )
}