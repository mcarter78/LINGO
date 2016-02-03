var answers = ["ghost", "sloth", "crazy"];
var lengthOfAnswers = answers.length;
var randomIndex;
var answer;
var lettersArray = [];
var guess;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//selects an Answer from the array of possible answers
function selectAnswer() {
		randomIndex = getRandomInt(0,lengthOfAnswers);
		var currentAnswer = answers[randomIndex];
		return currentAnswer;
	}

//finds the first letter of the seleceted answer and gives the player a hint by 
// placing the first letter in the first square
function fillFirstLetter(answer) {
	var firstLetter = answer[0];
	$('.cell:first').html(firstLetter);
}

//sets up the form for player input where the start button used to be under LINGO title
function setUpUserInput(answer){
	var guessbutton = '<label for "guess"></label><input id="guess"type=text maxlength=5></input><input id="guessbutton" type="submit" value="guess"/>';
	$('#usercontrols').append(guessbutton);
}

function checkForCorrectWord() {
	console.log('correctwordfunction');
	if (guess === answer) {
		console.log('congratulations on being the best');
}
}



// set up the grid divs for the game board when submit button is clicked
// selects answer
// puts the first letter of answer in the first square
// puts a form for player to guess, hides the start button
function setGame() {
	console.log('linked');

	$('.gameboard').append('<div class="row" id="firsttry">');
	$('.gameboard').append('<div class="row" id="secondtry">');
	$('.gameboard').append('<div class="row" id="thirdtry">');
	$('.gameboard').append('<div class="row" id="fourthtry">');
	$('.gameboard').append('<div class="row" id="fifthtry">');
	for (var i = 0; i < 5; i ++){
	$('#firsttry').append('<div class ="cell">');
	$('#secondtry').append('<div class ="cell">');
	$('#thirdtry').append('<div class ="cell">');
	$('#fourthtry').append('<div class ="cell">');
	$('#fifthtry').append('<div class ="cell">');
	}
	
		
	answer = selectAnswer();
	console.log(answer);
	fillFirstLetter(answer);
	setUpUserInput(answer);
	// $('#startbutton').off('click',setGame);
	$('#startbutton').hide();
	$('#guessbutton').on('click', makeGuess);
}


function makeGuess() {
	console.log('whatup');
	var guess = $('#guess').val();
	for (var i = 1; i < guess.length; i ++) {
		lettersArray.push(guess[i]);
	}
	var letterCells = $('#firsttry').children();
	for (var j = 1; j < guess.length; j ++) {
		var k = j-1;
		var letterValue = lettersArray[k];
		$(letterCells[j]).html(letterValue);
	}
	checkForCorrectWord();
	correctLetterWrongPlace();
	correctLetterCorrectPlace();
}

function correctLetterCorrectPlace() {
	console.log('nice guess');
	var guess = $('#guess').val();
	var letterCells = $('#firsttry').children();
	for (var j = 0; j < guess.length; j ++) {
		if (answer[j] === guess[j]) {
			$(letterCells[j]).css('background-color', 'green');
			$(letterCells[j]).attr('id', 'correctplace');
		}
			// } else {
			// 	$(letterCells[j]).attr('id', 'wrongplace');
			// }
		}
	}

function correctLetterWrongPlace() {
	console.log('rightletterwrongplace');
	guess = $('#guess').val();
	len = guess.length;
	var letterCells = $('#firsttry').children();
	answerLetters = [];
		for (var i = 0; i < len; i ++) {
			if (answer[i] === guess[i]){
				answerLetters.push(i);
			} else {
				answerLetters.push(answer[i]);
			}
			
		}

	for (i = 0; i < len-1; i++) {
		var wrongplace = $.inArray(lettersArray[i], answerLetters, 1);
		var j = i+1;
			if (wrongplace === -1) {
				$(letterCells[j]).css('background-color', 'red');
			} else {
		$(letterCells[j]).css('background-color', 'yellow');
		$(letterCells[j]).attr('id', 'correctletter');
	} 
	}
}

	
function wrongLetterWrongPlace() {

}




