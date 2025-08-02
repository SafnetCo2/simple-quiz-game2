const quizData = [
    {
        question: "Which one of the three is not a framework of JavaScript?",
        options: ["Node.js", "Python script", "Django"],
        correct: 2,
    },
    {
        question: "HTML stands for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tools for Markup Language",
            "HyperLinks Markup Language",
            "I don't know"
        ],
        correct: 0,
    },
    {
        question: "Choose below the language for styling web pages.",
        options: ["CSS", "HTML", "JavaScript"],
        correct: 0,
    }
];

// Game variables
let currentIndex = 0;
let score = 0;
let timeleft = 60;
let timeInterval;

// Select DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBox = document.getElementById("score-box");
const timerBox = document.getElementById("timer");
const navBox = document.querySelector(".navigations");

// Display question
function showQuestion(index) {
    const q = quizData[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        scoreBox.textContent = `Score: ${score}`;
    }
    nextQuestion();
}

// Go to next question
function nextQuestion() {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    } else {
        endQuiz();
    }
}

// Go to previous question
function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
}

// Start or restart the quiz
function restartQuiz() {
    currentIndex = 0;
    score = 0;
    timeleft = 60;
    scoreBox.textContent = `Score: ${score}`;
    timerBox.style.display = "block";
    navBox.style.display = "block";
    document.getElementById("restart").style.display = "none";
    showQuestion(currentIndex);
    startTimer();
}

// Start the countdown timer
function startTimer() {
    clearInterval(timeInterval);
    timerBox.textContent = `Time Left: ${timeleft}s`;
    timeInterval = setInterval(() => {
        timeleft--;
        timerBox.textContent = `Time Left: ${timeleft}s`;
        if (timeleft <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.innerHTML = "";
    navBox.style.display = "none";
    timerBox.style.display = "none";
    document.getElementById("restart").style.display = "block";
}

// Attach navigation button events
document.getElementById("next").onclick = nextQuestion;
document.getElementById("prev").onclick = prevQuestion;
document.getElementById("end").onclick = endQuiz;
document.getElementById("restart").onclick = restartQuiz;

// Start quiz on load
showQuestion(currentIndex);
startTimer();
