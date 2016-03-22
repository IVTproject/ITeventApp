 function select_start_page() {
    var first_name = localStorage.getItem('first_name');
    var second_name = localStorage.getItem('second_name');
    var email = localStorage.getItem('email');
    if(!first_name || !second_name) {
        $('#heading').fadeOut();
        $('#events_write').fadeOut();
    } else {
        $('#welcome_content').fadeOut();
        list_all_events(0, 10);
    }
}

function introduce() {
    localStorage.setItem('first_name', $('#welcome_sign_input_first_name').val());
    localStorage.setItem('second_name', $('#welcome_sign_input_last_name').val());
    $('#welcome_content').fadeOut();
    $('#heading').fadeIn();
    $('#events_write').fadeIn();
    list_all_events(0, 10);
}