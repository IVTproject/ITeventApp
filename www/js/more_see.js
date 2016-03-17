function more_events() {
    var begin = localStorage.getItem("begin_event") * 1 + localStorage.getItem("count_event") * 1;
    var count = localStorage.getItem("count_event") * 1;
    get_more_events(begin, count);
}

function more_notice() {
    var last_id_event = localStorage.getItem('last_evet_id');
    var count = localStorage.getItem("count_notice_" + last_id_event) * 1;
    var begin = localStorage.getItem("begin_notice_" + last_id_event) * 1 + count;
    fill_notice_filter_more(begin, count);
}
