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

ChangeElementStyle = new function() {
	this.description = 'Now change the style of an element on the page'
	this.hint = "right-click, inspect or inspect element",
	this.location = "htekidsnews.com"
	this.name = "ChangeElementStyle"
	
	var starting;
	this.start = function() {		
		starting = getStyles()		
	}

	function getStyles() {
		return $("[style]").map(function(i, el) {
			return el.getAttribute("style")
		}).toArray()
	}

	this.check = function() {			
		if (starting) {			
			console.log("asd", starting.toString() !== getStyles.toString())
			return starting.toString() !== getStyles().toString()
		}
	}		
}

GoToAnotherPage = new function() {
	this.description = 'Now go to another website, any website you want.'
	this.location = "^((?!htekidsnews).)*$"
	this.name = "GoToAnotherPage"
	
	var starting;
	
	function getStyles() {
		return $("[style]").map(function(i, el) {
			return el.getAttribute("style")
		}).toArray()
	}

	this.check = function() {	
		return true
	}		
}

AddTextToThePage = new function() {
	this.description = 'Now add this text anywhere on the page: "I am a leet hackzor"'
	this.location = ".*"
	this.name = "AddTextToThePage"
	
	var starting;
	
	function getStyles() {
		return $("[style]").map(function(i, el) {
			return el.getAttribute("style")
		}).toArray()
	}

	this.check = function() {	
		return $('body').text().indexOf("I am a leet hackzor") > -1;
	}		
}

FreeChangeAPage = new function() {
	this.description = 'Great, now mess around some more on this page. In a few minutes we\'ll have everyone present the "new" version of their chosen site'
	this.location = ".*"
	this.name = "FreeChangeAPage"

	var start = Date.now();

	this.check = function() {	
		return (Date.now() - start) > 30000;
	}		
}