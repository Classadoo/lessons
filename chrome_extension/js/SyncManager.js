SyncManager = function(syncedState) {	
	document.addEventListener("click", sync, true);

	var overlays = {};	

	function sync(e) {		
		if (state.syncing) {
			var index = Array.prototype.indexOf.call(document.getElementsByTagName("*"), e.target);
			chrome.runtime.sendMessage({updateClass: {syncHighlight: index}})

			overlays[index] = new TargetOverlay($(e.target));
		}		
	}

	function trackClickCount() {				
		Object.keys(syncedState.state).forEach(function(id) {			
			var click = syncedState.state[id].state.global.backSyncClick			
			if (click) {				
				var overlay = overlays[click.index]
				overlay && overlay.addClick(id);
			}
		})
	}

	respond("stateSync", trackClickCount)
}

TargetOverlay = function($el) {
	var clicks = {}

	var width = $el.width();
	var height = $el.height();
	var top = $el.offset().top
	var left = $el.offset().left

	var overlay = $("<div>")
	overlay.css({
		background: "rgba(40, 80, 19, .8)",
		"z-index": "10000",
		position: "absolute",
		height: height + "px",
		width: width + "px",
		top: top + "px",
		left: left + "px",
		color: "white",
		"font-weight": "bold"
	})

	$("body").append(overlay);

	this.addClick = function(studentId) {		
		if (!clicks[studentId]) {
			clicks[studentId] = true
			overlay.html(Object.keys(clicks).length);
		}
	}	
}