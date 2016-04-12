var H = require("../helpers/TaskHelpers.js");
var IframeManager = require("../helpers/IframeManager.js");
var $ = require("jquery")

CreateHouse = new function() {	
	this.description = 'Starting by creating an empty house using HTML',
	this.hint = "remember you'll need to start the house with <house> and end it with </house>"
	this.location = "scratchpad\.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));
		console.log(i.getIDoc());
		return i.$("house").length > 0
	}	
}

AddRoom = new function() {	
	this.description = 'Great, now put a room in that house.',
	this.hint = "You can make the room in the same way you made the house. Just make sure to put the room betwee <house> and </house>"
	this.location = "scratchpad\.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$("house > room").length > 0
	}	
}

AddTwoMoreRooms = new function() {	
	this.description = 'Great, now put two more rooms in.',
	this.hint = "Make the rooms in the same way you made the last room, and add them underneath that one."
	this.location = "scratchpad\.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$("house > room").length > 2
	}	
}

AddFurniture = new function() {	
	this.description = 'Great, now add furniture to each room. You can make a couch, chair, or anything else that comes to mind!',
	this.hint = "You can make furniture the same way you make rooms."
	this.location = "scratchpad\.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		var roomsWithChildren = i.$("room").filter(function(i, el) {
			return$(el).children().length > 0
		})

		return roomsWithChildren.length > 2
	}	
}