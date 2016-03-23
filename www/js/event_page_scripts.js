function load_schedule() {
    get_actios_from_event(localStorage.getItem("last_evet_id"));
}

function load_informal() {
    get_informal_from_event(localStorage.getItem("last_evet_id"));
}

function load_notice(begin, end) {
    $('#notice_bloks_content').text("");
    fill_notice_filter();
}

function rewrite_informal() {
    var data = localStorage.getItem("list_informal_" + localStorage.getItem('last_evet_id'));
    if(data && data != "undefined") {
        fill_informal(data);  
    } else {
        load_informal();
    }
}

function rewrite_notice() {
    var data = localStorage.getItem("list_notice_" + localStorage.getItem('last_evet_id'));
    if(data && data != "undefined") {
        fill_notice(data, 100000);  
    } else {
       fill_notice_filter();
    }
}

function rewrite_actions() {
    var data = localStorage.getItem("list_actions_" + localStorage.getItem('last_evet_id'));
    if(data && data != "undefined") {
        fill_actions(data);  
    } else {
        load_schedule();
    }
}

function fill_informal(data) {
    var json_array = JSON.parse(data);
    $('#bloks_informals').text("");
    for (var i = 0; json_array[i]; i++) {
        if(is_my_informal(json_array[i].id))
            $('#bloks_informals').append(creat_blok_informal(json_array[i]));
    }
    if($('#sort_informal').val() == "Популярности") {
        var a = [];
        for(var i = 0; json_array[i]; i++) {
            var pos = json_array[i].like;
            var n = json_array[i].like + json_array[i].dislike;
            if(n != 0) {
                phat = 1.0*pos/n;
                var z = 1.96*1.96;
                var x = (phat + z/(2*n) - 1.96 * Math.sqrt((phat*(1-phat)+z/(4*n))/n))/(1+z/n);
                a[json_array[i].id] = x;
            } else  {
                a[json_array[i].id] = 0;
            }
        }
        json_array.sort(function(x, y){return a[y.id] - a[x.id]});
    }
    for (var i = 0; json_array[i]; i++) {
        if(!is_my_informal(json_array[i].id))
            $('#bloks_informals').append(creat_blok_informal(json_array[i]));
    }
    click_informal();
	if (json_array.length == 0) {
		$('#bloks_informals').append("<p class='empty_message'>Список тусовок пуст, нажмите на «плюс», чтобы добавить свою тусовку</p>");
	}
}

function click_informal() {
    $(".visible_inform").click(function() {
        var c = $($(this).children().children().next().next()).is(":visible");
        $($(this).children().children().next().next()).toggle("slow");
        $(this).children().next().toggleClass('right_inform_block_up');
        
    });	
}

function fill_notice_filter() {
	hide("#notice_bloks_content");
	show("#preloader_notice");
    get_notice_from_event_filter(localStorage.getItem("last_evet_id"), 0, 10, fill_notice);
	
}

function fill_notice_filter_more(begin, count) {
	$('#notice_bloks_content').append('<div id="more_preloader"></div>');
    get_notice_from_event_filter(localStorage.getItem("last_evet_id"), begin, count, append_notice_more);
}

function append_notice_more(data, count) {
    var json_array = JSON.parse(data);
    var l_s = JSON.parse(localStorage.getItem("list_notice_" + localStorage.getItem('last_evet_id')));
    localStorage.setItem("list_notice_" + localStorage.getItem('last_evet_id'), data);
	$('#more_preloader').remove();
    for (var i = 0; json_array[i]; i++) {
        $('#notice_bloks_content').append(creat_blok_notice(json_array[i]));
        l_s.push(json_array[i]);
    }
    localStorage.setItem("list_notice_" + localStorage.getItem('last_evet_id'), JSON.stringify(l_s));
    if(json_array.length >= count) {
        $('#notice_bloks_content').append('<div class="more_events_click" id="more_notice_button" onclick="more_notice();">Ещё</div>');
    }
}

function fill_notice(data, count) {
    localStorage.setItem("list_notice_" + localStorage.getItem('last_evet_id'), data);
	hide("#preloader_notice");
	show("#notice_bloks_content");
    var json_array = JSON.parse(data);
    $('#notice_bloks_content').text("");
    for (var i = 0; json_array[i]; i++) {
        $('#notice_bloks_content').append(creat_blok_notice(json_array[i]));
    }
    if(json_array.length >= count) {
        $('#notice_bloks_content').append('<div class="more_events_click" id="more_notice_button" onclick="more_notice();">Ещё</div>');
    }
	if (json_array.length == 0) {
		$('#notice_bloks_content').append("<p class='empty_message'>Список объявлений пуст, нажмите на «плюс», чтобы добавить свое объявление</p>");
	}
}

