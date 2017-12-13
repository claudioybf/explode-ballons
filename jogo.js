var timerId = null; //variavel que armazena a chamda da função timerout

function startGame(){

	//pegando a url
	var	url = window.location.search;
	//separando/pegando nivel do jogo da trl
	var level_game = url.replace("?", "");

	var time_seconds = 0;
	
	//1 easy -> 120 seconds
	if (level_game == 1) {
		time_seconds = 120;
	}
	//2 normal -> 60 seconds
	else if(level_game == 2){
		time_seconds = 60;
	}
	//3 hard -> 30 seconds
	else{
		time_seconds = 30;
	}

	//insert seconds on span
	document.getElementById('cronometro').innerHTML = time_seconds;

	//quantidade de balões
	var quant_ballons = 50;

	creat_ballons(quant_ballons);

	//imprimir qtd de balões inteiros
	document.getElementById('baloes_inteiros').innerHTML = quant_ballons ;
	document.getElementById('baloes_estourados').innerHTML = 0 ;

	count_timer(time_seconds + 1);
}	

function count_timer(seconds){

	seconds -= 1;

	if (seconds == -1) {
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}
	document.getElementById('cronometro').innerHTML = seconds;

	timerId = setTimeout("count_timer("+seconds+")", 1000);
}

function game_over(){
	remove_events_ballons();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}status_game:

function creat_ballons(quant_ballons){
	for(var i = 1; i<=quant_ballons; i++ ){
		var ballons = document.createElement('img');
		ballons.src = 'imagens/balao_azul_pequeno.png';
		ballons.style.margin = '10px';
		ballons.id = 'b'+i;
		ballons.onclick = function(){ explode(this);}
		document.getElementById('cenario').appendChild(ballons);
	}
}

function explode(e){
	var id_ballons = e.id;

	document.getElementById(id_ballons).setAttribute('onclick','')
	document.getElementById(id_ballons).src = 'imagens/balao_azul_pequeno_estourado.png'
	punctuation(-1);
}

function punctuation (action){
	var ballons_whole = document.getElementById('baloes_inteiros').innerHTML;
	var ballons_explode = document.getElementById('baloes_estourados').innerHTML;

	ballons_whole = parseInt(ballons_whole);
	ballons_explode = parseInt(ballons_explode);

	ballons_whole = ballons_whole + action;
	ballons_explode = ballons_explode - action;

	document.getElementById('baloes_inteiros').innerHTML = ballons_whole;
	document.getElementById('baloes_estourados').innerHTML = ballons_explode;

	status_game(ballons_whole, ballons_explode);
}

function status_game(ballons_whole){
	if (ballons_whole == 0) {
		alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
		stop_game();
	}
}

function stop_game(){
	clearTimeout(timerId);
}

function remove_events_ballons() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}