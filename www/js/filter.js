var filter_object = [];

function filter_city(name_city) {
    var cheсk_box = document.getElementById(name_city);
    for (var i = 0; filter_object[i]; i++) {
        if (filter_object[i].name == name_city) {
            filter_object[i].ischecked = cheсk_box.checked;
            return;
        }
    }
    filter_object.push({
        name: name_city,
        ischecked: cheсk_box.checked
    });
}

function creat_filter(data) {
    array_city = JSON.parse(data);
    var html_text = "";
    for (var i = 0; array_city[i]; i++) {
        html_text += " <input type='checkbox' class='checkbox' id='" +
            array_city[i] + "'" + " onclick=\"filter_city(\'" + array_city[
                i] + "\');\"/>" + " <label for='" + array_city[i] + "'>" +
            array_city[i] + "</label>";
    }
    document.getElementById('content_list_city').innerHTML += html_text;
}

function get_text_format_filter() {
    var list_city = "";
    var is_first = true;
    for (var i = 0; filter_object[i]; i++) {
        if (filter_object[i].ischecked) {
            if (is_first) {
                is_first = false;
            } else {
                list_city += ",";
            }
            list_city += filter_object[i].name;
        }
    }
    var begin_date = document.getElementById('begin_date').value;
    var end_date = document.getElementById('end_date').value;
    if (!is_first) return ("list_city=" + list_city + "&begin_date=" +
        begin_date + "&end_date=" + end_date);
    else return ("begin_date=" + begin_date + "&end_date=" + end_date);
}