function fill_actions(data) {
    var json_array = JSON.parse(data).list_actions;
    var num = 0;
    var number_day = 1;
    $('#content').text("");
    for (var i = 0; json_array[i]; i++) {
        var time = json_array[i].time;
        var n = time.split(" ")[0].split("-")[2];
        if (n != num) {
            $('#content').append("<div class='What_a_day'>День" +
                number_day + "</div>");
            number_day++;
            num = n;
        }
        $('#content').append(creat_block_schedule(json_array[i]));
    }
    show_hide_schedule();
	if (json_array.length == 0) {
		$('#content').append("<p class='empty_message'>Расписание пусто, обратитесь к организаторам</p>");
	}
}

function show_hide_schedule() {	
	/*ПЕРЕДЕЛАТЬ - НАЧАЛО*/
    $(".content_schedule").click(function() {
        var c = $(this).parent().next().is(":visible");		
		$(this).parent().next().toggle("slow");		
		$($(this).parent().next().next().children()).attr("src", c ? "img/arrow_to_down_schedule.svg" : "img/arrow_to_up_schedule.svg");
		$(this).css("white-space", c ? "nowrap" : "normal");	
    });
	
	$(".show_hide_schedule").click(function() {
        var c = $(this).prev().is(":visible");		
		$(this).prev().toggle("slow");		
		$($(this).children()).attr("src", c ? "img/arrow_to_down_schedule.svg" : "img/arrow_to_up_schedule.svg");	
		$($(this).prev().prev().children()).css("white-space", c ? "nowrap" : "pre-wrap");
    });	
	
	$(".more_info_schedule").click(function() {
        var c = $(this).is(":visible");		
		$(this).toggle("slow");		
		$(".arrow_to_down_up_schedule", $(this).parent()).attr("src", c ? "img/arrow_to_down_schedule.svg" : "img/arrow_to_up_schedule.svg");	
		$(this).prev().children().css("white-space", c ? "nowrap" : "pre-wrap");
    });
	/*ПЕРЕДЕЛАТЬ - КОНЕЦ*/
	
	
        //Галочка я пойду или нет (РАБОТАЕТ ВЕРНО!!!)
    $(".im_going_block").click(function() {
        //Галочка я пойду или нет      	
		$target_class = $(this).children('.im_going');
		$target_text = $(this).children('.im_going_text');
		if (!$target_class.is('.im_not_going')) {	
			$target_text.text("Иду"); 
			$target_text.css("color", "#1e96f5");
			$target_text.css("margin-left", "15px");
			$target_class.toggleClass('im_not_going', true);
			send_notification($target_class.data(), 9, function() {
				if (!$target_class.is('.im_not_going')) {
					cancel_notification($target_class.data('idNotification'));
				}
			});
		} else {	
			$target_text.text("Не иду");
			$target_text.css("color", "#c2c2c2") ;		
			$target_text.css("margin-left", "6px");
			$target_class.toggleClass('im_not_going', false);
			cancel_notification($target_class.data('idNotification'), function() {
				if ($target_class.is('.im_not_going')) {
					send_notification($target_class.data(), 9);
				}
			});	
		}
    });
}

function send_message() {
    var text = $('#textarea_message').val();
    $('#textarea_message').val("");
    if(text.length > 0) {
        $('#chat_message').append(block_my_message({message: text}));
    
        var name_user = localStorage.getItem("second_name") + " " + localStorage.getItem("first_name");
        send_message_server(localStorage.getItem('id_user'), localStorage.getItem("last_evet_id"), name_user, text);
    }
}

function refresh_chat() {
    setInterval(function () {
        var id_event = localStorage.getItem("last_evet_id");
        if(id_event && id_event != "undefined" && $('#chat').is(":visible")) {
            get_message_chat(0, id_event);
        }
    }, 1000);
}

function fill_chat(data) {
    var id_user = localStorage.getItem('id_user');
    $('#chat_message').text("");
    for(var i = 0; data[i]; i++) {
        if(data[i].id_user == id_user) {
            $('#chat_message').append(block_my_message(data[i]));
        } else {
            $('#chat_message').append(block_not_my_message(data[i]));
        }
    }
}

function block_my_message(inf) {
    return '<div class="chat_message_me"><div class="chat_message_me_left"></div><div class="chat_message_me_right">'+inf.message+'</div></div>'
}
function block_not_my_message(inf) {
    return '<div class="chat_message_your"><div class="chat_message_your_left">' +
			'<p>'+inf.name+'</p>'+inf.message+'</div><div class="chat_message_your_right"></div></div>';
}

