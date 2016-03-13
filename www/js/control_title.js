var stack_title = [];
var click_input_event = false;

function change_title(new_title, prev_title) {
    stack_title.push(prev_title);
    var backButton = document.getElementsByClassName('backButton');
    if (backButton) {
        backButton[0].addEventListener("click", back);
        window.addEventListener("popstate", back);
    }
    if (new_title != prev_title) document.getElementById('top_title').innerHTML =
        "<h1><marquee scrollamount='3'>" + new_title + "</marquee></h1>";
}

function click_back_button() {
    var backButton = document.getElementsByClassName('backButton');
    if (backButton) {
        backButton[0].click();
    }
}

function clear_title() {
    document.getElementById('top_title').innerHTML = "";
}

function duble_title() {
    stack_title.push(localStorage.getItem('last_evet_name'));
}

function back(e) {
	click_input_event = false;
    if (stack_title.length != 0) {
        if (stack_title.length == 1) {
            document.getElementById('top_title').innerHTML = "<h1>" +
                stack_title.pop(); + "</h1>";
            change_refresh_button("event_list");
        } else {
            stack_title.pop();
        }
        if (stack_title.length == 0) filter("list_events");
    }
}

function filter(filter) {
    if (filter == "list_events") {
        $('#filter_conteiner').text("");
        $('#filter_conteiner').append(
            "<img src=\"img/filter.svg\" width=\"26\" onerror=\"this.onerror=null; this.src='img/filter.png'\" class='settings' onclick=\"show('#filter_black');\">"
        );
    }
    if (filter == "none") {
        $('#filter_conteiner').text("");
    }
}