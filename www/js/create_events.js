function fill_list_events(events, max_count) {
    $('#events_write').text("");
    var last_events = localStorage.getItem('last_events');
    if(last_events && last_events != "undefined") {
        $('#events_write').append("<div class='What_a_day'>Последнее</div>");
        var last_events = JSON.parse(last_events);
        for(var i = 0; last_events[i]; i++)
            $('#events_write').append(creat_block(last_events[i]));
    }
	if (!events && (!last_events || last_events == 'undefined')) {
		$('#events_write').append("<p class='empty_message'>Ошибка подключения. Проверьте соединение с интернетом.</p>");
	}
    if(!events) {
        return;
	}
    $('#events_write').append("<div class='What_a_day'>Все</div>");
    var json = JSON.parse(events);
    var array_event = json.list_events;
    for (var i = 0; array_event[i]; i++) {
       $('#events_write').append(creat_block(array_event[i]));
    }
    if(array_event.length == max_count) {
        $('#events_write').append('<div class="more_events_click" id="more_event_button" onclick="more_events();">Ещё</div>');
    } else {
        $('#events_write').append('<div class="paragraph"></div>');
    }
    row_truncation();
}

function append_list_events(events, max_count) {
    var json = JSON.parse(events);
    var array_event = json.list_events;
    for (var i = 0; array_event[i]; i++) {
       $('#events_write').append(creat_block(array_event[i]));
    }
    if(array_event.length == max_count) {
        $('#events_write').append('<div class="more_events_click" id="more_event_button" onclick="more_events();">Ещё</div>');
    } else {
        $('#events_write').append('<div class="paragraph"></div>');
    }
    row_truncation();
}

function creat_block(event) {
    date_format(event.begin_date);
    return "<a id='event_" + event.id + "' class='a_event' href='#event_page' onclick='get_event_information(" +
    event.id +
        ")'><div class='event'> <div class='event_all'> <div class='event_ava'>" +
        "<img src='" + event.pictures +
        "' class='round' width='64px' height='64px'>" +
        "</div> <div class='event_title'> <div class='event_name'>" + event
        .name + "</div>" + "<div class='event_date'>" + date_format(event.begin_date) +
        "</div> </div> </div>" +
        "<div class='clearer'>&nbsp;</div> <div class='event_content' style='line-height: 20px;' data-truncate-lines=\"5\">" +
        event.information + "</div> </div></a>";
}

function get_inform_event(event_inform) {
    //console.log(event_inform);
    info = JSON.parse(event_inform);
    next_page(info.name, "none", "none");
    localStorage.setItem("last_evet_id", info.id);
    localStorage.setItem("last_evet_name", info.name);
    localStorage.setItem("last_event", event_inform);
    $('#date_event').text(date_deg_format(info.begin_date));
    $('#img_ava_event').attr("src", info.pictures);
    $('#name_event').text(info.name);
    $('#text_event_info').text(info.information);
    $('#text_city_info').text(info.city);
    $('#text_adres_info').text(info.address);
    $('#text_organizer_info').text(info.organizer);
    $('#site_info').attr("href", info.site);
    $('#site_info').text(info.site);
    $('#text_begin_date_info').text(date_time_format(info.begin_date));
    $('#text_end_date_info').text(date_time_format(info.end_date));
}