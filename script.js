let currentQuestionIndex = 0;
let score = 0;

const defaultQuestions = [
    {
        question: "When was C++ invented",
        correctAnswer: "1979",
        options: [
            {id: "option1", value: "1886", text: "1886" },
            {id: "option2", value: "1969", text: "1969" },
            {id: "option3", value: "1979", text: "1979" }
        ]
    },

    {
        question: "Who is the current CEO of Apple",
        correctAnswer: "Tim Cook",
        options: [
            {id: "option1", value: "Steve Jobs", text: "Steve Jobs" },
            {id: "option2", value: "Tim Cook", text: "Tim Cook" },
            {id: "option3", value: "Eduardo Saverin", text: "Eduardo Saverin" }
        ]
    },

    {
        question: "How many megabytes are in a terabyte",
        correctAnswer: "1,000,000",
        options: [
            {id: "option1", value: "1024", text: "1024" },
            {id: "option2", value: "10,000", text: "10,000" },
            {id: "option3", value: "1,000,000", text: "1,000,000" }
        ]
    }
]


document.getElementById("start__btn").addEventListener('click', () => {
    submit__btn.classList.remove('no__display');
    start__btn.classList.add('no__display');
    create__btn.classList.add('no__display');
    loadQuestion();
});

function loadQuestion(){

    const currentQuestion = defaultQuestions[currentQuestionIndex];
    document.querySelector('.question p').textContent = currentQuestion.question;

    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = option.id;
        radioInput.name = 'answer';
        radioInput.value = option.value;

        const label = document.createElement('label');
        label.htmlFor = option.id;
        label.textContent = option.text;

        optionDiv.appendChild(radioInput);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
    })
}

const checkAnswer = (selectedAnswer) => {
    const currentQuestion = defaultQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }
}


document.getElementById('submit__btn').addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        checkAnswer(selectedAnswer.value);
        currentQuestionIndex++;
        if(currentQuestionIndex < defaultQuestions.length) {
            loadQuestion();
        } else {
            document.getElementById('submit__btn').disabled = true;
            displayQuizFinishedMessage();
        }
    } else {
        console.log("Please select an answer");
    }
});



const displayQuizFinishedMessage = () => {
    const quizFinishedMessageDiv = document.getElementById('quizFinishedMessage');
    quizFinishedMessageDiv.style.display = 'block';
    quizFinishedMessageDiv.innerHTML = `<p> Quiz finished! Your score is: ${score}</p>`;
}

const options = document.querySelectorAll('.option input[type="radio"]');
options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(otherOption => {
            if(otherOption !== option){
                otherOption.checked = false;
            }
        });
    });
});