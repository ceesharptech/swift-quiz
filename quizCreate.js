// Event listener for the "Create Quiz" button
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get user inputs
    const quizName = document.getElementById('quizName').value;
    const numberOfQuestions = parseInt(document.getElementById('numberOfQuestions').value);
  
    // Call function to generate custom quiz
    if (quizName === "" || numberOfQuestions === 0) {
        alert("Enter quiz name and number of questions")
    } else {
        generateCustomQuiz(quizName, numberOfQuestions);
    }
  });
  
  // Function to generate custom quiz
  function generateCustomQuiz(quizName, numberOfQuestions) {
    // Clear previous quiz content
    document.getElementById('quizContainer').innerHTML = '';
  
    // Create quiz title
    const quizTitle = document.createElement('h2');
    quizTitle.textContent = quizName;
    quizTitle.classList.add('quizTitle');
    document.getElementById('quizContainer').appendChild(quizTitle);
  
    // Create questions and options input fields
    for (let i = 0; i < numberOfQuestions; i++) {
      const questionNumber = i + 1;
      const questionContainer = document.createElement('div');
      const optionContainer = document.createElement('div');

      questionContainer.classList.add('questionContainer');
      optionContainer.classList.add('optionContainer');


      const questionLabel = document.createElement('label');
      questionLabel.textContent = `Question ${questionNumber}`;
      questionLabel.classList.add('questionLabel');

      const questionInput = document.createElement('input');
      questionInput.type = 'text';
      questionInput.required = true;
      questionInput.classList.add('questionInput');
      questionInput.id = `question${questionNumber}`;

      const answerLabel = document.createElement('label');
      answerLabel.textContent = "Correct Answer";
      answerLabel.classList.add('answerLabel');

      const answerInput = document.createElement('input');
      answerInput.type = 'text';
      answerInput.required = true;
      answerInput.classList.add('answerInput');
      answerInput.id = `answer${questionNumber}`;

      questionContainer.appendChild(questionLabel);
      questionContainer.appendChild(questionInput);
      questionContainer.appendChild(answerLabel);
      questionContainer.appendChild(answerInput);
  
      // Create radio inputs and labels for options (you can customize this based on your requirements)
      for (let j = 0; j < 3; j++) {
        const optionWrapper = document.createElement('div');
        optionWrapper.classList.add('optionWrapper');
        const optionLabel = document.createElement('label');
        optionLabel.textContent = `Option ${j + 1}: `;
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.required = true;
        optionInput.classList.add('optionInput');
        optionInput.id = `option${questionNumber}-${j + 1}`;

        optionWrapper.appendChild(optionLabel);
        optionWrapper.appendChild(optionInput);
        optionContainer.appendChild(optionWrapper);
      }

      questionContainer.appendChild(optionContainer);
      document.getElementById('quizContainer').appendChild(questionContainer);
    }

    const startBtn = document.createElement('button');
    startBtn.textContent = "Start Quiz";
    startBtn.classList.add('startBtn');
    startBtn.id = 'startBtn';
    startBtn.type = 'submit';
    document.getElementById('quizContainer').appendChild(startBtn);

    // Show the quiz container
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizBox').style.display = 'none';

  }

  document.getElementById('quizContainer').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    quizReady();
  });
  
