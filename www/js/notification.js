function send_notification(notif_item, wait_mins, callback) {
	
	//var time = new Date(notif_item.time);
	var time = new Date(notif_item.timeNotification);
	var dif_mins = time.getTime() - (new Date()).getTime();
	var text = "";
	if (dif_mins < 0) {
		text = "Событие уже началось, поторопитесь.";
	} else if (dif_mins > 0 && dif_mins > 60000) {
		text = "Событие начнётся через " + ~~(dif_mins / 60000) + " мин. ";
	} else {
		text = "Событие начнётся через " + ~~(dif_mins / 1000) + " c. ";
	}
	time = new Date(time.getTime() - wait_mins * 60000);
    cordova.plugins.notification.local.schedule({
		id: notif_item.idNotification,
		title: notif_item.textNotification,
		text: text,
		at: time,
		icon: "http://it-event.tk/img/icon.png"
		//data: { meetingId:"123#fg8" }
	}, callback);
	
}

function cancel_notification(id, callback) {
	cordova.plugins.notification.local.clear(id, function() {
		cordova.plugins.notification.local.cancel(id, callback)
	});
}
/*
cordova.plugins.notification.local.on("click", function (notification) {
	alert("dsfgb");
});
*/
notif_item = ' { "id" : "1", "title" : "Hello", "text" : "Hello world", "time" : "2016-03-11 15:35:00" } ';
	notif_item = JSON.parse(notif_item);
function ok() {
	send_notification(notif_item);
}

