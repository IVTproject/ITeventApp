function load_schedule() {
    get_actios_from_event(localStorage.getItem("last_evet_id"));
}

function fill_actions(data) {
    change_title(localStorage.getItem('last_evet_name'), localStorage.getItem('last_evet_name'));
    var json_array = JSON.parse(data).list_actions;
    var num = 0;
    var number_day = 1;
    $('#content').text("");
    for(var i = 0; json_array[i]; i++) {
        var time = json_array[i].time;
        var n = time.split(" ")[0].split("-")[2];
        if(n != num) {
            $('#content').append("<div class='What_a_day'>День" + number_day + "</div>");
            number_day++;
            num = n;
        }
        $('#content').append(creat_block_schedule(json_array[i]));
    }
    show_hide_schedule();
}

function show_hide_schedule() {
   $(".show_hide_schedule").click(function() {
		var c = $(this).prev().is(":visible");
		$(this).prev().toggle("slow");
		$(".arrow_to_down_up_schedule", this).attr("src", c ? "img/arrow_to_down_schedule.png" : "img/arrow_to_up_schedule.png");
	});
	//Галочка я пойду или нет
	$(".im_going").click(function() {		
		$(this).toggleClass('im_not_going');
			
	});
}

function creat_block_schedule(inf) {
    var result = "";
    var time = inf.time.split(" ")[1].split(":");
    result += "<div class='block_schedule'> <div class='content_schedule'> <b> ";
    result += time[0] + " : " + time[1] + " — </b> " + inf.name + " </div> ";
    result += " <div class='im_going'> </div> <div class='more_info_schedule'> ";
    for(var i = 0; inf.additional_fields[i]; i++) {
         result += "<p><b> " + inf.additional_fields[i].name + " :</b> " + 
             inf.additional_fields[i].value + 
             " </p>";
    }
    result += "<p><b>На лекцию идёт:</b>" + inf.who_is_coming.split(",").length + 
        " человек</p></div><div class='show_hide_schedule'>";
    result += "<img src='img/arrow_to_down_schedule.png' class='arrow_to_down_up_schedule'/></div>" +
	"</div>";
    console.log(result);
    return result;
}