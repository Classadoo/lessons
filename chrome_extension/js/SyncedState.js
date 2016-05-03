SyncedState = function() {	
	var self = this;
	var initialized = false;

	self.students = {}
	self.classState = {};	

	function localUpdateStudents(newState) {
		self.students = newState;
		fire("studentsSync")
	}

	function localUpdateClass(newState) {
		self.classState = newState;
		fire("classSync")
	}

	this.initialize = function(startingStudents, startingClass) {
		localUpdateStudents(startingStudents);
		localUpdateClass(startingClass);
	}

	chrome.runtime.onMessage.addListener(function(request) {
		if (request.studentStatesUpdate) {
			localUpdateStudents(request.studentStatesUpdate);
		}		

		if (request.classStateUpdate) {
			localUpdateClass(request.classStateUpdate)
		}		
	})

	self.updateClass = function(props) {
		chrome.runtime.sendMessage({updateClass: props})
	}	

	self.updateStudents = function(props) {
		chrome.runtime.sendMessage({updateStudents: props})
	}	
}