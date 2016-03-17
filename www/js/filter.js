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
    var list_city = "";
    var is_first = true;
    $('#city_select option').each(function(){
        if(this.selected && this.value != "") {
            if(is_first)
                is_first = false;
            else
                list_city += ",";
            list_city += this.value;
        }
    });
  
    var begin_date = document.getElementById('begin_date').value;
    var end_date = document.getElementById('end_date').value;
    if (list_city != "") return ("list_city=" + list_city + "&begin_date=" +
        begin_date + "&end_date=" + end_date);
    else return ("begin_date=" + begin_date + "&end_date=" + end_date);
}

function get_text_format_filter_notice() {
    var types = "";
    var is_first = true;
    $('#categories_ads option').each(function(){
        if(this.selected && this.value != "") {
            if(is_first)
                is_first = false;
            else
                types += ",";
            types += this.value;
        }
    });
    return types;
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