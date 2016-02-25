function list_all_events() {
$.get(
    "http://it-event.esy.es/api.php", 
    { 
        mod: "list_all_events"
    },
    function(data){fill_list_events("events_write", data);}
)
}
function list_filter_events() {
  	$.get(
     "http://it-event.esy.es/api.php?mod=list_filter_events&" + get_text_format_filter(), 
    { 
    },
    function(data){ fill_list_events("events_write", data);});
}
function get_list_city() {get_list_city
    $.get(
     "http://it-event.esy.es/api.php", 
    { 
		mod: "get_list_city"
    },
    function(data){ creat_filter(data);});
}

