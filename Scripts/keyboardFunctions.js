// JavaScript Document

$(window).load(function(){
	$("#keyboardBack").click(function(){
		hideKeyboard();
	});
	$('#keyboardErrorOk').click(function(){
		$('#keyboardContainer').show(0);
		$('#keyboardError').hide(0);
	});
	
});

var keyboardReadoutChars = 0;
var maxChars = 16;

function keyboardPress(key) {
	var captionText = $('.caption').html();
	if(trim(captionText) == '' && $('.upper').css('display') == 'block'){
		$('.upper').hide(0);
		$('.lower').show(0);
	}
	if (!specialButtons(key)) {
		if (keyboardReadoutChars < maxChars) {
			$(".caption").append(key);
			keyboardReadoutChars ++;
		}
	}
}

function backspace() {
	str = $(".caption").text();
	newStr = str.replace(/(\s+)?.$/, '');
	$(".caption").text(newStr);
	keyboardReadoutChars --;
}

function specialButtons(key) {
	if (key == "capsLower") {
		$(".lower").hide();
		$(".upper").show();
		return true;
	}
	if (key == "capsUpper") {
		$(".upper").hide();
		$(".lower").show();
		return true;
	}
	if (key == "numbers") {
		$(".upper").hide();
		$(".lower").hide();
		$(".symbols").hide();
		$(".bottomRowSymbols").hide();
		$(".bottomRowNumbers").show();
		$(".numbers").show();
		return true;
	}
	if (key == "symbols") {
		$(".upper").hide();
		$(".lower").hide();
		$(".numbers").hide();
		$(".bottomRowNumbers").hide();
		$(".bottomRowSymbols").show();
		$(".symbols").show();
		return true;
	}
	if (key == "lowercase") {
		$(".upper").hide();
		$(".numbers").hide();
		$(".symbols").hide();
		$(".bottomRowNumbers").hide();
		$(".bottomRowSymbols").show();
		$(".lower").show();
		return true;
	}
	return false;
}

function cursorAnimation() {
	$("p.cursor").animate({ opacity: 0 }, "fast", "swing").animate({ opacity: 1 }, "fast", "swing");
}
$(document).ready(function() {
	setInterval("cursorAnimation()", 600 );
});

function resetKeyboard(){
	$('.caption').html("");
	$('.numbers').hide(0);
	$('.symbols').hide(0);
	$('.upper').show(0);
	$('.lower').hide(0);
	$('#keyboardNext').unbind('click');
}

function showKeyboard(title){
	$("#handset").hide(0);
	$("#handsetLandscape").show(500);
	$('.keyboardTitle').html(title+': ');
	
	var captionText = $('.caption').html();
	if(trim(captionText) != ''){
		$('.upper').hide(0);
		$('.lower').show(0);
	}
}

function hideKeyboard(){
	$("#handsetLandscape").hide(0);
	$("#handset").show(500);
}

function showKeyboardError(message){
	$('#keyboardErrorText').html(message);
	$('#keyboardContainer').hide(0);
	$('#keyboardError').show(0);
}
