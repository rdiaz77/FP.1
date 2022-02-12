
let person = prompt('Please enter your name: ')
// is JS working...

if (person!= null){

    var userName = document.getElementById('user-name')
    userName.innerHTML = `Welcome to the Trivia Game ${person}`
} else {
    window.alert('Please enter your name')

}


// add event listeners to answers

var biology = document.getElementById('biology')

biology.addEventListener('click',function(){

    console.log('you selected biology')
})

var geography = document.getElementById('geography')

geography.addEventListener('click',function(){

    console.log('you selected geography')
})



// add EvenListener to Option Selection

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

//add player geolocation


// show wrong or right answer
// add a points counter
// add a timer
//request user name
//dynamic change of the backgrounds
// dynamic change of background music
// add crash sound when wrong
//add positive sound when right
// add final sound when time's up 
// add final sound when game finishes
//add victory wound when completing the set of questions successfully
//create a list of 10 higher points
