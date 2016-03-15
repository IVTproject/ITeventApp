var filter_object = [];

function creat_filter(data) {
    array_city = JSON.parse(data);
    var html_text = '<option value="" selected>Все</option>';
    for (var i = 0; array_city[i]; i++) {
        html_text += '<option value="'+array_city[i]+'">'+array_city[i]+'</option>';
    }
    document.getElementById('city_select').innerHTML = html_text;
}

function get_text_format_filter() {
    var list_city = document.getElementById('city_select').value;
    //var is_first = true;
  /*  for (var i = 0; filter_object[i]; i++) {
        if (filter_object[i].ischecked) {
            if (is_first) {
                is_first = false;
            } else {
                list_city += ",";
            }
            list_city += filter_object[i].name;
        }
    }*/
    var begin_date = document.getElementById('begin_date').value;
    var end_date = document.getElementById('end_date').value;
    if (list_city != "") return ("list_city=" + list_city + "&begin_date=" +
        begin_date + "&end_date=" + end_date);
    else return ("begin_date=" + begin_date + "&end_date=" + end_date);
}

function past_date_to_filter(data) {
    data = JSON.parse(data);
    if(!data.min_date || !data.max_date) {
        $('#begin_date').val("2000-01-01");
        $('#end_date').val("2030-01-01");
    } else {
        $('#begin_date').val(data.min_date.split(" ")[0]);
        $('#end_date').val(data.max_date.split(" ")[0]);
    }
}