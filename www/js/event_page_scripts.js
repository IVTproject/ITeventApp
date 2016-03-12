function load_schedule() {
    get_actios_from_event(localStorage.getItem("last_evet_id"));
}

function load_informal(begin, end) {
    get_informal_from_event(localStorage.getItem("last_evet_id"), begin,
        end);
}

function load_notice(begin, end) {
    get_notice_from_event(localStorage.getItem("last_evet_id"), begin,
        end);
}

function fill_informal(data) {
    var json_array = JSON.parse(data);
    $('#bloks_informals').text("");
    for (var i = 0; json_array[i]; i++) {
        $('#bloks_informals').append(creat_blok_informal(json_array[i]));
    }
    click_informal();
}

function fill_notice(data) {
    var json_array = JSON.parse(data);
    $('#notice_bloks_content').text("");
    json_array.sort(function(a, b) {
        return b.popularity - a.popularity;
    });
    for (var i = 0; json_array[i]; i++) {
        $('#notice_bloks_content').append(creat_blok_notice(json_array[i]));
    }
}

function fill_actions(data) {
    filter("none");
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
}

function show_hide_schedule() {	
    $(".block_schedule_click").click(function() {
        var c = $(this).parent().next().is(":visible");		
		$(this).parent().next().toggle("slow");		
		$(".arrow_to_down_up_schedule", this).attr("src", c ? "img/arrow_to_down_schedule.svg" : "img/arrow_to_up_schedule.svg");	
    });
	
	$(".more_info_schedule").click(function() {
        var c = $(this).is(":visible");		
		$(this).toggle("slow");		
		$(".arrow_to_down_up_schedule", $(this).parent()).attr("src", c ? "img/arrow_to_down_schedule.svg" : "img/arrow_to_up_schedule.svg");	
    });
	
    //Галочка я пойду или нет
    $(".im_going_block").click(function() {
        //Галочка я пойду или нет            
		$(this).children('.im_going').toggleClass('im_not_going');
		if ($(this).children().is('.im_not_going')) {					
			$(this).children('.im_going_text').text("Иду"); 
			$(this).children('.im_going_text').css("color", "#1e96f5");
			$(this).children('.im_going_text').css("margin-left", "7px");
		}else {					
			$(this).children('.im_going_text').text("Не Иду");
			$(this).children('.im_going_text').css("color", "#c2c2c2") ;					
			$(this).children('.im_going_text').css("margin-left", "1px");
		}
    });
}

function chek_data_user() {
    var first_name = document.getElementsByName('first_name')[0].value;
    var second_name = document.getElementsByName('second_name')[0].value;
    if (first_name.length >= 2 && second_name.length >= 2) {
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("second_name", second_name);
        change_refresh_button("event_page");
        change_title(localStorage.getItem('last_evet_name'), localStorage.getItem(
        'last_evet_name'));
        load_schedule();
        load_informal(0, 15);
        load_notice(0, 15);
        document.getElementById('go_schedule').click();
    } else {
        alert("Заполните поля выше");
    }
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
    have_assessed(id, -1);
}

function creat_blok_notice(inf) {
    if(is_have_assessed(inf.id) == -1) {
        return "";
    }
    return '<div id="block_notice_'+inf.id+'"><div class="ads_content"><div class="title_ads">'+inf.name+'</div><div class="dop_contents_ads"><div class="information_ads">'+inf.information+'</div><div class="contacts_inf_ads"><b>Контактная информация:</b></div><div class="contacts_name_blocks_ads"><div class="contacts_phone_ads">'+inf.contact+'</div><div class="contacts_phone_name">'+inf.FIO+'</div></div></div><div class="rate_block_ads"><div class="dislike_ads" onclick="dislike_notice('+inf.id+');">-</div></div></div></div>';
}

function creat_blok_informal(inf) {
    return '<div class="inform_block"> <div class="visible_inform"> <div class="inform_target">' +
        inf.theme + '</div> <div class="inform_name">' + inf.organize +
        '</div></div>' +
        '<div class="hide_inform"><div class="info_inform">' + inf.information +
        '</div>' + '<div class="place_inform"><b>Место встречи:</b>' + inf.place +
        '</div>' +
        '</div><div class="show_hide_info"><img src="img/arrow_to_down_schedule.png"' +
        'class="arrow_to_down_up_schedule"></div></div>';
}

function creat_block_schedule(inf) {
    var result = "";
    var time = inf.time.split(" ")[1].split(":");
	var dop = "";
	for (var i = 0; inf.additional_fields[i]; i++) {
        dop += "<p><b> " + inf.additional_fields[i].name + " :</b> " +
            inf.additional_fields[i].value + " </p>";
    }
    dop += "<p><b>На лекцию идёт: </b>" + inf.who_is_coming.split(",").length +
        " человек</p></div></div>";
	
	result += '<div class="block_schedule"><div class="block_schedule_vis"><div class="im_going_block"><div class="im_going"></div><div class="im_going_text">Не Иду</div></div><div class="block_schedule_click"><div class="content_schedule"><b>'+time[0]+':'+time[1]+' — </b>'+inf.name+'</div><div class="show_hide_schedule"><img width="21" src="img/arrow_to_down_schedule.svg" onerror="this.onerror=null; this.src=\'img/arrow_to_down_schedule.png\'" class="arrow_to_down_up_schedule"></div></div></div><div class="more_info_schedule">'+dop+'</div></div>';
	
    return result;
}