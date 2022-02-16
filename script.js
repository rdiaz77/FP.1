
//let person = prompt('Please enter your name: ')
// is JS working...

//if (person!= null){

//     var userName = document.getElementById('user-name')
//     userName.innerHTML = `Welcome to the Trivia Game ${person}`
// } else {
//     window.alert('Please enter your name')

// }
// SCIENCE

let category =  {
    science: '22',
    geography :'17'
}

var scienceButton = document.getElementById('science')
    scienceButton.addEventListener('click',function(){
    console.log('you selected science', + category.science)
    return category.science

})

//GEOGRAPHY

var geoCat = '22'
var geographyButton = document.getElementById('geography')

geographyButton.addEventListener('click',function(){
    console.log('you selected science', + category.geography)
    return category.geography
    

})


// ANSWERS 

var answer1 = document.getElementById('answer1')

answer1.addEventListener('click',function(){
    console.log('you selected answer1')
})

var answer2 = document.getElementById('answer2')

answer2.addEventListener('click',function(){
    console.log('you selected answer 2')
  
})

var answer4 = document.getElementById('answer4')

answer4.addEventListener('click',function(){
    console.log('you selected answer 4')
  
})

var answer3 = document.getElementById('answer3')

answer3.addEventListener('click',function(){
    console.log('you selected answer 3')
  
})

//ADD PLAYER LOCATION

function geoLocal(){
    navigator.geolocation.getCurrentPosition(showPosition)
}
function showPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let coordinates = [latitude, longitude]
    console.log(coordinates)
}

// TIMER 

let startTime = 10;
let timer = document.getElementById('countdown');
    timer.innerHTML = startTime;

let handleClearInterval = (int) => clearInterval(int)
let countDown = function(){
    startTime--;
    timer.innerHTML = startTime;
    
}



//PLAY BUTTON
let playButton = document.getElementById('start')
playButton.addEventListener('click', function(){
    let interval = setInterval(countDown, 1000);
    interval;
    if(startTime === 0){
        handleClearInterval(interval)
        }
    
})



//RESET BUTTON

let resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', function(){
        console.log('reset')
        startTime = 10;
        timer.innerHTML = startTime;
        //handleClearInterval(interval)


})
// NUMBER OF QUESTIONS


// GET QUESTIONS FROM API

let numOfQuestions = '30'
let categorySelected = '17' // science 17 / geo 22
let difficultyLevel = 'easy' // medium / hard
const type = 'multiple'
let encoding = ''

//API ACCESS
 

async function getFetchQuestions(){
    let request = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${categorySelected}&difficulty=${difficultyLevel}&type=${type}`)

    let response = await request.json()
    // console.log(response)
//    console.log(response.results[0].question)
    return response.results // this is critical to get the data. 'response' is the main key of the object
}
getFetchQuestions()

// API ACCESS TO QUESTIONS / ALTERNATIVES / RIGHT ANSWER

const returnFetchData = async() => {
    const apiData = await getFetchQuestions();
   console.log("this is the JS object =>" , apiData) // ACCESS TO OBJ
  //  console.log("this is the info I need =>" , apiData[0].question) // ACCESS TO QUESTIONS
//     console.log("this is the info I need =>" , apiData[0].correct_answer) // ACCESS TO CORRECT 
//     console.log("this is the info I need =>" , apiData[0].incorrect_answers[0]) // ACCESS TO WRONG [0,1,2]
    let triviaData = apiData.map(trivia => {
       // console.log(trivia)
        let triviaObj = {
            questions: trivia.question,
            rightAnswer: trivia.correct_answer,
            wrongAnswer1: trivia.incorrect_answers[0],
            wrongAnswer2: trivia.incorrect_answers[1],
            wrongAnswer3: trivia.incorrect_answers[2]
        }

        console.log(triviaObj)
        return triviaObj
    })


     

}
returnFetchData()



// ITERATION OVER API TO GET QUESTIONS





// add a points counter



//request user name
//dynamic change of the backgrounds
// dynamic change of background music
// add crash sound when wrong
//add positive sound when right
// add final sound when time's up 
// add final sound when game finishes
//add victory wound when completing the set of questions successfully
//create a list of 10 higher 




