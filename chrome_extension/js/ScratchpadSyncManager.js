ScratchpadSyncManager = function(syncedState) {
	var bindingString = "keyup.scratch-sync";
	var i;	

	function toggleSync() {		
		if (syncedState.classState.syncingScratch) {				
			i = new IframeManager($("#preview"));
			$(".ace_text-input").on(bindingString, syncDisplay);
		} else {
			$(".ace_text-input").off(bindingString);
		}		
	}

	function syncDisplay() {		
		var toSync = i.$("body").html();		
		syncedState.updateClass({syncedScratchInput: toSync})	
	}


	respond("classSync", toggleSync)
}