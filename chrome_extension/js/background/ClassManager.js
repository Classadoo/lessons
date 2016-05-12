ClassManager = function() {
	var self = this
	// var studentsRef = new Firebase("classadoo-dev.firebaseIO.com/users");
	// var classRef = new Firebase("classadoo-dev.firebaseIO.com/class");

	var studentsRef = new Firebase("classadoo-prod.firebaseIO.com/users");
	var classRef = new Firebase("classadoo-prod.firebaseIO.com/class");

	var studentStates = {}
	var classState = {};
	
	// studentsRef.on("value", function(snap) {		
	// 	var newStudentStates = {}
	// 	Object.keys(snap.val() || {}).forEach(function(id) {
	// 		var student = snap.val()[id];
	// 		if (student.state && student.state.global) {
	// 			newStudentStates[id] = student
	// 		} 
	// 	})

	// 	studentStates = newStudentStates			
	// 	sendToCurrentTab({studentStatesUpdate: newStudentStates});
	// })		

	classRef.on("value", function(snap) {		
		classState = snap.val();
		sendToCurrentTab({classStateUpdate: classState});
	})		

	function classUpdate(props) {	  				
		classRef.update(props);		
	}  

	function studentUpdate(props) {	  	
		Object.keys(studentStates).forEach(function(id) {			
			var state = studentsRef.child("" + id + "/state/global");      
			state.update(props)
		})
	}  	

	this.getStudents = function() {
		return studentStates
	}

	this.getClass = function() {
		return classState
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {   		
			if (request.updateClass) {
				classUpdate(request.updateClass);
			}

			if (request.updateStudents) {
				studentUpdate(request.updateStudents);
			}
	})
}