var timerEl = document.getElementById("countdown");
var start = document.getElementById("startQuiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var submitBtn = document.querySelector("#submitScore");
var userInitials = document.getElementById("userInitials");
var userScores = document.getElementById("userScores");
var timer; 
var timerCount;


// quiz questions
let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choiceA: "strings",
        choiceB: "booleans",
        choiceC: "alerts",
        choiceD: "numbers",
        correct: "C"
    },
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        choiceA: "quotes",
        choiceB: "curly brackets",
        choiceC: "parenthesis",
        choiceD: "square brackets",
        correct: "B"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choiceA: "numbers and strings",
        choiceB: "other arrays",
        choiceC: "booleans",
        choiceD: "all of the above",
        correct: "D"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        choiceA: "commas",
        choiceB: "curly brackets",
        choiceC: "quotes",
        choiceD: "parenthesis",
        correct: "C"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "JavaScript",
        choiceB: "terminal/bash",
        choiceC: "for loops",
        choiceD: "console.log",
        correct: "D"
    }
]



// after initialization variables
var runningQuestion = 0;
var lastQuestion = questions.length-1;


// event listeners
start.addEventListener("click", startQuiz);
viewScores.addEventListener("click", renderScores);
backhome.addEventListener("click", backHome);


// render quiz 
function renderQuestion() {
    let q = questions[runningQuestion];
    
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
	choiceD.innerHTML = q.choiceD;
}


// start quiz
function startQuiz() {
    intro.style.display = "none";
    quiz.style.display = "block";
    renderQuestion();
    timerCount = 75;
    start.disabled = true;
    startTimer()
}


// start timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = "Time: " + timerCount;
      
        if (timerCount <= 0) {
            clearInterval(timer);
            timerEl.textContent = "Time's up!";
            scoreRender();
        }
    }, 1000);  
}


// check answer
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }else{
        //end quiz, stop timer, and show score
        clearInterval(timer);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    var correct = "Correct!";
    document.getElementById("correct").innerHTML = correct;
    setTimeout(function(){
        document.getElementById("correct").innerHTML = "";
    }, 1000);
}

// answer is wrong
function answerIsWrong(){
    timerCount = timerCount - 10;
    var wrong = "Wrong!";
    document.getElementById("wrong").innerHTML = wrong;
    setTimeout(function(){
        document.getElementById("wrong").innerHTML = "";
    }, 1000);
}

// render score
function scoreRender() {
    quiz.style.display = "none";
    endquiz.style.display = "block";
    var score = timerCount;
    document.getElementById("newscore").innerHTML = "Your final score is: " + score;
}


// adding new scores
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if (document.getElementById("initials").value.length === 0) {
        alert("Please enter your initials");
    } else {
        alert("Score successfully added");
        renderScores();
    }
})

// view all high scores on local storage
function highScore(){
    return JSON.stringify(localStorage);
}


function renderScores() {
    intro.style.display = "none";
    quiz.style.display = "none";
    endquiz.style.display = "none";
    highScores.style.display = "block";

    var initials = document.querySelector("#initials").value;
    var score = timerCount;
    
    document.getElementById("userInitials").innerHTML = initials;
    document.getElementById("userScores").innerHTML = score;
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
    console.log(localStorage);
    highScore();
}

// back to home from high scores screen
function backHome(){
    location.reload();
}
