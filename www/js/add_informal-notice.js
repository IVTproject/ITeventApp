function chek_and_write_informal() {
    var theme = document.getElementById('theme').value;
    var information = document.getElementById('information').value;
    var place = document.getElementById('place').value;
    if(theme.length > 0 && place.length > 0) {
        var organize = localStorage.getItem('first_name') + " " + localStorage.getItem('second_name');
        add_informal_to_server(localStorage.getItem('last_evet_id'), theme, organize, information, place);
    }
}