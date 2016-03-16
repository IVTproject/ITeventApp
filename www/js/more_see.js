function more_events() {
    var begin = localStorage.getItem("begin_event") * 1 + localStorage.getItem("count_event") * 1;
    var count = localStorage.getItem("count_event") * 1;
    get_more_events(begin, count);
}