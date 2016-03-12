function refresh_actions() {
    load_schedule();
}

function refresh_events() {
    list_all_events();
}

function refresh_informal() {
    load_informal(0, 15);
}

function refresh_notice() {
    load_notice(0, 15);
}

function delete_refresh_button() {
    $('#refresh_button').text("");
}

function change_refresh_button(name_refresh_button) {
    $('#refresh_button').text("");
    if(name_refresh_button == "event_page") {
        $('#refresh_button').append('<img src="img/refresh.png" class="settings" onclick="refresh_actions();  refresh_informal(); refresh_notice();">');
    }
    if(name_refresh_button == "event_list") {
        $('#refresh_button').append('<img src="img/refresh.png" class="settings" onclick="refresh_events();">');
    }
}