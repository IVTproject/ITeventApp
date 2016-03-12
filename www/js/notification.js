function send_notification(notif_item) {
	
	var time = new Date(notif_item.time);
	
    cordova.plugins.notification.local.schedule({
		id: notif_item.id,
		title: notif_item.title,
		text: notif_item.text,
		at: time,
		icon: "http://it-event.tk/img/icon.png"
		//data: { meetingId:"123#fg8" }
	});
	
}

function cancel_notification(id) {
	cordova.plugins.notification.local.clear(id);
	cordova.plugins.notification.local.cancel(id);
}

cordova.plugins.notification.local.on("click", function (notification) {
	alert("dsfgb");
});

function ok() {
	notif_item = ' { "id" : "1", "title" : "Hello", "text" : "Hello world", "time" : "2016-03-11 15:35:00" } ';
	notif_item = JSON.parse(notif_item);
	send_notification(notif_item);
}

