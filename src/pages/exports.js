import axios from "axios"

export { default as FiveQuestionsPage } from "./FiveQuestionsPage"
export { default as FrontPage } from "./FrontPage"
export { default as HighScorePage } from "./HighScorePage"
export { default as TimedPage } from "./TimedPage"

export const fetchRandQuestions = async () => {
  const probabilities = {easy: 0.65, medium: 0.27, hard: 0.08,};
  const questions = [];

  for (let i = 0; i < 5; i++) {
    const randomValue = Math.random();
    let difficulty;

    if (randomValue < probabilities.easy) {
      difficulty = 'easy';
    } else if (randomValue < probabilities.easy + probabilities.medium) {
      difficulty = 'medium';
    } else {
      difficulty = 'hard';
    }

    const res = await axios.get(
      `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`
    );
    questions.push(res.data[0]);
  }
  return questions
}
