 function select_start_page() {
    var first_name = localStorage.getItem('first_name');
    var second_name = localStorage.getItem('second_name');
    var email = localStorage.getItem('email');
    if(!first_name || !second_name) {
        $('#heading').fadeOut();
        $('#events_write').fadeOut();
    } else {
        $('#welcome_content').fadeOut();
        list_all_events(0, 10);
    }
}

function introduce() {
	var re = /^[a-zа-яё]+$/i;
	var f_name = $('#welcome_sign_input_first_name').val();
	var l_name = $('#welcome_sign_input_last_name').val();
	if (re.test(f_name) && re.test(l_name) && f_name.length >= 2 && l_name.length >= 2) {
		localStorage.setItem('first_name', f_name);
		localStorage.setItem('second_name', l_name);
		$('#welcome_content').fadeOut();
		$('#heading').fadeIn();
		$('#events_write').fadeIn();
		list_all_events(0, 10);
	} else {
		alert("Имя и фамилия должны содержать только русские буквы");
	}
}

function user_reg() {
	var first_name = $('#welcome_sign_up_input_first_name').val();
	var last_name = $('#welcome_sign_up_input_last_name').val();
	var email = $('#welcome_sign_up_input_email').val();
	var pass = $('#welcome_sign_up_input_password').val();
	var pass_repeat = $('#welcome_sign_up_input_re_password').val();
	var re = /^[a-zа-яё]+$/i;
	if (!(re.test(first_name) && re.test(last_name) && first_name.length >= 2 && last_name.length >= 2)) {
		alert(re.test(first_name));
		alert("Имя и фамилия должны содержать только буквы и не быть пустыми");
	} else if (email.length == 0) {
		alert("Введите E-mail");
	}else if(pass.length == 0) {
		alert("Введите пароль");
	}else if(pass != pass_repeat) {
		alert("Пароли не совпадают");
		$('#welcome_sign_up_input_password').val("");
		$('#welcome_sign_up_input_re_password').val("");		
	} else {
		reg_user(email, pass, first_name, last_name);
	}
}

function user_auth() {
	var email = $('#welcome_sign_in_input_email').val(); 
	var pass = $('#welcome_sign_in_input_password').val();
	auth_user(email, pass);
}