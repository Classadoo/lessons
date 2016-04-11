$(function() {	
	$(document.body).keydown(function (e) {		
		if (e.keyCode == 27 && e.shiftKey) {
			console.log("SAINVIG");
			(new HtmlProcessor({})).processAndSubmitCurrentPage();
		}
	})
})