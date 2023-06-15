import { useState } from "react"
import FiveQuestions from "../components/FiveQuestionsForm"
import TimedSelectionForm from "../components/TimedSelectionForm"

export default function FrontPage(props){
  const [selectedOption, setSelectedOption] = useState('');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
  };

  let content = "";

  if (selectedOption === 'one') {
    content = <FiveQuestions changeGameState={props.changeGameState}/>;
  } else if (selectedOption === 'two') {
    content = <button type="submit" className="game-button" onClick={() => console.log("dsfjgh")}>Start Quiz</button>;
  } else if (selectedOption === 'three') {
    content = <TimedSelectionForm />;
  }

  return (
    <div className="center">
      <div className="card">
        <h1 className="frontpage-title">Quizzical</h1>
        <div className="title">Select mode</div>
        <div className="content">
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
      <div className="rendered-content">
        {content}
      </div>
    </div>
  )
}