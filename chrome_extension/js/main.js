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
		console.log("loading teacher toolbar");
		syncedState = new SyncedState();		

		new SyncManager(syncedState);
		new ScratchpadSyncManager(syncedState);		
		new Toolbar($(document.body), resp.html, resp.open, resp.startingTask, syncedState, function() {
			syncedState.initialize(resp.startingStudents || {}, resp.startingClass || {});
		});		
		

		chrome.runtime.sendMessage({getTaskNames: true});	
	});		
})