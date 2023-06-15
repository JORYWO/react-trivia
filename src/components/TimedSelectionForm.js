import { useFormData } from '../Context/FormDataContext';
import { useGameModeData } from '../Context/GameModeContext';

export default function ChooseTime(props) {
  const {formData, handleChange} = useFormData();
  const { changeGameMode } = useGameModeData()

  return (
    <form className="frontpage-elements">
    <fieldset>
    <label htmlFor="time">Choose Time</label>
    <br />
    <select 
        id="time"
        value={formData.time}
        onChange={handleChange}
        name="time"
      >
      <option value="30">30 Seconds</option>
      <option value="60">60 Seconds</option>
      <option value="120">2 Minutes</option>
      <option value="300">5 Minutes</option>
      <option value="420">7 Minutes</option>
      <option value="600">10 Minutes</option>
    </select>
    </fieldset>   
    <button type="submit" className="game-button" onClick={() => changeGameMode(3)}>Start Quiz</button>
    </form>
  )
}