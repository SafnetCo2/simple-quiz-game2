const quizData = [
    {
        question: "which one of  three is not a framework of javascript",
        options: ["Node.js", "Python script", "Django"],
        correct: 0,
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Text markup language","Home Tools for markup language","HyperLinks markup language","i dont know"]
    },
    {
        question: "choose below the language for styling web pages",
        options: ["CSS","HTML","javaScript"],
        correct:1
    }
]
//Game variables
let currentIndex = 0;
let score = 0;
let timeleft = 60;
let timeInterval;