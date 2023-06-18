import { useState } from "react"
import FiveQuestionsForm from "../components/FiveQuestionsForm"
import TimedSelectionForm from "../components/TimedSelectionForm"
import { useGameModeData } from '../Context/GameModeContext';

export default function FrontPage(){
  const { changeGameMode } = useGameModeData()
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
  };

  let content = "";

  if (selectedOption === 'one') {
    content = <FiveQuestionsForm />;
  } else if (selectedOption === 'two') {
    content = <button type="submit" className="game-button" onClick={() => changeGameMode(2)}>Start Quiz</button>;
  } else if (selectedOption === 'three') {
    content = <TimedSelectionForm />;
  }

  return (
    <div className="frontpage-center-container">
      <div className="frontpage-card">
        <h1 className="frontpage-title">Quizzical</h1>
        <h3>Select mode</h3>
        <div>
          <input
            type="radio"
            id="one"
            checked={selectedOption === 'one'}
            onChange={handleRadioChange}
            />
          <input
            type="radio"
            id="two"
            checked={selectedOption === 'two'}
            onChange={handleRadioChange}
            />
          <input
            type="radio"
            id="three"
            checked={selectedOption === 'three'}
            onChange={handleRadioChange}
            />
          <label htmlFor="one" className="box first">
            <span className="yearly">5 Questions</span>
          </label>
          <label htmlFor="two" className="box second">
            <span className="yearly">High Score</span>
          </label>
          <label htmlFor="three" className="box third">
            <span className="yearly">Timed</span>
          </label>
        </div>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}