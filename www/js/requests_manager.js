var url_api = "http://it-event.tk/api.php";
function list_all_events(begin, count) {
    hide('#events_write');
    show('#preloader_events');
    localStorage.setItem("begin_event", begin);
    localStorage.setItem("count_event", count);
     $.ajax({
        type: 'GET',
        url: url_api,
        data: {
        	mod: "list_all_events",
			begin: begin,
			count: count,
			hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
        },
        error: function(req, text, error) {
			hide('#preloader_events');
            show('#events_write');
            fill_list_events(null, count);
        },
        success: function(data) {
			show('#events_write');
            hide('#preloader_events');
            fill_list_events(JSON.stringify(data), begin + count);
        },
        dataType: 'json'
    });
}

function list_filter_events(begin, count) {
    hide('#events_write');
    show('#preloader_events');
    localStorage.setItem("begin_event", begin);
    localStorage.setItem("count_event", count);
     $.ajax({
        type: 'GET',
        url: url_api + "?begin="+begin+"&count="+count+"&mod=list_filter_events&" + get_text_format_filter()+"&hash_key=ab2e0d69c72beb3c3817f79c7520fec6",
        data: {},
        error: function(req, text, error) {
			hide('#preloader_events');
            show('#events_write');
            fill_list_events(null, count);
        },
        success: function(data) {
			hide('#preloader_events');
            show('#events_write');
            fill_list_events(JSON.stringify(data), count);
        },
        dataType: 'json'
    });
}

function get_min_and_max_date() {
    $.get(url_api, {
        mod: "get_min_and_max_date",
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        past_date_to_filter(data);
    });
}

function get_more_events(begin, count) {
    $('#more_event_button').remove();
	$('#events_write').append('<div id="more_preloader"></div>');
    $.get(url_api + "?begin="+begin+"&count="+count+"&mod=list_filter_events&" +
        get_text_format_filter()+"&hash_key=ab2e0d69c72beb3c3817f79c7520fec6", {}, function(data) {
			$('#more_preloader').remove();
            append_list_events(data, count);
        });
    localStorage.setItem("begin_event", begin);
    localStorage.setItem("count_event", count);
}

function get_list_city() {
    $.get(url_api, {
        mod: "get_list_city",
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        creat_filter(data);
    });
}

function get_information_about_event(id) {
    var email = localStorage.getItem('email');
    if(email && email != "undefined") {
    $.get(url_api, {
        mod: "get_information_about_event",
        id_event: id,
        email: email,
        hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        var data = JSON.parse(data);
        if(data.have_assessed_notice)
            localStorage.setItem("have_assessed_notice_" + id, JSON.stringify(data.have_assessed_notice));
        if(data.have_assessed_informal)
            localStorage.setItem("have_assessed_informal_" + id, JSON.stringify(data.have_assessed_informal));
        if(data.my_informals)                     
            localStorage.setItem("my_informals_" + id, JSON.stringify(data.my_informals));
        if(data.my_notice)
            localStorage.setItem("my_notice_" + id, JSON.stringify(data.my_notice));
    });
    }
}

