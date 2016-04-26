SyncedState = function(startingState) {	
	var self = this;
	self.state = {}

	function update(newState) {
		self.state = newState;
		fire("stateSync")
	}

	chrome.runtime.onMessage.addListener(function(request) {
		if (request.stateUpdate) {
			update(request.stateUpdate);
		}
	})

	update(startingState);
}