export default class Quiz{
  constructor(questions){
    this.questions = questions,
    this.index = 0,
    this.score = 0
  }
  getCurrentQuestion(){
    return this.questions[this.index]
  }
  nextQuestion(){
    this.index++
  }
  end(){
    return this.index === this.questions.length
  }
  guess(userGuess){
    const currentQuestion = this.questions[this.index];
    if(currentQuestion.isCorrect(userGuess)){
      this.score++
    }
    this.nextQuestion()
  }
  reset(){
    this.index = 0;
    this.score = 0
  }
}