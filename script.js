var answers = ["ghost", "ghoul", "great"];
var randomIndex;
var answer;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function selectAnswer() {
		randomIndex = getRandomInt(0,2);
		var currentAnswer = answers[randomIndex];
		return currentAnswer;
	}

function setGame() {
	console.log('linked');
	var idnumber = 1;
	
	for (var i = 1; i <= 5; i++) {
		$('.gameboard').append('<div class="row">').attr("id", "idnumber");
		for (var j = 1; j<=5; j++) {
			$('#idnumber').append('<div class="cell">');
		}	
	} idnumber ++;
	
	answer = selectAnswer();
	console.log(answer);
}




