function fill_list_events(id_container, events) {
    var json = JSON.parse(events);
    var container = document.getElementById(id_container);
    container.innerHTML = "";
    var array_event = json.list_events;
    for(var i = 0; array_event[i]; i++) {
        container.innerHTML += creat_block(array_event[i]);
    }
}

function creat_block(event) {
   date_format(event.begin_date);
   return "<div class='event'> <div class='event_all'> <div class='event_ava'>" +
   "<img src='" + event.pictures + "' class='round' width='64px' height='64px'>" +
   "</div> <div class='event_title'> <div class='event_name'>" + event.name + "</div>" +
   "<div class='event_date'>" + date_format(event.begin_date) + "</div> </div> </div>" + 
   "<div class='clearer'>&nbsp;</div> <div class='event_content'>" + 
   event.information + "</div> </div>";
}