function get_message_chat(last_time, id_event) {
    $.ajax({
        type: 'GET',
        url: url_api,
        data: {mod: "get_message_chat", id_event: id_event, last_time: last_time, hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"},
        error: function(req, text, error) {
           //navigator.notification.alert("Чат недоступен. Проверьте соединение с интернетом.", function(){} , 'Ошибка');
			hide('#preloader_chat');
			$('#chat_message').text("");
			show('#chat_message');
			$('#chat_message').append("<p class='empty_message'>Чат недоступен. Проверьте соединение с интернетом.</p>");
        },
        success: function (data) {
            fill_chat(data);
        },
        dataType: 'json'
    });  
}

function send_message_server(id_user, id_event, name_user, message) {
    $.ajax({
        type: 'GET',
        url: url_api,
        data: {mod: "write_message_user", id_user: id_user, id_event: id_event, name_user: name_user, message: message, hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"},
        error: function(req, text, error) {
            //alert("error");
        },
        success: function (data) {
            
        },
        dataType: 'json'
    }); 
}

function set_information_about_event(id) {
    var email = localStorage.getItem('email');
    if(email && email != "undefined") {
    $.get(url_api, {
        mod: "set_information_about_event",
        id_event: id,
        email: email,
        information: gather_information(id),
        hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {});
    }
}

function get_notice_from_event(id_event, begin, count) {
    $('#more_notice_button').remove();
    $.get(url_api, {
        mod: "get_notice_from_event",
        id_event: id_event,
        begin: begin,
        count: count,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        fill_notice(data, count);
    }); 
    var last_id_event = localStorage.getItem('last_evet_id');
    localStorage.setItem("begin_notice_" + last_id_event, begin);
    localStorage.setItem("count_notice_" + last_id_event, count);
}


function get_notice_from_event_filter(id_event, begin, count, callBackF) {
    $('#more_notice_button').remove();
    $.get(url_api, {
        mod: "get_notice_from_event",
        id_event: id_event,
        begin: begin,
        count: count,
        types: get_text_format_filter_notice(),
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function (data) {	
		callBackF(data, count);
	}); 
    var last_id_event = localStorage.getItem('last_evet_id');
    localStorage.setItem("begin_notice", begin);
    localStorage.setItem("count_notice", count);
	
}

function get_actios_from_event(id_event) {
	hide("#content");
	show("#preloader_schedule");
    $.get(url_api, {
        mod: "list_actios_from_event",
        id: id_event,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        localStorage.setItem("list_actions_" + localStorage.getItem('last_evet_id'), data);	
		hide("#preloader_schedule");
		show("#content");
        fill_actions(data);
    });
}

function get_informal_from_event(id_event) {
	hide("#bloks_informals");
	show("#preloader_informal");
    $.get(url_api, {
        mod: "get_informal",
        id_event: id_event,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        localStorage.setItem("list_informal_" + localStorage.getItem('last_evet_id'), data);
		hide("#preloader_informal");
		show("#bloks_informals");
        fill_informal(data);
    });
}

function change_rang_informal(id_informal, inc, is_throwing) {
    $.get(url_api, {
        mod: "change_rang_informal",
        id_informal: id_informal,
        inc: inc,
        is_throwing: is_throwing,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        change_rangs_to_informal(id_informal, data);
        set_information_about_event(localStorage.getItem('last_evet_id'));
    });
}

function delete_notice(id) {
    $.get(url_api, {
        mod: "delete_notice",
        id: id,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        $("#block_notice_" + id).hide("slow", function(){$(this).remove();});
        set_information_about_event(localStorage.getItem('last_evet_id'));
    });
}

function add_notice_to_server(id_event, name, FIO, type, information, contact) {
    $.get(url_api, {
        mod: "add_notice_form_event",
        id_event: id_event,
        name: name,
        FIO: FIO,
        type: type,
        information: information,
        contact: contact,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        remember_id_notice(data);
        load_notice(0, 15);
        click_back_button();
        set_information_about_event(localStorage.getItem('last_evet_id'));
    });
}


function add_informal_to_server(id_event, theme, organize, information, place) {
    $.get(url_api, {
        mod: "add_informal",
        id_event: id_event,
        theme: theme,
        organize: organize,
        information: information,
        place: place,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        remember_id_informal(data);
        load_informal();
        click_back_button();
        set_information_about_event(localStorage.getItem('last_evet_id'));
    });
}

function make_inactive_informal(id_informal) {
    $.get(url_api, {
        mod: "make_inactive_informal",
        id_informal: id_informal,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        set_information_about_event(localStorage.getItem('last_evet_id'));
    });
}

function get_event_information(id) {
    hide("#event_pane");
    show("#preloader_event");
    $.ajax({
        type: 'GET',
        url: url_api,
        data: {mod: "get_event_information", id: id, hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"},
        error: function(req, text, error) {
            var last_event = localStorage.getItem("last_event");
            var jse = JSON.parse(last_event);
            if(last_event && last_event != "undefined") {
                if(id == jse.id)
                    get_inform_event(last_event);
                else
                    click_back_button();
            }
            hide('#preloader_event');
            show("#event_pane");
        },
        success: function (data) {
            get_inform_event(JSON.stringify(data));
            hide('#preloader_event');
            show("#event_pane");
        },
        dataType: 'json'
    });
    
}

function get_id_by_email(email) {
    $.get(url_api, {
        mod: "get_id_by_email",
        email: email,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        localStorage.setItem('id_user', data);
    });
}

function reg_user(email, pass, first_name, second_name) {
	 $.ajax({
        type: 'GET',
        url: url_api,
        data: { 
			mod: "write_normal_user",
			email: email,
			password_user: pass,
			first_name: first_name,
			second_name: second_name,
			hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
		},
        error: function(req, text, error) {
            navigator.notification.alert("Ошибка подключения. Проверьте соединение с интернетом.", function(){} , 'Ошибка');
        },
        success: function (data) {
            if (data == 0) {
				navigator.notification.alert("Такой email уже существует",function(){} , 'Ошибка');
				$('#welcome_sign_up_input_email').val("");
				$('#welcome_sign_up_input_password').val("");
				$('#welcome_sign_up_input_re_password').val("");
			} else if (data == 1) {
				get_id_by_email($('#welcome_sign_up_input_email').val());
				localStorage.setItem('first_name', $('#welcome_sign_up_input_first_name').val());
				localStorage.setItem('second_name', $('#welcome_sign_up_input_last_name').val());
				localStorage.setItem('email', $('#welcome_sign_up_input_email').val());
				navigator.notification.alert("Регистрация прошла успешно",function(){} , 'Поздравляем');
				$('#welcome_content').fadeOut();
				$('#heading').fadeIn();
				$('#events_write').fadeIn();
				list_all_events(0, 10);
			} else {
				navigator.notification.alert("Произошла ошибка, повторите попытку",function(){} , 'Ошибка');
			}
        },
        dataType: 'json'
    }); 
}
function auth_user(email, pass) {
	$.ajax({
        type: 'GET',
        url: url_api,
        data: { 
			mod: "chek_normal_user",
			email: email,
			password_user: pass,
			hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
		},
        error: function(req, text, error) {
            navigator.notification.alert("Ошибка подключения. Проверьте соединение с интернетом.", function(){} , 'Ошибка');
        },
        success: function (data) {
        	if (data == 0) {
				$('#welcome_sign_in_input_password').val("");
				navigator.notification.alert("Такого пользователя не существует или неверный пароль",function(){} , 'Ошибка');
			} else {
				json = JSON.parse(data);
				var f_name = json.first_name;
				var l_name = json.second_name;
				get_id_by_email($('#welcome_sign_in_input_email').val());
				localStorage.setItem('email', $('#welcome_sign_in_input_email').val());
				localStorage.setItem('first_name', f_name);
				localStorage.setItem('second_name', l_name);
				navigator.notification.alert("Вы успешно авторизировались", function(){} , 'Поздравляем');
				$('#welcome_content').fadeOut();
				$('#heading').fadeIn();
				$('#events_write').fadeIn();
				list_all_events(0, 10);
			}
        }
        //dataType: 'json'
    }); 
	/*
	$.get(url_api, {
        mod: "chek_normal_user",
        email: email,
		password_user: pass,
		hash_key: "ab2e0d69c72beb3c3817f79c7520fec6"
    }, function(data) {
        if (data == 0) {
			$('#welcome_sign_in_input_password').val("");
			navigator.notification.alert("Такого пользователя не существует или неверный пароль",function(){} , 'Ошибка');
		} else {
			json = JSON.parse(data);
			var f_name = json.first_name;
			var l_name = json.second_name;
            get_id_by_email($('#welcome_sign_in_input_email').val());
			localStorage.setItem('email', $('#welcome_sign_in_input_email').val());
			localStorage.setItem('first_name', f_name);
			localStorage.setItem('second_name', l_name);
			navigator.notification.alert("Вы успешно авторизировались", function(){} , 'Поздравляем');
			$('#welcome_content').fadeOut();
			$('#heading').fadeIn();
			$('#events_write').fadeIn();
			list_all_events(0, 10);
		}
    });
	*/
}