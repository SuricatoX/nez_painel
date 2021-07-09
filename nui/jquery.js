$(document).ready(function(){
	let actionContainer = $(".actionmenu");
	let actionButton = $(".actionbutton");

	window.addEventListener("message",function(event){
		let item = event.data;
		switch(item.action){
			case "showMenu":
				actionButton.fadeIn(1000);
				actionContainer.fadeIn(1000);
			break;

			case "hideMenu":
				actionButton.fadeOut(1000);
				actionContainer.fadeOut(1000);
				location.reload();
			break;
		}
	});

	document.onkeyup = function(data){
		if (data.which == 27){
			$.post("http://nez_painel/fechar",JSON.stringify({}),function(datab){});
		}
	};
});


$('.actionbutton').click(function(e){
	$.post("http://nez_painel/fechar",JSON.stringify({}),function(datab){});
});

var pin = false;
var shift = false;

const togglePin = () => {
	var el = document.getElementById('pin');
	if (pin === false){
		pin = true;
		$(el).css({
			"color": "#fff",
			"background-color": "rgba(0, 153, 255, 0.5)"
		});
	} else {
		pin = false
		$(el).css({
			"color": "#09f",
			"background-color": "rgba(255,255,255, 0.5)"
		});
	}
}

const revelar = (e) => {
	var el = document.getElementById(e)
	$(el).slideToggle(400);
}

var caixa = false;

const comandoSimples = (cmd) => {
	$.post("http://nez_painel/comandoSimples",JSON.stringify({cmd}),function(datab){});
	if (pin === false) {
		$.post("http://nez_painel/fechar",JSON.stringify({}),function(datab){});
	}
}

const abrirCaixaArg = (cmd) => {
	if (caixa === true) {
		fecharCaixa();
	};
	$('.caixa').html(`
		<div class="historico">
			<i class="fas fa-trash-alt" onclick="limparHistorico()"></i><h1>HISTÓRICO</h1>
			<div class="cont_historico"></div>
		</div><!--
		--><div class="argumento">
			<h1>DIGITE O ARGUMENTO</h1>
			<input id="argSimples" type="text" value="" class="arg selected" placeholder="ARGUMENTO"><br>
			<div class="botoes">
				<div class="aceitar" onclick="comandoArg('${cmd}'); fecharCaixa()"><i class="fas fa-check"></i></div><!--
				--><div class="recusar" onclick="fecharCaixa()"><i class="fas fa-times"></i></div>
			</div>
		</div>
	`);
	carregarHistorico();
	$('.caixa').slideDown(400);
	caixa = true;
}

const abrirCaixaComplexo = (cmd) => {
	if (caixa === true) {
		fecharCaixa();
	};
	$('.caixa').html(`
		<div class="historico">
			<i class="fas fa-trash-alt" onclick="limparHistorico()"></i><h1>HISTÓRICO</h1>
			<div class="cont_historico"></div>
		</div><!--
		--><div class="argumento">
			<h1>DIGITE OS ARGUMENTOS</h1>
			<input id="arg" type="text" value="" class="arg selected" placeholder="PRIMEIRO ARGUMENTO" onclick="selecionar($(this))">
			<input id="arg2" type="text" value="" class="arg" placeholder="SEGUNDO ARGUMENTO" onclick="selecionar($(this))">
			<div class="botoes">
				<div class="aceitar" onclick="comandoComplexo('${cmd}'); fecharCaixa()"><i class="fas fa-check"></i></div><!--
				--><div class="recusar" onclick="fecharCaixa()"><i class="fas fa-times"></i></div>
			</div>
		</div>
	`);
	carregarHistorico();
	$('.caixa').slideDown(400);
	caixa = true;
}

const comandoArg = (cmd) => {
	var arg = document.getElementById('argSimples').value;
	$.post("http://nez_painel/comandoArg",JSON.stringify({cmd, arg}),function(datab){});
	if (pin === false) {
		$.post("http://nez_painel/fechar",JSON.stringify({}),function(datab){});
	}
}

const comandoComplexo = (cmd) => {
	var arg = document.getElementById('arg').value;
	var arg2 = document.getElementById('arg2').value;
	$.post("http://nez_painel/comandoComplexo",JSON.stringify({cmd, arg, arg2}),function(datab){});
	if (pin === false) {
		$.post("http://nez_painel/fechar",JSON.stringify({}),function(datab){});
	}
}

const carregarHistorico = () => {
	$.post("http://nez_painel/carregarHistorico",JSON.stringify({}),(data) => {
		const nameList = data.historico;
		$('.cont_historico').html(`
			${nameList.map((item) => (`
				<div class="item_historico" onclick="preencherCampo('${item}')">${item}</div>
			`)).join('')}
		`);
	});
	var el = document.getElementsByClassName('caixa');
	var tamanho = parseInt($(el).height()) - 77;
	var el2 = document.getElementsByClassName('cont_historico');
	$(el2).css('max-height', tamanho+="px");
}

const limparHistorico = () => {
	$.post("http://nez_painel/limparHistorico",JSON.stringify({}),function(datab){});
	carregarHistorico();
}

const fecharCaixa = () => {
	$('.caixa').slideUp(0);
	$('.caixa').html(``);
	caixa = false;
}

//####################################
//##			TECLADO				##
//####################################

const selecionar = (e) => {
	var el = document.getElementsByClassName('arg');
	$(el).removeClass('selected');
	$(e).addClass('selected');
}

const preencherCampo = (input) => {
	var el = document.getElementsByClassName('selected');
	$(el).val(input);
}

const inserirCaractere = (input) => {
	var el = document.getElementsByClassName('selected');
	var last_val = $(el).val();
	var val = ""
	if (shift === false){
		val = last_val += input;
	} else {
		val = last_val += input.toUpperCase();
		toggleShift();
	}
	$(el).val(val);
}

const apagarCaractere = () => {
	var el = document.getElementsByClassName('selected');
	var last_val = $(el).val();
	var len = last_val.length-1;
	var val = last_val.slice(0,len);
	$(el).val(val);
}

const toggleShift = () => {
	if (shift === false) {
		shift = true;
		$('.letras').css('text-transform', 'uppercase');
	} else {
		shift = false;
		$('.letras').css('text-transform', 'lowercase');
	}
}

const copiarTexto = () => {
	var el = document.getElementsByClassName('selected');
	$(el).select();
	document.execCommand('copy');
}