
// let person = prompt('Please enter your name: ')

// if (person!= null){

//     var userName = document.getElementById('user-name')
//     userName.innerHTML = `Welcome to the Trivia Game ${person}`
// } else {
//     window.alert('Please enter your name')
    

// }
 // GLOBAL VARIABLES
var rightAnswer = null      // RIGHT ANSWER
var playableCategory = '17'// DEFAULT PLAYABLE SELECTION
var playableQuestions = '10'
var playableLevel = 'easy'

var countArr = '0'

// TOPIC SELECTION SCIENCE
var scienceButton = document.getElementById('science')
    scienceButton.addEventListener('click',function(){
    console.log('you selected science')
    let science = '17'
    handledCategoryToPlay(science)
    getFetchQuestions(getDataObj)
})

// TOPIC SELECTION GEOGRAPHY
var geographyButton = document.getElementById('geography')
geographyButton.addEventListener('click',function(){
    console.log('you selected geography')
    let geoCat = '22'
    handledCategoryToPlay(geoCat)
    getFetchQuestions(getDataObj)
})

// SWITCH CATEGORY
function handledCategoryToPlay(category){
    playableCategory = category;
    getDataObj.categorySelected = playableCategory;
}
// SWITCH ARRAY #

//  SWITCH NUMBER OF QUESTIONS

let qFromUser = document.getElementById('dropdown-list')
qFromUser.onchange = function updateNumberOfQuestions (){
    var numberQuestionsSelected = qFromUser.options[qFromUser.selectedIndex].text
    console.log(numberQuestionsSelected);
    handleNumberOfQuestionsToPlay(numberQuestionsSelected);
    getFetchQuestions(getDataObj);
}


function handleNumberOfQuestionsToPlay(num){
    playableQuestions = num;
    getDataObj.numOfQuestions = playableQuestions;
    console.log(playableQuestions);
}

// SWITCH DIFFICULTY LEVEL
let levelArr = ['easy', 'medium', 'hard']

function updateDifficultyLevel(){
}



// OPTION BUTTONS
var answer1 = document.getElementById('answer1')
answer1.addEventListener('click',function(){
    var getOption1 = document.getElementById('option1').innerHTML
    isRight(getOption1)
})

var answer2 = document.getElementById('answer2')
answer2.addEventListener('click',function(){
    var getOption2 = document.getElementById('option2').innerHTML
    isRight(getOption2)
})

var answer3 = document.getElementById('answer3')
answer3.addEventListener('click',function(){
    var getOption3 = document.getElementById('option3').innerHTML
    isRight(getOption3)
})

var answer4 = document.getElementById('answer4')
answer4.addEventListener('click',function(){
    var getOption4 = document.getElementById('option4').innerHTML;
    isRight(getOption4) 
})

// SCORE TRACKER
let scoreBoard = document.getElementById('score');
scoreBoard.style.color = 'black'
let initialScore = 0;
scoreBoard.innerHTML = `Yor Score is: ${initialScore}`
let updateScore = function(){
    initialScore += 1;
    scoreBoard.innerHTML = `Your current Score is: ${initialScore}`;
}

// TIMER var timerInterval = null
var timerInterval = null
let startTime = 10;
let timer = document.getElementById('countdown');
    timer.style.color = 'black'
    timer.innerHTML = `Your have ${startTime} sec`;

function timerCountDown (){
        startTime--;
        timer.innerHTML = `Remaining time: ${startTime}`;
        console.log('timer')
        if(startTime === 0){
            resetTimer(timerCountDown)
        } 
};

function resetTimer(int){
    clearInterval(int)
    startTime = 10;
    timer.innerHTML = `Your time is ${startTime} sec`;
};

function resetTrackers(){
    countArr = 0;
    errorTracker = 0;
    
    initialScore = 0
    scoreBoard.innerHTML = `Your Score is: ${initialScore}`
}

// PLAY BUTTON
let playButton = document.getElementById('start')
playButton.addEventListener('click', function(){
    timerInterval = setInterval(timerCountDown, 1000);
    resetTrackers()
    getFetchQuestions(getDataObj)
    postQuestions()
    postOptions()
    timerCountDown()

})

// RESET BUTTON
let resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', function(){
        resetTimer(timerInterval); 
        resetTrackers() 
})

// NEXT BUTTON
let nextButton = document.getElementById('next')
    nextButton.addEventListener('click', function(){
        countArr++;
        console.log(countArr)
        postOptions();
        postQuestions();
        console.log(countArr);
        removeOldQuestion(); 
    
    })

// DATA OBJECT
var getDataObj = {
    numOfQuestions: playableQuestions,   // let numOfQuestions = '30'
    categorySelected: playableCategory, // science 17 / geo 22
    difficultyLevel: playableLevel,// medium / hard
    type: 'multiple',
}

