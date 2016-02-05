var answers = ["ghost", "sloth", "crazy"];
var lengthOfAnswers = answers.length;
var lengthOfCommonWords = commonwords.length;
var randomIndex;
var answer;
var guess;
var lettersArray = [];
var tries = 1;
var correctLettersIndex = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//selects an Answer from the array of possible answers in commonwords
function selectAnswer() {
		randomIndex = getRandomInt(0,lengthOfCommonWords);
		var currentAnswer = commonwords[randomIndex].toLowerCase();
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
	var instructions = '<div class = "legend" id="intro">Here is the first letter! Try to guess the five letter mystery word!</div>';
	$('#usercontrols').append(instructions);
	var legendgreen = '<div class = "legend" id="green">Green = Correct Letter, Correct Place</div>';
	$('#usercontrols').append(legendgreen);
	var legendyellow = '<div class = "legend" id="yellow">Yellow = Correct Letter, Wrong Place</div>';
	$('#usercontrols').append(legendyellow);
	var legendred = '<div class = "legend" id="red">Red = Wrong Letter, Wrong Place</div>';
	$('#usercontrols').append(legendred);
	var instructionshidebutton = '<button id="hiderules">Hide Rules</button>';
	$('#usercontrols').append(instructionshidebutton);
	$('#hiderules').on('click', function(){
		$('.legend').hide();
		$('#hiderules').hide();
	});
	var guessbutton = '<label for "guess"></label><input id="guess"type=text maxlength=5" autofocus placeholder="Guess a 5 letter word"><button id="guessbutton" type="submit" value="guess">Guess</button>';
	$('#usercontrols').append(guessbutton);
}




// set up the grid divs for the game board when submit button is clicked
// selects answer
// puts the first letter of answer in the first square
// puts a form for player to guess, hides the start button
function setGame() {

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
	fillFirstLetter(answer);
	setUpUserInput(answer);
	// $('#startbutton').off('click',setGame);
	$('#startbutton').hide();

	$('#guessbutton').click(makeGuess);
	$('body').keypress(function(event) {
 		if ( event.keycode == 13 ) {
   			$('#guessbutton').click();
   			console.log(event);
				return false;
 		}
 });
}


function makeGuess() {
	lettersArray = [];
	var guess = $('#guess').val().toLowerCase();
	for (var i = 1; i < guess.length; i ++) {
		lettersArray.push(guess[i]);
	}
	var letterCells = $('#try' + tries).children();
	for (var j = 1; j < guess.length; j ++) {
		var k = j-1;
		var letterValue = lettersArray[k].toLowerCase();
		$(letterCells[j]).html(letterValue);
	}
	
	correctLetterWrongPlace();
	correctLetterCorrectPlace();
	checkForCorrectWord();
	// $('#guessbutton').hide();
	//change the button to guess again
	// var guessAgainButton = '<input id="guessbutton" type="submit" value="Guess Again!"/>';
	// $('#usercontrols').append(guessAgainButton);
	$('#guessbutton').val("Guess Again!");
	$('#guess').focus();

	moveCorrectPlaceLetters();
	tries ++;
	correctLettersIndex = [];
	if ((tries > 5) && (guess != answer)) {
		youLose();
	}
	if ((tries > 5) || (guess === answer)) {
		$('.gameboard').append('<button id="playagain">Play Again!</button>');
		$('#playagain').on('click', function(){
			location.reload();
		});
	}
	$('#guess').val('');
	


}

function checkForCorrectWord() {
	if (guess === answer) {
			alert('congratulations on being the best!');
	}
	
}

function correctLetterCorrectPlace() {
	var guess = $('#guess').val();
	var letterCells = $('#try'+ tries).children();
	for (var j = 0; j < guess.length; j ++) {
		if (answer[j] === guess[j]) {
			$(letterCells[j]).css('background-color', 'rgba(50, 236, 42, 0.7)');
			$(letterCells[j]).attr('id', 'correctplace');
			correctLettersIndex.push(j);
			}
		}
	}

function correctLetterWrongPlace() {
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
				$(letterCells[j]).css('background-color', 'rgba(255, 34, 0, .7))');
				$(letterCells[j]).attr('id', 'wrongletter');
			} else {
		$(letterCells[j]).css('background-color', '#F6FF69');
		$(letterCells[j]).attr('id', 'correctletter');
	} 
	}
	
}

function youLose(){
	//add a new row that reveals the answer
	$('.gameboard').append('<div class="row" id="reveal">');
	for (var i = 0; i < 5; i ++){
		$('#reveal').append('<div class ="cell">');
		letterCells = $('#reveal').children();
		$(letterCells[i]).css('background-color', '#00D6FF');
		$(letterCells[i]).html(answer[i]);
	}
}

function moveCorrectPlaceLetters() {
	if (guess != answer){
		// looks at the past row and then puts the letters that have been guessed
		// correctly into the new row 
	var letterCells = $('#try' + (tries+1)).children();
	var letterCellsPast = $('#try' + tries).children();
	$(letterCells[0]).css('background-color', 'rgba(50, 236, 42, 0.7)');
	$(letterCells[0]).attr('id', 'correctplace');
	$(letterCells[0]).html(answer[0]);
	for (var i = 1; i < correctLettersIndex.length; i++) {
		var correctcell = correctLettersIndex[i];
		$(letterCells[correctcell]).css('background-color', 'rgba(50, 236, 42, 0.7)');
		$(letterCells[correctcell]).attr('id', 'correctplace');
		var correctletter = lettersArray[correctcell-1];
		$(letterCells[correctcell]).html(correctletter);
		}
	}
}






