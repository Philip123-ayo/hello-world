const questions = [
    {
        question: "which is largest animal in the wolrd?",
        answers: [
            { text: "shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false}
        ]
    },
    {
        question: "which animal have long neck?",
        answers: [
            { text: "Lion", correct: false},
            { text: "Goat", correct: false},
            { text: "Fowl", correct: false},
            { text: "Giraffe", correct: true}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next");
let questionIndex =0;
let score =0;
function startQuiz() {
    questionIndex =0;
    score =0;
    nextButton.innerHTML="next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex+1;
    questionElement.innerHTML= questionNo+". "+currentQuestion.question;
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
    }
    else{
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
    questionElement.innerHTML=` you score ${score} out of ${questions.length}`;
    nextButton.innerHTML="Start Again"
    nextButton.style.display='block';
 }
 
startQuiz();