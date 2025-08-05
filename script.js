// Scripts for interactive quiz game

const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Hyper Machine Language",
            "Hyperlinks Language",
            "Home Tool for Markup Languages"
        ],
        correct: 0
    },
    {
        question: "Which one is not a JavaScript framework?",
        options: ["Node.js", "Django", "Python Script"],
        correct: 1 // corrected typo from "corect" and changed index from 4 to 1
    },
    {
        question: "The language used to style web pages",
        options: ["CSS", "HTML", "XML", "JQUERY"],
        correct: 0 // corrected index from 6 to 0
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 60;
let timeInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreBox = document.getElementById("score-box");
const timerBox = document.getElementById("timer");
const navBox = document.getElementById("navigation");

function showQuestion(index) {
    const q = quizData[index];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        scoreBox.textContent = `Score: ${score}`;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
}

function startTimer() {
    clearInterval(timeInterval);
    timeLeft = 60;
    timerBox.textContent = `Time Left: ${timeLeft}s`;

    timeInterval = setInterval(() => {
        timeLeft--;
        timerBox.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    scoreBox.textContent = `Score: ${score}`;
    timerBox.style.display = "block";
    navBox.style.display = "block";
    document.getElementById("restart").style.display = "none";
    showQuestion(currentIndex);
    startTimer();
}

// function endQuiz() {
//     clearInterval(timeInterval);
//     questionEl.textContent = "🎉 Quiz Completed!";
//     optionsEl.innerHTML = `<h3>Your final score is ${score}/${quizData.length}</h3>`;
//     navBox.style.display = "none";
//     timerBox.style.display = "none";
//     document.getElementById("restart").style.display = "inline-block";
// }
function endQuiz() {
    clearInterval(timeInterval);
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = ""; // Clear previous content

    const percentage = (score / quizData.length) * 100;
    const success = percentage >= 50;

    const resultMessage = success ? "🎉 Congratulations! " : "😢 Try Again! ";
    const scoreMessage = `Your final score is ${score}/${quizData.length}`;
    const fullMessage = resultMessage + scoreMessage;

    const h3 = document.createElement("h3");
    optionsEl.appendChild(h3);

    let i = 0;
    const typingInterval = setInterval(() => {
        h3.textContent += fullMessage.charAt(i);
        i++;
        if (i >= fullMessage.length) {
            clearInterval(typingInterval);
        }
    }, 120);
    navBox.style.display = "none";
    timerBox.style.display = "none";
    document.getElementById("restart").style.display = "inline-block";
}

// Button Event Listeners
document.getElementById("next").onclick = nextQuestion;
document.getElementById("prev").onclick = prevQuestion;
document.getElementById("restart").onclick = restartQuiz;
document.getElementById("end").onclick = endQuiz;

// Start on load
showQuestion(currentIndex);
startTimer();
