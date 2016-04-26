var state = new State(["syncing"])
var syncedState;

$(function() {		
	$(document.body).keydown(function (e) {		
		if (e.keyCode == 192 && e.shiftKey) {
			console.log("SAINVIG");
			(new HtmlProcessor({})).processAndSubmitCurrentPage();
		}
	})
	
	chrome.runtime.sendMessage({getToolbar: true}, function(resp) {		
		syncedState = new SyncedState(resp.startingState || {});

		new Toolbar($(document.body), resp.html, resp.open, resp.startingTask);		
		new SyncManager(syncedState);
		chrome.runtime.sendMessage({getTaskNames: true});	
	});		
})