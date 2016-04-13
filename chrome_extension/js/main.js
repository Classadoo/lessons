$(function() {	
	$(document.body).keydown(function (e) {		
		if (e.keyCode == 27 && e.shiftKey) {
			console.log("SAINVIG");
			(new HtmlProcessor({})).processAndSubmitCurrentPage();
		}
	})
	
	chrome.runtime.sendMessage({getToolbar: true}, function(resp) {		
		new Toolbar($(document.body), resp.html, resp.open, resp.startingTask);		
		chrome.runtime.sendMessage({getTaskNames: true});	
	});	
})