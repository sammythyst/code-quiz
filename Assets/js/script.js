var timerEl = document.getElementById("countdown");
var start = document.getElementById("startQuiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var timer; 
var timerCount;


// quiz questions
let questions = [
    {
        question: "how are you today?",
        choiceA: "good",
        choiceB: "fine",
        choiceC: "well",
        choiceD: "meh",
        correct: "C"
    }
]

// variables
var runningQuestion = 0;


// render quiz 
function renderQuestion() {
    let q = questions[runningQuestion];
    
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
	choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    intro.style.display = "none";
    quiz.style.display = "block";
    renderQuestion();
    timerCount = 10;
    start.disabled = true;
    startTimer()
}


// start timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = "Time: " + timerCount;
      
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
}