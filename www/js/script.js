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

function example_not() {
	/*cordova.plugins.notification.local.schedule({
		id: 1,
		title: "Production Jour fixe",
		text: "Duration 1h"
		
		firstAt: monday_9_am,
		every: "week",
		sound: "file://sounds/reminder.mp3",
		icon: "http://icons.com/?cal_id=1",
		data: { meetingId:"123#fg8" }
		
	});*/
	
	/*
	cordova.plugins.notification.local.on("click", function (notification) {
		joinMeeting(notification.data.meetingId);
	});
	*/
}