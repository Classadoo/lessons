var H = require("../helpers/TaskHelpers.js");

ScratchpadWriteGoogle = new function() {	
	this.description = 'Make a div with the word "Google" in it'
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scractchpad.io"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));		
		return H.hasChildWithText(i.$("body"), "Google")
	}	
}