$( document ).ready(function() {
	$("#welcome_title").fadeIn(1800);
	var time = 800;
	$("#welcome_information").delay(time).fadeIn(1800);
	time += 800;
	$("#welcome_information_dynamically").delay(time).fadeIn(1800);
	time += 1000;
	$("#welcome_sign_up").delay(time).fadeIn(1800);
	$("#welcome_sign_in").delay(time).fadeIn(1800);
	$(".welcome_button").delay(time).fadeIn(1900);
});

function welcome_skip() {
	$("#welcome_content_home").fadeOut(1000);
	$("#welcome_content_fio").delay(1000).fadeIn(1000);	
}

function welcome_back() {
	$("#welcome_content_fio").fadeOut(1000);	
	$("#welcome_content_home").delay(1000).fadeIn(1000);	
}

function sign_up_show() {
	$("#welcome_content_home").fadeOut(1000);	
	$("#welcome_content_sign_up").delay(1000).fadeIn(1000);	
}

function sign_in_show() {
	$("#welcome_content_home").fadeOut(1000);	
	$("#welcome_content_sign_in").delay(1000).fadeIn(1000);	
}

function sign_show() {
	$("#welcome_content_fio").fadeOut(1000);	
	$("#welcome_content_sign").delay(1000).fadeIn(1000);	
}