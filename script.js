$(document).ready();
$('#startbutton').on('click', setGame);

function setGame() {
	console.log('linked');
	var idnumber = 1;
	for (var i = 1; i <= 5; i++) {
		$('.gameboard').append('<div class="row">').attr("id", "idnumber");
		for (var j = 1; j<=5; j++) {
			$('#idnumber').append('<div class="cell">');
		}	
	} idnumber ++;
}

