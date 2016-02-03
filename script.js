var answers = ["ghost", "stump", "crazy"];
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

function setGame() {
	console.log('linked');

	$('.gameboard').append('<div class="row" id="firsttry">');
	$('.gameboard').append('<div class="row" id="secondtry">');
	$('.gameboard').append('<div class="row" id="thirdtry">');
	$('.gameboard').append('<div class="row" id="fourthtry">');
	$('.gameboard').append('<div class="row" id="fifthtry">');
	for (var j = 0; j < 5; j ++){
	$('#firsttry').append('<div class ="cell">');
	$('#secondtry').append('<div class ="cell">');
	$('#thirdtry').append('<div class ="cell">');
	$('#fourthtry').append('<div class ="cell">');
	$('#fifthtry').append('<div class ="cell">');
	}
	
		
	answer = selectAnswer();
	console.log(answer);
	fillFirstLetter(answer);
	$('#startbutton').off('click',setGame);
}





