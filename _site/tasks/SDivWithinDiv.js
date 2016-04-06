var H = require("../helpers/TaskHelpers.js");

SDivWithinDiv = new function() {	
	this.description = 'Now put that div container inside another div container',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));				
		return i.$("div > :contains(Google)").length > 0
	}	
}