export default function ChooseTime() {
  return (
    <form className="frontpage-elements">
    <fieldset>
    <label htmlFor="category">Choose Time</label>
    <br />
    <select 
      id="time"
      // value={formData.category}
      // onChange={handleChange}
      name="category"
      >
      <option value="30">30 Seconds</option>
      <option value="60">60 Seconds</option>
      <option value="120">2 Minutes</option>
      <option value="300">5 Minutes</option>
      <option value="420">7 Minutes</option>
      <option value="600">10 Minutes</option>
    </select>
    </fieldset>   
    <button type="submit" className="game-button" onClick={console.log("dsfjgh")}>Start Quiz</button>
    </form>
  )
}