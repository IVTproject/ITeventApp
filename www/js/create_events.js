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
   return "<a class='a_event' href='1.html' onclick='get_event_information(" + event.id + ")'><div class='event'> <div class='event_all'> <div class='event_ava'>" +
   "<img src='" + event.pictures + "' class='round' width='64px' height='64px'>" +
   "</div> <div class='event_title'> <div class='event_name'>" + event.name + "</div>" +
   "<div class='event_date'>" + date_format(event.begin_date) + "</div> </div> </div>" + 
   "<div class='clearer'>&nbsp;</div> <div class='event_content'>" + 
   event.information + "</div> </div></a>";
}

function get_inform_event(event_inform) {
	//console.log(event_inform);
	info = JSON.parse(event_inform);
    $('#date_event').text(date_deg_format(info.begin_date));
	$('#img_ava_event').attr("src", info.pictures);
	$('#name_event').text(info.name);
	$('#text_event_info').text(info.information);
	$('#text_city_info').text(info.city);
	$('#text_adres_info').text(info.address);
	$('#text_organizer_info').text(info.organizer);
	$('#site_info').attr("href", info.site);
	$('#site_info').text(info.site);
}
