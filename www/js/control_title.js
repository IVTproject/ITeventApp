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
    }
}