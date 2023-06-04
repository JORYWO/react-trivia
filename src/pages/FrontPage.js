export default function FrontPage(props){

  const handleChange = (event) => {
    const {name, value} = event.target
    props.setFormData(prevFormData => {
      return {
      ...prevFormData,
      [name]: value
      }
    })
  }

  return (
    <form className="frontpage-elements">
      <h1 className="frontpage-title">Quizzical</h1>
      <fieldset>
        <label htmlFor="difficulty">Choose Difficulty - Leave blank for random difficulty</label>
        <br />
        <select 
          id="difficulty"
          value={props.formData.difficulty}
          onChange={handleChange}
          name="difficulty"
        >
          <option value=""></option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />

        <label htmlFor="category">Choose Categories - Leave blank for random category</label>
        <br />
        <select 
          id="category"
          value={props.formData.category}
          onChange={handleChange}
          name="category"
        >
          <option value=""></option>
          <option value="general_knowledge">General Knowledge</option>
          <option value="arts_and_literature">Arts & Literature</option>
          <option value="film_and_tv">Film & TV</option>
          <option value="food_and_drink">Food & Drink</option>
          <option value="geography">Geography</option>
          <option value="history">History</option>
          <option value="music">Music</option>
          <option value="science">Science</option>
          <option value="society_and_culture">Society & Culture</option>
          <option value="sport_and_leisure">Sport & Leisure</option>
        </select>
      </fieldset>
      <button type="submit" className="game-button" onClick={props.changeGameState}>Start Quiz</button>   
    </form>
  )
}