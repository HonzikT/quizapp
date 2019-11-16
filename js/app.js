import Question from "./Question.js";
import Quiz from "./Quiz.js";

const app = (_ => {
  // CACHE THE DOM
  const $question = document.querySelector(".header__question")
  const $counter = document.querySelector(".header__counter")
  const $progressBar = document.querySelector(".header__progress-inner")
  const $tagline = document.querySelector(".header__tagline")
  const $main = document.querySelector(".main")
  const $reset = document.querySelector(".reset")
  const $next = document.querySelector(".next")

// QUESTIONS
  const q1 = new Question("What is the capital city of Czechia?", ["Bratislava", "Warsaw", "Prague", "Pilsen"], 2)
  const q2 = new Question("What is the capital city of UK?", ["Birmingham", "London", "Manchester", "Dublin"], 1)
  const q3 = new Question("What is the capital city of Latvia?", ["Vilnius", "Tallinn", "Riga", "Copenhagen"], 2)
  const q4 = new Question("What is the capital city of Romania?", ["Minsk", "Belgrade", "Budapest", "Bucharest"], 3)
  const q5 = new Question("What is the capital city of Sweden?", ["Stockholm", "Helsinki", "Oslo", "Copenhagen"], 0)
  const q6 = new Question("What is the capital city of Ukraine?", ["Moscow", "Prague", "Bratislava", "Kyiv"], 3)
  const q7 = new Question("What is the capital city of Andorra?", ["Lisbon", "Tbilisi", "Tirana", "Skopje"], 2)
  const q8 = new Question("What is the capital city of Finland?", ["Stockholm", "Helsinki", "Oslo", "Copenhagen"], 1)
  const q9 = new Question("What is the capital city of Switzerland?", ["Zürrich", "Basel", "Bern", "Geneva"], 2)
  const q10 = new Question("What is the capital city of Lithuania?", ["Vilnius", "Tallinn", "Riga", "Copenhagen"], 0)


// QUIZ
  const quiz = new Quiz([q1, q2, q3, q4, q5, q6, q7, q8, q9, q10])

// AUXILARY FUNCTIONS
  const getPercentage = (current, total) => {
    return Math.round((current/total)*100)
  }
  const launchBar = (current, max) => {
    $progressBar.style.width = `${current}%` 
    let loadingBar = setInterval(_ =>{
      if(current >= max){
        clearInterval(loadingBar)
      } else {
        current++;
        $progressBar.style.width = `${current}%`
      }
    },2)
  }

// RENDER SUB-FUNCTIONS
  const renderQuestion = _ => {
    const markup = quiz.getCurrentQuestion().question
    $question.textContent = markup
  }
  const renderChoices = _ => {
    const choicesArr = quiz.getCurrentQuestion().answers
    let markup = ``
    choicesArr.forEach((elem, index) => {
      markup += `<div class="main__answer">
      <input type="radio" name="answer" data-order="${index}" id="choice${index}">
      <label class="main__label" for="choice${index}">
        <i></i>
        <span>${elem}</span>
      </label>
    </div>`
    });
    $main.innerHTML = markup
  }
  const renderCounter = _ => {
    const index = quiz.index;
    $counter.textContent = `${index+1} of ${quiz.questions.length}`
  }
  const renderProgressBar = input => {
    const currentWidth = getPercentage(input, quiz.questions.length)
    launchBar(0, currentWidth) // tady zkus udelat pomoci getPercentage ze to odectes od zakladu aby to neslo pokazde od 0
  }
// RENNDER END SCREEN
  const renderEndScreen = _ => {
    $question.textContent = "Good job!";
    $tagline.textContent = "Complete!";
    $counter.textContent = `Your score is ${getPercentage(quiz.score, quiz.questions.length)}%`
    renderProgressBar(quiz.score)
    $next.style.display = "none"
    $main.textContent = ""
  }
// RENDER ALL and LISTENERS
  const listeners = _ => {
    $next.addEventListener("click", _ =>{
      const selectedRadioElem = document.querySelector('input[name="answer"]:checked')
      if(selectedRadioElem){
        const key = Number(selectedRadioElem.getAttribute("data-order"));
        quiz.guess(key)
        renderAll()
      } else{
        alert("Select an option below!")
      }
    })
    $reset.addEventListener("click", _ =>{
      quiz.reset();
      $next.style.display = "initial";
      $tagline.textContent = "Pick an option below:"
      renderAll()
    })
  }
  const renderAll = _ => {
    if(quiz.end()){
      renderEndScreen()
    } else{
      renderQuestion()
      renderChoices()
      renderCounter()
      renderProgressBar(quiz.index)
    }
  }
  return {
    renderAll,
    listeners
  }
})()

app.renderAll()
app.listeners()

