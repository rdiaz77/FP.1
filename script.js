
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
           clearInterval(timerInterval)
           setTimeout(() => { 
            startTime = 10;
            timer.innerHTML = `Your time is ${startTime} sec` }, 1500);
            window.alert('Your time is up!!! ... Sorry you lose')
            
        } 
};

function stopTimer(int){
    clearInterval(int)
}

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
        postOptions();
        postQuestions();
        removeOldQuestion(); 
        removeMessageToPlayer();
        resetTimer(timerInterval);
    
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

// SELECT MESSAGE TO POST
let messageToUser = "Let's Play!!!"
let positiveIteration = function(){
    for (let i=0 ; i < posMessageArr.length; i++){
        messageToUser = posMessageArr[i];
     }
 }
 let negativeIteration = function(){
     for(let i = 0; i < negMessageArr.length; i++){
         messageToUser = negMessageArr[i];
     }

 }
 

// RIGHT ANSWER
function isRight(selectedOption){
    if(selectedOption === rightAnswer){
        updateScore();
        positiveIteration();
        postMessageToPlayer(messageToUser);
        stopTimer(timerInterval);
    
        
    } else {
        handleErrorTracker();
        negativeIteration();
        postMessageToPlayer(messageToUser);
        stopTimer(timerInterval);
       
    }
}
// ERROR TRACKER
let errorTracker = 0
function handleErrorTracker(){
    errorTracker += 1;
    if(errorTracker === 3){
        cruxGeneration3()
       setTimeout(window.alert('GAME OVER'), 2000) ; 
       setTimeout(resetButton(), 500);
    } else if(errorTracker === 1){
        cruxGeneration1()
    } else if(errorTracker === 2){
        cruxGeneration2()
       
    }
    
}

// ERROR CRUX GENERATION
let cruxMaker = document.getElementById('error-crux')

let cruxGeneration1 = function(){
    let cross1 = document.createElement('span')
    cross1.style.color = 'black'
    cross1.style.content = 'center'
    cross1.innerHTML = 'X'
    cruxMaker.append(cross1)
}

let cruxGeneration2 = function(){
    let cross2 =  document.createElement('span')
    cross2.style.color = 'black'
    cross2.innerHTML = 'X'
    cruxMaker.append(cross2)
}
   
let cruxGeneration3 = function(){ 
    let cross3 =  document.createElement('span')
    cross3.style.color = 'black'
    cross3.innerHTML = 'X'
    cruxMaker.append(cross3)
}
    


    


// MESSAGE TO PLAYER
let posMessageArr = ['Great Work'] // 'You Rock', 'Wow!!!', 'You are a Star'
let negMessageArr = ['Let\'s try again'] //  'You just missed that one'
let postMessageToPlayer = function(message){
    let messageToPlayer = document.getElementById('message');
    messageToPlayer.style.color = 'white'
    messageToPlayer.style.fontSize = '25px'
    messageToPlayer.innerHTML = messageToUser;

}
postMessageToPlayer()




// RESET MESSAGE TO PLAYER
function removeMessageToPlayer(){
    let removeMessage = document.getElementById('message')
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