function go_schedule() {
    if(!click_input_event) {
        next_page(localStorage.getItem("last_evet_name"), "none", "none");
        click_input_event = true;
        add_last_event(JSON.parse(localStorage.getItem("last_event")));
        get_information_about_event(localStorage.getItem("last_evet_id"));
        $('#chat_message').text("");
    }
    rewrite_actions();
    rewrite_informal();
    rewrite_notice();
    document.getElementById('go_schedule').click();
    document.getElementById('1').click();
}

function add_last_event(event) {
    var last_events = localStorage.getItem("last_events");
    if(last_events && last_events != "undefined") {
        last_events = JSON.parse(last_events);
        for(var i = 0; last_events[i]; i++) {
            if(last_events[i].id == event.id)
                return;
        }
        if(last_events.length >= 3) {
            var d_e = last_events.shift();
            localStorage.removeItem("list_informal_" + d_e.id);
            localStorage.removeItem("list_actions_" + d_e.id);
            localStorage.removeItem("list_notice_" + d_e.id);
            localStorage.removeItem("have_assessed_notice_" + d_e.id);
            localStorage.removeItem("have_assessed_informal_" + d_e.id);
            localStorage.removeItem("my_informals_" + d_e.id);
            localStorage.removeItem("my_notice_" + d_e.id);
        } 
        last_events.push(event);
    } else {
        last_events = [];
        last_events.push(event);
    }
    localStorage.setItem("last_events", JSON.stringify(last_events));
}

function gather_information(id) {
    var info = '{';
    info += '"have_assessed_notice":' + localStorage.getItem("have_assessed_notice_" + id) + ',';
    info += '"have_assessed_informal":' + localStorage.getItem("have_assessed_informal_" + id) + ',';
    info += '"my_informals":' + localStorage.getItem("my_informals_" + id) + ',';
    info += '"my_notice":' + localStorage.getItem("my_notice_" + id) + '}';
    return info;
    
}

function is_have_assessed(id) {
    var local = localStorage.getItem("have_assessed_notice_" + localStorage.getItem("last_evet_id"));
    if(local && local != "undefined") {
        var jsa = JSON.parse(localStorage.getItem("have_assessed_notice_" + localStorage.getItem("last_evet_id")));
        for(var i = 0; jsa[i]; i++) {
            if(jsa[i] == id) {
                return -1;
            }
        }
        return 0;
    } else {
        return 0;
    }
}

function have_assessed(id) {
    
    var local = localStorage.getItem("have_assessed_notice_" + localStorage.getItem("last_evet_id"));
    if(local && local != "undefined") {
        var jsa = JSON.parse(local);
        jsa.push(id);
        localStorage.setItem("have_assessed_notice_" + localStorage.getItem("last_evet_id"), JSON.stringify(jsa));
    } else {
        localStorage.setItem("have_assessed_notice_" + localStorage.getItem("last_evet_id"), JSON.stringify([id]));
    }
}

function dislike_notice(id) {
    $("#block_notice_" + id).hide("slow", function(){$(this).remove();});
    have_assessed(id);
    set_information_about_event(localStorage.getItem('last_evet_id'));
}

function is_my_informal(id) {
    if(localStorage.getItem("my_informals_" + localStorage.getItem("last_evet_id")) &&
    localStorage.getItem("my_informals_" + localStorage.getItem("last_evet_id")) != "undefined") {
    var my_informals = JSON.parse(localStorage.getItem("my_informals_" + localStorage.getItem("last_evet_id")));
    for(var i = 0; my_informals[i]; i++) {
        if(my_informals[i] == id) {
            return true;
        }
    }
    }
    return false;
}

function is_my_notice(id) {
    if(localStorage.getItem("my_notice_" + localStorage.getItem("last_evet_id")) &&
    localStorage.getItem("my_notice_" + localStorage.getItem("last_evet_id")) != "undefined") {
    var my_notice = JSON.parse(localStorage.getItem("my_notice_" + localStorage.getItem("last_evet_id")));
    for(var i = 0; my_notice[i]; i++) {
        if(my_notice[i] == id) {
            return true;
        }
    }
    }
    return false;
}

