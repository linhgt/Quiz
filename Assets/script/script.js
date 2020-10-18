(function(){
    //Container for the quiz, result and the submit button
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result");
    const submitButton = document.getElementById("submit");
    const introContainer = document.getElementById("intro-container");

    //Checking whether the quiz has started or not
    let quizStarted = "false";

    //Array of questions, each index is an object that contain the question, the list of answer choices and the correct answer
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

    //Populate the intro page
    function intro(){
        //create elements with template literal
        const output=[];
        output.push(
            `<h1>Welcome to the NERD QUIZ</h1>
            <button id="start">Press Start</button>`
        );

        introContainer.innerHTML = output.join('');
    }

    //Build individual quiz slide
    function buildQuiz(){
        //Quiz has started
        //Store the HTML output
        quizStarted = "true";
        const output=[];

        //For each questions
        Questions.forEach(
            (currentQuestion, questionNumber) => {
            //Store the list of answer choices
            const answers = [];

            //For each answer
            for (letter in currentQuestion.answers)
            {
                //Add an html button using template literal
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        </input>
                    </label>`
                ); 
            }
            //Push the question and corresponding answers to the out put
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

    //Returning the result
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
        
        //Inform the player of the result
        resultContainer.innerHTML= `You got ${numCorrect} out of ${Questions.length}`;
        if(numCorrect === 3)
        {
            //if the player answers all the questions correctly
            resultContainer.innerHTML += `
                <h1>Congratulation! you are a nerd.</h1>.`
        }
        else
        {
            //if the player doesn't get all the question
            resultContainer.innerHTML += `
                <h1>Congratulation! you are not a nerd.</h1>.`
        }
        
        //Display the restart button
        const restartButton = document.getElementById("restart");
        restartButton.style.display = "inline-block";
    }

    //Display the quiz slide
    function showSlide(n)
    {
        //Remove the previous slide
        slides[currentSlide].classList.remove("active-slide");

        //Display the current slide
        slides[n].classList.add("active-slide");
        currentSlide=n;

        //If this is the first slide
        if(currentSlide === 0)
        {
            //Hide the previous button
            PrevButton.style.display="none";
        }

        else
        {
            PrevButton.style.display="inline-block";
        }
        
        //If this is the last slide
        if(currentSlide === slides.length-1)
        {
            //Hide the next button
            NextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        }

        else
        {
            NextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    //Show the next slide
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }
      
    //Show the previous slide
    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    //Hide the intro page if the quiz has started
    function isQuizStarted(){
        if (quizStarted !== "false")
        {
            const intro = document.getElementById("intro-container");
            intro.style.zIndex = 0;
            intro.style.display = "none";
        }
    }

    function reset(){
        location.reload();
    }

    //Beginning of the quiz
    intro();

    buildQuiz();

    //Add listener to start button
    const startButton = document.querySelector("#start");
    startButton.addEventListener("click", isQuizStarted);

    //Pagination
    const PrevButton = document.getElementById("previous");
    const NextButton = document.getElementById("next");
    const resetButton = document.getElementById("restart");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    //Show the current slide
    showSlide(currentSlide);

    //on submit, display result
    submitButton.addEventListener("click", showResult);
    PrevButton.addEventListener("click", showPreviousSlide);
    NextButton.addEventListener("click", showNextSlide);
    resetButton.addEventListener("click", reset);
})();