function quizReady() {
   let currentQuestionIndex = 0;
   let score = 0;
  document.getElementById('startBtn').addEventListener('click', () => {
    const quizName = document.querySelector('.quizTitle').textContent;

  // Create array to store custom quiz questions and options
    const customQuizQuestions = [];
    const correctAnswers = [];

    // Get questions and options from input fields
    for (let i = 0; i < parseInt(document.getElementById('numberOfQuestions').value); i++) {
        const questionNumber = i + 1;
        const question = document.getElementById(`question${questionNumber}`).value;
        const options = [{id:"", text:"", value:""}, {id:"radio2", text:"", value:""}, {id:"", text:"", value:""}];
        for (let j = 0; j < 3; j++) {
            options[j].id = `radio${questionNumber}-${j + 1}`;
            options[j].text = document.getElementById(`option${questionNumber}-${j + 1}`).value;
            options[j].value = document.getElementById(`option${questionNumber}-${j + 1}`).value;
        }
        const correctAnswer = document.getElementById(`answer${questionNumber}`).value; // Assuming the first option is always the correct answer
        customQuizQuestions.push({question, options, correctAnswer});
        correctAnswers.push(customQuizQuestions[i].correctAnswer);
    }

    const startCustomQuiz = () => {
        function loadQuestion() {
            const currentQuestion = customQuizQuestions[currentQuestionIndex];
            document.querySelector('.quizName h2').textContent = quizName;
            document.querySelector('.question p').textContent = currentQuestion.question;
        
            const optionsContainer = document.querySelector('.options');
            optionsContainer.innerHTML = '';
        
            currentQuestion.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('option');
        
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'answer';
                radioInput.value = option.value;
                radioInput.id = option.id;
        
                const label = document.createElement('label');
                label.htmlFor = option.id;
                label.textContent = option.text;
        
                optionDiv.appendChild(radioInput);
                optionDiv.appendChild(label);
                optionsContainer.appendChild(optionDiv);
            });
        }

        loadQuestion();
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('customQuizContainer').style.display = 'block';
        
        

        const checkAnswer = (selectedAnswer) => {
            const currentQuestion = customQuizQuestions[currentQuestionIndex];
            if (selectedAnswer === currentQuestion.correctAnswer) {
                score++;
            }
        }
        
        
        document.getElementById('submitBtn').addEventListener('click', () => {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                checkAnswer(selectedAnswer.value);
                currentQuestionIndex++;
                if(currentQuestionIndex < customQuizQuestions.length) {
                    loadQuestion();
                } else {
                    document.getElementById('submitBtn').disabled = true;
                    displayQuizFinishedMessage();
                }
            } else {
                console.log("Please select an answer");
            }
        });
        
        
        
        const displayQuizFinishedMessage = () => {
            const quizFinishedMessageDiv = document.getElementById('quizFinishedMessage');
            quizFinishedMessageDiv.style.display = 'block';
            const finishedMessage = document.createElement('p');
            const returnLink = document.createElement('a');
            const answerHeader = document.createElement('p');

            finishedMessage.textContent = `Quiz finished! Your score is: ${score}/${customQuizQuestions.length}`;
            returnLink.textContent = "Go to Home";
            returnLink.classList.add('returnLink');
            returnLink.href = 'index copy.html';

            answerHeader.textContent = 'Correct Answers';
            answerHeader.classList.add('answerHeader');

/*             quizFinishedMessageDiv.innerHTML = `<p> Quiz finished! Your score is: ${score}/${customQuizQuestions.length}</p>
                                   <a class="returnLink" href="index copy.html">Go to Home</a><br>
                                   <p class="answerHeader">Correct Answers</p>`; */
            correctAnswersContainer = document.createElement('ul');
            correctAnswersContainer.classList.add('correctAnswerList');
            for (let z = 0; z < correctAnswers.length; z++) {
                const listItem = document.createElement('li');
                listItem.textContent = `Q${z+1}: ${correctAnswers[z]}`;
                listItem.classList.add('listItem');
                correctAnswersContainer.appendChild(listItem);
            }
            console.log(correctAnswers);
            quizFinishedMessageDiv.appendChild(finishedMessage);
            quizFinishedMessageDiv.appendChild(returnLink);
            quizFinishedMessageDiv.appendChild(answerHeader);
            quizFinishedMessageDiv.appendChild(correctAnswersContainer);
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
    } // Start Custom Quiz function
    startCustomQuiz();

    // Display custom quiz data (you can customize this based on your requirement)
    console.log(`Custom quiz "${quizName}" created successfully:`, customQuizQuestions);
  }); // End of Start Btn Function
}

