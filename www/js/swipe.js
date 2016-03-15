var menu_swipe = ['#content', '#ads', '#inform'];
var content_swipe = ['#1', '#2', '#3'];
var swipe_menu_count = 0;
$(function() {
	$('#event_schedule').bind('swipeleft', function(event) {
		if (swipe_menu_count < 2) {
			$(menu_swipe[swipe_menu_count]).hide(500);
			$("#scroll_menu li").removeClass("active1");
			swipe_menu_count++;
			$(content_swipe[swipe_menu_count]).addClass("active1");
			$(menu_swipe[swipe_menu_count]).show(500)
		}					
	});

	$('#event_schedule').bind('swiperight', function(event) {
		if (swipe_menu_count > 0) {
			$(menu_swipe[swipe_menu_count]).hide(500);
			$("#scroll_menu li").removeClass("active1");
			swipe_menu_count--;
			$(content_swipe[swipe_menu_count]).addClass("active1");
			$(menu_swipe[swipe_menu_count]).show(500)
		}					
	});
});			

function textAreaAdjust(o) {
	o.style.height = "1px";
	o.style.height = (25+o.scrollHeight)+"px";
}
