
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which animal has a long neck?",
        answers: [
            { text: "Lion", correct: false},
            { text: "Goat", correct: false},
            { text: "Fowl", correct: false},
            { text: "Giraffe", correct: true}
        ]
    },
    {
        question: "Which is the fastest land animal?",
        answers: [
            { text: "Horse", correct: false},
            { text: "Cheetah", correct: true},
            { text: "Tiger", correct: false},
            { text: "Leopard", correct: false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false}
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false},
            { text: "Madrid", correct: false},
            { text: "Paris", correct: true},
            { text: "Rome", correct: false}
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false},
            { text: "6", correct: false},
            { text: "7", correct: true},
            { text: "8", correct: false}
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false},
            { text: "Nitrogen", correct: false},
            { text: "Carbon dioxide", correct: true},
            { text: "Hydrogen", correct: false}
        ]
    },
    {
        question: "Which is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false},
            { text: "Jupiter", correct: true},
            { text: "Saturn", correct: false},
            { text: "Neptune", correct: false}
        ]
    },
    {
        question: "Who is known as the father of computers?",
        answers: [
            { text: "Albert Einstein", correct: false},
            { text: "Charles Babbage", correct: true},
            { text: "Isaac Newton", correct: false},
            { text: "Alan Turing", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false},
            { text: "Vatican City", correct: true},
            { text: "San Marino", correct: false},
            { text: "Liechtenstein", correct: false}
        ]
    },
    {
        question: "What is the boiling point of water?",
        answers: [
            { text: "50°C", correct: false},
            { text: "100°C", correct: true},
            { text: "0°C", correct: false},
            { text: "150°C", correct: false}
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
            { text: "Arctic Ocean", correct: false}
        ]
    },
    {
        question: "Which is the national bird of the USA?",
        answers: [
            { text: "Crow", correct: false},
            { text: "Eagle", correct: true},
            { text: "Owl", correct: false},
            { text: "Hawk", correct: false}
        ]
    },
    {
        question: "How many players are there in a football (soccer) team?",
        answers: [
            { text: "9", correct: false},
            { text: "10", correct: false},
            { text: "11", correct: true},
            { text: "12", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Sahara", correct: true},
            { text: "Gobi", correct: false},
            { text: "Kalahari", correct: false},
            { text: "Thar", correct: false}
        ]
    },
    {
        question: "Which element do we breathe in to survive?",
        answers: [
            { text: "Carbon dioxide", correct: false},
            { text: "Oxygen", correct: true},
            { text: "Nitrogen", correct: false},
            { text: "Helium", correct: false}
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon", correct: false},
            { text: "Nile", correct: true},
            { text: "Yangtze", correct: false},
            { text: "Mississippi", correct: false}
        ]
    }
];

// ---- Your quiz logic stays the same ----
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");

let questionIndex = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    })
}

function resetState() {
    nextButton.style.display="none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==='true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct==='true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextButton.style.display='block';
}

nextButton.addEventListener('click', ()=>{
    if (questionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function handleNextButton() {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Start Again"
    nextButton.style.display='block';
}

startQuiz();
