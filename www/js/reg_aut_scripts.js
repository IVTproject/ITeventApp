 function select_start_page() {
    var first_name = localStorage.getItem('first_name');
    var second_name = localStorage.getItem('second_name');
    var email = localStorage.getItem('email');
    if(!first_name || !second_name) {
        $('#welcome_content').fadeIn();
    } else {
        $('#heading').fadeIn();
        $('#events_write').fadeIn();
        list_all_events(0, 10);
    }
}

function introduce() {
	var re = /^[a-zа-яё]+$/i;
	var f_name = $('#welcome_sign_input_first_name').val().trim();
	var l_name = $('#welcome_sign_input_last_name').val().trim();
	if (re.test(f_name) && re.test(l_name) && f_name.length >= 2 && l_name.length >= 2) {
		localStorage.setItem('first_name', f_name);
		localStorage.setItem('second_name', l_name);
		$('#welcome_content').fadeOut();
		$('#heading').fadeIn();
		$('#events_write').fadeIn();
		list_all_events(0, 10);
	} else {
		navigator.notification.alert("Имя и фамилия должны содержать только русские буквы", function(){} , 'Ошибка');
	}
}

function user_reg() {
	var first_name = $('#welcome_sign_up_input_first_name').val().trim();
	var last_name = $('#welcome_sign_up_input_last_name').val().trim();
	var email = $('#welcome_sign_up_input_email').val().trim();
	var pass = $('#welcome_sign_up_input_password').val().trim();
	var pass_repeat = $('#welcome_sign_up_input_re_password').val().trim();
	var re = /^[a-zа-яё]+$/i;
	if (!(re.test(first_name) && re.test(last_name) && first_name.length >= 2 && last_name.length >= 2)) {
		navigator.notification.alert("Имя и фамилия должны содержать только буквы и не быть пустыми",function(){} , 'Ошибка');
	} else if (email.length == 0) {
		navigator.notification.alert("Введите E-mail",function(){} , 'Ошибка');
	}else if(pass.length == 0) {
		navigator.notification.alert("Введите пароль",function(){} , 'Ошибка');
	}else if(pass != pass_repeat) {
		navigator.notification.alert("Пароли не совпадают",function(){} , 'Ошибка');
		$('#welcome_sign_up_input_password').val("");
		$('#welcome_sign_up_input_re_password').val("");		
	} else {
		reg_user(email, pass, first_name, last_name);
	}
}

function user_auth() {
	var email = $('#welcome_sign_in_input_email').val().trim(); 
	var pass = $('#welcome_sign_in_input_password').val().trim();
	auth_user(email, pass);
}