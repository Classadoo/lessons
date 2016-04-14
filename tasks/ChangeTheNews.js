var H = require("../helpers/TaskHelpers.js");
var $ = require("jquery")

ChangePageText = new function() {	
	this.description = 'First try to change the text anywhere on the page'
	this.hint = "right-click, inspect or inspect element",
	this.location = "htekidsnews.com"
	this.name = "ChangePageText"
	
	var startingText;
	this.start = function() {		
		startingText = $('body').text();
	}

	this.check = function() {			
		if (startingText) {
			return startingText !== $('body').text();
		}
	}	
}

ChangeImgSrc = new function() {
	this.description = 'Now change the src for an image on the page'
	this.hint = "right-click, inspect or inspect element",
	this.location = "htekidsnews.com"
	this.name = "ChangeImgSrc"
	
	var startingImgSrcs;
	this.start = function() {		
		startingImgSrcs = getImgSrcs()		
	}

	function getImgSrcs() {
		return $("img[src]").map(function(i, el) {
			return el.src
		}).toArray()
	}

	this.check = function() {		
		if (startingImgSrcs) {			
			return startingImgSrcs.toString() !== getImgSrcs().toString()
		}
	}		
}