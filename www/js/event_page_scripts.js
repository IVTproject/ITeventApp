function load_schedule() {
    get_actios_from_event(localStorage.getItem("last_evet_id"));
}

function fill_actions(data) {
    change_title(localStorage.getItem('last_evet_name'), localStorage.getItem('last_evet_name'));
    
}
