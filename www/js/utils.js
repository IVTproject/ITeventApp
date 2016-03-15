function date_format(date) {
    var date_form = date.split("-");
	return date_form[2].split(" ")[0] + " " + get_month(date_form[1]) + " " + date_form[0];
}
function date_deg_format(date) {
	var date_form = date.split("-");
	return date_form[2].split(" ")[0] + "." + date_form[1] + "." + date_form[0];
}
function date_time_format(date) {
	var date_form = date.split("-");
	return date_form[2].split(" ")[0] + " " + get_month(date_form[1]) + " " + date_form[0] + " в " + date_form[2].split(" ")[1];
}
function get_month(mm) {
	switch(mm) {
		case "01":
			return "января";
			break;
		case "02":
			return "февраля";
			break;
		case "03":
			return "марта";
			break;
		case "04":
			return "апреля";
			break;
		case "05":
			return "мая";
			break;
		case "06":
			return "июня";
			break;
		case "07":
			return "июля";
			break;
		case "08":
			return "августа";
			break;
		case "09":
			return "сентября";
			break;
		case "10":
			return "октября";
			break;
		case "11":
			return "ноября";
			break;
		case "12":
			return "декабря";
			break;
		default:
			return "никогда";
			break;
	}
}

function show(str){
	$(str).css({
    	display:'block'
	});	
}

function hide(str){
	$(str).css({
    	display:'none'
	})
}