//API ACCESS
async function getFetchQuestions(getDataObj){
    //console.log(getDataObj)
    let request = await fetch(`https://opentdb.com/api.php?amount=${getDataObj.numOfQuestions}&category=${getDataObj.categorySelected}&difficulty=${getDataObj.difficultyLevel}&type=${getDataObj.type}`)

    let response = await request.json()
    return response.results // this is critical to get the data. 'response' is the main key of the API object
    
}


// API ACCESS TO QUESTIONS / ALTERNATIVES / RIGHT ANSWER

const returnFetchData = async() => {
    const apiData = await getFetchQuestions(getDataObj);
   //console.log("this is the JS object =>" , apiData) // ACCESS TO OBJ / apiData[i].question - ACCESS TO QUESTIONS
  
   return apiData.map(trivia => {
        return {
            receivedQuestions: trivia.question,
            receivedRightAnswer: trivia.correct_answer,
            receivedWrongAnswer1: trivia.incorrect_answers[0],
            receivedWrongAnswer2: trivia.incorrect_answers[1],
            receivedWrongAnswer3: trivia.incorrect_answers[2]
        }  
    })  
}
console.log(countArr)
console.log(returnFetchData())

// ITERATION TO GET QUESTIONS
async function postQuestions(){
    let startQuestion = await returnFetchData()
    // console.log(startQuestion)
    let questionToBePosted = await startQuestion[countArr].receivedQuestions;
    let questionContainer = document.getElementById('question')
    let questionPElement = document.createElement('p')
    questionPElement.setAttribute('id','para-1')
    questionPElement.style.color = 'white'
    questionPElement.style.fontSize = '20px'
    questionPElement.style.textAlign = 'center'
    questionPElement.innerHTML = questionToBePosted;
    questionContainer.append(questionPElement)
    console.log(questionToBePosted)
    console.log(countArr)
  }


// REMOVE OLD QUESTION
function removeOldQuestion(){
    let removeP = document.getElementById('para-1');
removeP.remove()
removeMessageToPlayer()
}

// POTENTIAL ANSWERS - HOW TO SHUFFLE?
async function postOptions(){

    let options = await returnFetchData();
    let optionToBePostedRight = await options[countArr].receivedRightAnswer;
    rightAnswer = optionToBePostedRight
    let optionToBePostedWr1 = await options[countArr].receivedWrongAnswer1;
    let optionToBePostedWr2 = await options[countArr].receivedWrongAnswer2;
    let optionToBePostedWr3 = await options[countArr].receivedWrongAnswer3;
    let option1 = document.getElementById('option1');
    option1.innerHTML = optionToBePostedRight
    let option2 = document.getElementById('option2');
    option2.innerHTML = optionToBePostedWr1
    let option3 = document.getElementById('option3');
    option3.innerHTML = optionToBePostedWr2
    let option4 = document.getElementById('option4');
    option4.innerHTML = optionToBePostedWr3
    console.log(optionToBePostedRight)
    console.log(optionToBePostedWr1)
    console.log(optionToBePostedWr2)
    console.log(optionToBePostedWr3)
}
console.log(postOptions())

// RIGHT ANSWER
function isRight(selectedOption){
    if(selectedOption === rightAnswer){
        updateScore();
        let successMessage ='Great Answer'
        postMessageToPlayer(successMessage)
        stopTimer(timerInterval); 
        setTimeout(removeMessageToPlayer, 1500)
    
        
    } else {
        handleErrorTracker();
        let badMessage = `Wow!!! that's wrong`
        postMessageToPlayer(badMessage)
        console.log('buuuuu')
        console.log(errorTracker)
        stopTimer(timerInterval);  
        setTimeout(removeMessageToPlayer, 1500)     
    }
}
// ERROR TRACKER
let errorTracker = 3
function handleErrorTracker(){
    errorTracker -= 1;
    if(errorTracker === 0){
        window.alert('GAME OVER'); 
        resetButton()
    }
    cruxGeneration()
}

// ERROR CRUX GENERATION
let cruxGeneration = function(){
    let cruxMaker = document.getElementById('error-crux')
    cruxMaker.style.color = 'black'
    cruxMaker.innerHTML = 'X'
    console.log('it works')
}


// MESSAGE TO PLAYER
let postMessageToPlayer = function(message){
    let messageToPlayer = document.getElementById('message-player');
    let messageElement = document.createElement('p');
    messageElement.setAttribute('id', 'showMessage');
    messageElement.style.color = 'white'
    messageElement.style.fontSize = '20px'
    messageElement.style.position = 'center'
    messageElement.innerHTML = message;
    messageToPlayer.append(messageElement);
}
// RESET MESSAGE TO PLAYER
function removeMessageToPlayer(){
    let removeMessage = document.getElementById('showMessage')
    removeMessage.remove();


}


// dynamic change of the backgrounds
// dynamic change of background music
// add crash sound when wrong
// add positive sound when right
// add final sound when time's up 
// add final sound when game finishes
// add victory wound when completing the set of questions successfully
// create a list of 10 higher 