function creat_blok_notice(inf) {
    if(is_have_assessed(inf.id) == -1) {
        return "";
    }
    var left_bottom = '<div class="hide_block_ads" onclick="dislike_notice('+inf.id+');"><p class="hide_ads">Скрыть объявление</p></div>';
    if(is_my_notice(inf.id)) {
        var left_bottom = '<div class="hide_block_ads" onclick="delete_notice('+inf.id+');"><p class="hide_ads">Удалить объявление</p></div>';
    }
    return '<div id="block_notice_'+inf.id+'"><div class="ads_content"><div class="title_ads">'+inf.type+': '+inf.name+'</div><div class="dop_contents_ads"><div class="information_ads">'+inf.information+'</div><div class="contacts_inf_ads"><b>Контактная информация:</b></div><div class="contacts_name_blocks_ads"><div class="contacts_phone_ads">'+inf.contact+'</div><div class="contacts_phone_name">'+inf.FIO+'</div></div></div>'+left_bottom+'</div></div>';
}

function complete_informsl(id) {
    $("#block_informal_" + id).hide("slow", function(){$(this).remove();});
    make_inactive_informal(id);
}

function like_and_dislike(id_informal, assessed) {
    var local = localStorage.getItem("have_assessed_informal_" + localStorage.getItem("last_evet_id"));
    if(local && local != "undefined") {
        var jsa = JSON.parse(local);
        var em = true;
        for(var i = 0; jsa[i]; i++) {
            if(jsa[i].id == id_informal) {
                em = false;
                if(jsa[i].rang != assessed) {
                    change_rang_informal(id_informal, assessed, 1);
                    jsa[i].rang = assessed;
                }
            }
        }
        if(em) {
            jsa.push({id:id_informal, rang: assessed});
            change_rang_informal(id_informal, assessed, 0);
        }
        localStorage.setItem("have_assessed_informal_" + localStorage.getItem("last_evet_id"), JSON.stringify(jsa));
    } else {
        localStorage.setItem("have_assessed_informal_" + localStorage.getItem("last_evet_id"), JSON.stringify([{id:id_informal, rang: assessed}]));
        change_rang_informal(id_informal, assessed, 0);
    }
}

function change_rangs_to_informal(id_informal, data) {
    data = JSON.parse(data);
    $("#rate_like_" + id_informal).text(data.like);
    $("#rate_dislike_" + id_informal).text(data.dislike);
}

function creat_blok_informal(inf) {
    var left_down_blok = '';
    if(is_my_informal(inf.id)) {
        left_down_blok = '<div onclick="complete_informsl(\''+inf.id+'\');" class="hide_block_inform"><p class="hide_inform">Завершить общение</p></div>';
    } else {
        left_down_blok = '<div class="rate_inform"><div onclick="like_and_dislike(\''+inf.id+'\', 1);" class="like_inform"></div><div id="rate_like_'+inf.id+'"  class="rate_like">'+inf.like+'</div><div onclick="like_and_dislike(\''+inf.id+'\', -1);" class="dislike_inform"></div><div class="rate_dislike"  id="rate_dislike_'+inf.id+'">'+inf.dislike+'</div></div>';
    }
    return '<div id="block_informal_'+inf.id+'" class="inform_block"><div class="visible_inform"><div class="left_inform_block"><div class="name_inform">'+inf.organize+'</div><div class="title_inform">'+inf.theme+'</div><div class="more_info_inform"><div class="description_inform">'+inf.information+'</div><div class="place_inform"><b>Место встречи:</b>'+inf.place+'</div></div></div><div class="right_inform_block"></div></div>'+left_down_blok+'</div>';
}

function creat_block_schedule(inf) {
    var result = "";
    var time = inf.time.split(" ")[1].split(":");
	var dop = "";
	for (var i = 0; inf.additional_fields[i]; i++) {
		//console.log(inf);
        dop += "<p><b> " + inf.additional_fields[i].name + " :</b> " +
            inf.additional_fields[i].value + " </p>";
    }
    dop += "<p><b>На лекцию идёт: </b>" + inf.who_is_coming.split(",").length +
        " человек</p>";
	
	result += '<div class="block_schedule">'+
			'<div class="block_schedule_vis">'+				
				'<div class="content_schedule"><b>'+time[0]+':'+time[1]+' — </b>'+inf.name+'</div>'+
				'<div class="im_going_block">'+
					'<div class="im_going" data-id-notification="' + inf.id + '" data-text-notification="' + inf.name +'" data-time-notification="' + inf.time + '"></div>'+
					'<div class="im_going_text">Не иду</div>'+
				'</div>'+
			'</div>'+			
			'<div class="more_info_schedule">'+dop+'</div>'+
			'<div class="show_hide_schedule">'+
				'<img width="21" src="img/arrow_to_down_schedule.svg" onerror="this.onerror=null; this.src=\'img/arrow_to_down_schedule.png\'" class="arrow_to_down_up_schedule">'+
			'</div>'+
		'</div>';
    return result;
}