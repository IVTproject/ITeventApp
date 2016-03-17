function list_all_events(begin, count) {
    hide('#events_write');
    show('#preloader_events');
    localStorage.setItem("begin_event", begin);
    localStorage.setItem("count_event", count);
     $.ajax({
        type: 'GET',
        url: 'http://it-event.tk/api.php',
        data: {
        mod: "list_all_events",
        begin: begin,
        count: count
        },
        error: function(req, text, error) {
            fill_list_events(null, count);
            hide('#preloader_events');
            show('#events_write');
        },
        success: function(data) {
            fill_list_events(JSON.stringify(data), begin + count);
            show('#events_write');
            hide('#preloader_events');
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
        url: "http://it-event.esy.es/api.php?begin="+begin+"&count="+count+"&mod=list_filter_events&" + get_text_format_filter(),
        data: {},
        error: function(req, text, error) {
            fill_list_events(null, count);
            hide('#preloader_events');
            show('#events_write');
        },
        success: function(data) {
            fill_list_events(JSON.stringify(data), count);
            hide('#preloader_events');
            show('#events_write');
        },
        dataType: 'json'
    });
}

function get_min_and_max_date() {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_min_and_max_date"
    }, function(data) {
        past_date_to_filter(data);
    });
}

function get_more_events(begin, count) {
    $('#more_event_button').remove();
    $.get("http://it-event.esy.es/api.php?begin="+begin+"&count="+count+"&mod=list_filter_events&" +
        get_text_format_filter(), {}, function(data) {
            append_list_events(data, count);
        });
    localStorage.setItem("begin_event", begin);
    localStorage.setItem("count_event", count);
}

function get_list_city() {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_list_city"
    }, function(data) {
        creat_filter(data);
    });
}


function get_notice_from_event(id_event, begin, count) {
    $('#more_notice_button').remove();
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_notice_from_event",
        id_event: id_event,
        begin: begin,
        count: count
    }, function(data) {
        fill_notice(data, count);
    }); 
    var last_id_event = localStorage.getItem('last_evet_id');
    localStorage.setItem("begin_notice_" + last_id_event, begin);
    localStorage.setItem("count_notice_" + last_id_event, count);
}


function get_notice_from_event_filter(id_event, begin, count, callBackF) {
    $('#more_notice_button').remove();
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_notice_from_event",
        id_event: id_event,
        begin: begin,
        count: count,
        types: get_text_format_filter_notice()
    }, function (data) { callBackF(data) }); 
    var last_id_event = localStorage.getItem('last_evet_id');
    localStorage.setItem("begin_notice_" + last_id_event, begin);
    localStorage.setItem("count_notice_" + last_id_event, count);
}

function get_actios_from_event(id_event) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "list_actios_from_event",
        id: id_event
    }, function(data) {
        localStorage.setItem("list_actions_" + localStorage.getItem('last_evet_id'), data);
        fill_actions(data);
    });
}

function get_informal_from_event(id_event) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_informal",
        id_event: id_event
    }, function(data) {
        localStorage.setItem("list_informal_" + localStorage.getItem('last_evet_id'), data);
        fill_informal(data);
    });
}

function change_rang_informal(id_informal, inc, is_throwing) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "change_rang_informal",
        id_informal: id_informal,
        inc: inc,
        is_throwing: is_throwing
    }, function(data) {
        change_rangs_to_informal(id_informal, data);
    });
}

function add_notice_to_server(id_event, name, FIO, type, information, contact) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "add_notice_form_event",
        id_event: id_event,
        name: name,
        FIO: FIO,
        type: type,
        information: information,
        contact: contact
    }, function(data) {
        load_notice(0, 15);
        click_back_button();
    });
}


function add_informal_to_server(id_event, theme, organize, information, place) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "add_informal",
        id_event: id_event,
        theme: theme,
        organize: organize,
        information: information,
        place: place
    }, function(data) {
        remember_id_informal(data);
        load_informal();
        click_back_button();
    });
}

function make_inactive_informal(id_informal) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "make_inactive_informal",
        id_informal: id_informal
    }, function(data) {});
}

function get_event_information(id) {
    
    
    hide("#event_pane");
    show("#preloader_event");
    $.ajax({
        type: 'GET',
        url: 'http://it-event.tk/api.php',
        data: {mod: "get_event_information", id: id},
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