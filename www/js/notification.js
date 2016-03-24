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
		//icon: "res://icon36",
		//smallIcon: "http://it-event.tk/img/icon.png"
		//data: { meetingId:"123#fg8" }
	}, callback);
	click_notif();
	trigger_notif();
	//schedule_notif();
}

function cancel_notification(id, callback) {
	cordova.plugins.notification.local.clear(id, function() {
		cordova.plugins.notification.local.cancel(id, callback)
	});
}
function trigger_notif() {
	cordova.plugins.notification.local.on("trigger", function(notification) {
		navigator.vibrate([500, 500, 500, 500, 500]);
	});
}

function schedule_notif() {
	cordova.plugins.notification.local.on("schedule", function(notification) {
		//alert("scheduled: " + notification.id);
	});
}

function click_notif() {
	cordova.plugins.notification.local.on("click", function (notification) {
		cancel_notification(notification.id);
		$('#1').click();
	});
}




