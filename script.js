var answers = ["ghost", "sloth", "crazy"];
var lengthOfAnswers = answers.length;
var randomIndex;
var answer;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function selectAnswer() {
		randomIndex = getRandomInt(0,lengthOfAnswers);
		var currentAnswer = answers[randomIndex];
		return currentAnswer;
	}

function fillFirstLetter(answer) {
	var firstLetter = answer[0];
	$('.cell:first').html(firstLetter);
}

function setUpUserInput(answer){
	$('#usercontrols').append('<label for "guess"></label><input id="guess"type=text maxlength></input><input id="guessbutton" type="submit" value="guess"/>');
}


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
}
$('#guessbutton').on('submit', getResults);

function getResults() {
	var guess = $('#guess').val();
	lettersArray = [];
	for (var i = 1; i < answer.length; i ++) {
		lettersArray.push(answer[i]);
	}
	return lettersArray;
}




