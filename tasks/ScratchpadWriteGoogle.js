var H = require("../helpers/TaskHelpers.js");
var IframeManager = require("../helpers/IframeManager.js");
var $ = require("jquery")

GoogleDiv = new function() {	
	this.description = 'Make a div with the word "Google" in it'
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(Google)").length > 0
	}	
}

GoogleDivWithinDiv = new function() {	
	this.description = 'Now put that div container inside another div container',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$("div > :contains(Google)").length > 0
	}	
}

SearchDiv = new function() {	
	this.description = 'Now make a div containing the word "search". This will later become our search button',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(search)").length > 0
	}	
}

FeelingLuckyDiv = new function() {	
	this.description = 'Now make a div containing the words "I\'m Feeling Lucky". This will later become the "I\'m Feeling Lucky" button',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(I\'m Feeling Lucky)").length > 0
	}	
}

StyleGoogleHor = new function() {	
	this.description = 'Now move the div containing "Google" horizontally until it\'s near the center of the page'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				

		var match = i.$(":contains(Google)").filter(function(i, el){												
			console.log("ekek", $(el).css("left"));
			return Number($(el).css("left").slice(0,3)) > 200
		})
		
		return match.length > 0
	}	
}

StyleGoogleVert = new function() {	
	this.description = 'Now move the div containing "Google" vertically until it\'s near the center of the page'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		
		var match = i.$(":contains(Google)").filter(function(i, el){												
			return Number($(el).css("top").slice(0,3)) > 200
		})
		
		return match.length > 0
	}	
}

StyleGoogleFont = new function() {	
	this.description = 'Now make "Google" have a font-size larger than 20'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		var match = i.$(":contains(Google)").filter(function(i, el){												
			return Number($(el).css("font").slice(0,2)) > 20
		})
		
		return match.length > 0
	}	
}