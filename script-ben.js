var answers = ["ghost", "sloth", "crazy"];
var lengthOfAnswers = answers.length;
var randomIndex;
var answer;
var lettersArray = [];
var guess;
var tries = 1;
var correctLettersIndex = [];
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

	$('.gameboard').append('<div class="row" id="try1">');
	$('.gameboard').append('<div class="row" id="try2">');
	$('.gameboard').append('<div class="row" id="try3">');
	$('.gameboard').append('<div class="row" id="try4">');
	$('.gameboard').append('<div class="row" id="try5">');
	for (var i = 0; i < 5; i ++){
	$('#try1').append('<div class ="cell">');
	$('#try2').append('<div class ="cell">');
	$('#try3').append('<div class ="cell">');
	$('#try4').append('<div class ="cell">');
	$('#try5').append('<div class ="cell">');
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
	var letterCells = $('#try1').children();
	for (var j = 1; j < guess.length; j ++) {
		var k = j-1;
		var letterValue = lettersArray[k];
		$(letterCells[j]).html(letterValue);
	}
	tries++;
	checkForCorrectWord();
	correctLetterWrongPlace();
	correctLetterCorrectPlace();
	// $('#guessbutton').hide();
	//change the button to guess again
	// var guessAgainButton = '<input id="guessbutton" type="submit" value="Guess Again!"/>';
	// $('#usercontrols').append(guessAgainButton);
	$('#guessbutton').val("Guess Again!");
	moveCorrectPlaceLetters();

}

function correctLetterCorrectPlace() {
	console.log('nice guess');
	var guess = $('#guess').val();
	var letterCells = $('#try' + tries).children();
	for (var j = 0; j < guess.length; j ++) {
		if (answer[j] === guess[j]) {
			$(letterCells[j]).css('background-color', 'green');
			$(letterCells[j]).attr('id', 'correctplace');
			correctLettersIndex.push(j);
			}
		}
	}

function correctLetterWrongPlace() {
	console.log('rightletterwrongplace');
	guess = $('#guess').val();
	len = guess.length;
	var letterCells = $('#try' + tries).children();
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
				//turns the wrongLetterWrongPostion cells red
				$(letterCells[j]).css('background-color', 'red');
				$(letterCells[j]).attr('id', 'wrongletter');
			} else {
		$(letterCells[j]).css('background-color', 'yellow');
		$(letterCells[j]).attr('id', 'correctletter');
	} 
	}
}

function moveCorrectPlaceLetters() {
	console.log('nextime');
	if (tries != 1) {
	var letterCells = $('#try' + tries).children();
	var letterCellsPast = $('#try' + (tries-1)).children();
	$(letterCells[0]).css('background-color', 'green');
	$(letterCells[0]).attr('id', 'correctplace');
	$(letterCells[0]).html(answer[0]);
	for (var i = 1; i < correctLettersIndex.length; i++) {
		var correctcell = correctLettersIndex[i];
		$(letterCells[correctcell]).css('background-color', 'green');
		$(letterCells[correctcell]).attr('id', 'correctplace');
		var correctletter = lettersArray[correctcell-1];
		$(letterCells[correctcell]).html(correctletter);
		}
	}
}





