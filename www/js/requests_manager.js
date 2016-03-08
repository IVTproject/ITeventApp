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