ClassManager = function() {
	var self = this
	var ref = new Firebase("vivid-inferno-6534.firebaseIO.com/users");
	var students = {}
	
	ref.on("value", function(snap) {		
		var newStudents = {}
		Object.keys(snap.val()).forEach(function(id) {
			var student = snap.val()[id];
			if (student.state && student.state.global) {
				newStudents[id] = student
			} 
		})

		students = newStudents			
		sendToCurrentTab({stateUpdate: newStudents});
	})	

	function update(props) {	  
		console.log("updating")	  	
		Object.keys(students).forEach(function(id) {
			console.log("updating student", id);
			var state = ref.child("" + id + "/state/global");      
			state.update(props)
		})
	}  

	function updateBasedOnStudent(fieldName, callback) {		
		var userIds = Object.keys(students);		

		userIds.forEach(function(id) {
			var value = callback(students[id]);			
			var stateRef = ref.child("" + id + "/state/global");      

			obj = {}
			obj[fieldName] = value;
			stateRef.update(obj);
		})
	}

	function remove(field) {	  
	  Object.keys(students).forEach(function(id) {
	    var state = ref.child("" + id + "/state/global/" + field);      
	    state.remove();
	  })
	}

	this.getState = function() {
		return students
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {   		
			if (request.updateClass) {
				update(request.updateClass);
			}
	})
}