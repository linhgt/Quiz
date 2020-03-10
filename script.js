(function(){
    //Container for the quiz, result and the submit button
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result");
    const submitButton = document.getElementById("submit");

    //Array of questions
    const Questions = [
        {
            question:"When was internet invented?",
            answers:{
                a:"1980",
                b:"1983",
                c:"1985",
                d:"1987",
            },
            correctAnswer:"b"
        },
        {
            question:"If you drop a ball and a feather at the same time and at the same height in a controlled vacuum on Earth, what will happen?",
            answers:{
                a:"the ball hits the ground first",
                b:"the feather hits the ground first",
                c:"both the ball and the feather touch the ground at the same time",
                d:"none of the above"
            },
            correctAnswer:"c"
        },
        {
            question:"what is the name of the hottest pepper in the world?",
            answers:{
                a:"Ghost pepper",
                b:"Trinidad Moruga Scorpion",
                c:"7 Pot Douglah",
                d:"Carolina reaper"
            },
            correctAnswer:"d"
        },
    ];

    function buildQuiz(){
        //Store the HTML output
        const output=[];

        //For each questions
        Questions.forEach(
            (currentQuestion, questionNumber) => {
            //Store the list of answer choices
            const answers = [];

            //For each answer
            for (letter in currentQuestion.answers)
            {
                //Add an html button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        </input>
                    </label>`
                ); 
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
        );
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }
    function showResult(){
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;
        Questions.forEach( (currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
            // if answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
              // add to the number of correct answers
              numCorrect++;
        
              // color the answers green
              answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
              // color the answers red
              answerContainers[questionNumber].style.color = 'red';
            }
          });
        resultContainer.innerHTML= `${numCorrect} out of ${Questions.length}`;
    }

    function showSlide(n)
    {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide=n;
        if(currentSlide === 0)
        {
            PrevButton.style.display="none";
        }
        else
        {
            PrevButton.style.display="inline-block";
        }
        if(currentSlide === slides.length-1)
        {
            NextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        }
        else
        {
            NextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }
      
    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    //Initiate the quiz
    buildQuiz();

    //Pagination
    const PrevButton = document.getElementById("previous");
    const NextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);

    //on submit, display result
    submitButton.addEventListener("click", showResult);
    PrevButton.addEventListener("click", showPreviousSlide);
    NextButton.addEventListener("click", showNextSlide);
})();