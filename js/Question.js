export default class Question {
  constructor(question, answers, answerKey){
    this.question = question,
    this.answers = answers,
    this.answerKey = answerKey
  }
  isCorrect(answer){
    return answer === this.answerKey
  }
}