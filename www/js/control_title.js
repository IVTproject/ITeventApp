var stack_header = [];
var click_input_event = false;

function next_page(title, filter, refresh) {
    var prev_title = document.getElementById('top_title').innerHTML;
    var prev_filter = document.getElementById('filter_conteiner').innerHTML;
    var prev_refresh = document.getElementById('refresh_button').innerHTML;
    stack_header.push({title: prev_title, filter: prev_filter, refresh: prev_refresh});
    var backButton = document.getElementsByClassName('backButton');
    if (backButton) {
        backButton[0].addEventListener("click", back);
        window.addEventListener("popstate", back);
    }   
    
    next_title = "<h1><marquee scrollamount=\"3\">" + title + "</marquee></h1>";
    if (next_title != prev_title) document.getElementById('top_title').innerHTML = next_title;
    past_filter(filter);
    change_refresh_button(refresh);
}

function click_back_button() {
    var backButton = document.getElementsByClassName('backButton');
    if (backButton) {
        backButton[0].click();
        return true;
    }
    return false;
}

function back(e) {
	click_input_event = false;
    if (stack_header.length != 0) {
        var prev_header = stack_header.pop();
        if (document.getElementById('top_title').innerHTML != prev_header.title)
            document.getElementById('top_title').innerHTML = prev_header.title;
        document.getElementById('filter_conteiner').innerHTML = prev_header.filter;
        document.getElementById('refresh_button').innerHTML = prev_header.refresh;
        //if(stack_header.length == 0)
           // list_filter_events(0, 10);
    }
}

function past_filter(filter) {
    $('#filter_conteiner').text("");
    if (filter == "none") {
        return;
    }
    var onclick = "";
    if (filter == "list_events") {
        onclick = "show('#filter_black_events');";
    }
    if(filter == "list_notice") {
        onclick = "show('#filter_black_ads');";
    }
    if(filter == "list_infomal") {
        onclick = "show('#filter_black_inform');";
    }
    $('#filter_conteiner').append("<img src=\"img/filter.svg\" width=\"26\" onerror=\"this.onerror=null; this.src='img/filter.png'\" class='settings' onclick=\""+onclick+"\">");
}

function refresh_actions() {
    load_schedule();
}

function refresh_events() {
    list_all_events(0, 10);
}

function refresh_informal() {
    load_informal();
}

function refresh_notice() {
    load_notice(0, 15);
}

function delete_refresh_button() {
    $('#refresh_button').text("");
}
function change_refresh_button(name_refresh_button) {
    $('#refresh_button').text("");
    if(name_refresh_button == "none") {
        return;
    }
    if(name_refresh_button == "action") {
        $('#refresh_button').append('<img src="img/refresh.svg" width="26" class="settings" onerror="this.onerror=null; this.src=\'img/refresh.png\'" onclick="refresh_actions();">');
    }
    if(name_refresh_button == "notice") {
        $('#refresh_button').append('<img src="img/refresh.svg" width="26" class="settings" onerror="this.onerror=null; this.src=\'img/refresh.png\'" onclick="refresh_notice();">');
    }
    if(name_refresh_button == "informal") {
        $('#refresh_button').append('<img src="img/refresh.svg" width="26" class="settings" onerror="this.onerror=null; this.src=\'img/refresh.png\'" onclick="refresh_informal();">');
    }
    if(name_refresh_button == "event_list") {
        $('#refresh_button').append('<img src="img/refresh.svg" width="26" onerror="this.onerror=null; this.src=\'img/refresh.png\'" class="settings" onclick="refresh_events();">');
    }
}