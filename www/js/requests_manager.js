function list_all_events() {
    show('#preloader_events');
    $.get("http://it-event.esy.es/api.php", {
        mod: "list_all_events"
    }, function(data) {
        fill_list_events("events_write", data);
        hide('#preloader_events');
    });
}

function list_filter_events() {
    hide('#events_write');
    show('#preloader_events');
    $.get("http://it-event.esy.es/api.php?mod=list_filter_events&" +
        get_text_format_filter(), {}, function(data) {
            fill_list_events("events_write", data);
            hide('#preloader_events');
            show('#events_write');
        });
}

function get_list_city() {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_list_city"
    }, function(data) {
        creat_filter(data);
    });
}


function get_notice_from_event(id_event, begin, end) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_notice_from_event",
        id_event: id_event,
        begin: begin,
        end: end
    }, function(data) {
        fill_notice(data);
    }); 
}

function get_actios_from_event(id_event) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "list_actios_from_event",
        id: id_event
    }, function(data) {
        fill_actions(data);
    });
}

function get_informal_from_event(id_event, num_begin, num_end) {
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_informal",
        id_event: id_event,
        begin: num_begin,
        end: num_end
    }, function(data) {
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
        load_informal(0, 15);
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
    $.get("http://it-event.esy.es/api.php", {
        mod: "get_event_information",
        id: id
    }, function(data) {
        get_inform_event(data);
        hide('#preloader_event');
        show("#event_pane")
    });
}