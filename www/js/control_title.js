var stack_title = [];

function change_title(new_title, prev_title) {
    stack_title.push(prev_title);
    var backButton = document.getElementsByClassName('backButton');
    if(backButton) {
        backButton[0].addEventListener("click", back);   
        window.addEventListener("popstate", back);
    }
    document.getElementById('top_title').innerHTML = "<h1>" + new_title + "</h1>"; 
}

function clear_title() {
    document.getElementById('top_title').innerHTML = "";
}

function back(e) {
    if(stack_title.length != 0) {
        document.getElementById('top_title').innerHTML = "<h1>" + stack_title.pop(); + "</h1>";
        if(stack_title.length == 0)
            filter("list_events");
    }
}

function filter(filter) {
    if(filter == "list_events") {
        $('#filter_conteiner').text("");
        $('#filter_conteiner').append('<img src="img/filter.png" class="settings" onclick="show("#filter_black");>');
    }
    if(filter == "none") {
        $('#filter_conteiner').text("");
    }
}