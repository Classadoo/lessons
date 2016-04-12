var $ = require("jquery")

module.exports = new function() {	
	this.flash = function(elements, numberOfCycles, callback) {
		numberOfCycles = numberOfCycles || 2
		var cycles = 0;	
		function cycle() {
			elements.css({ background: "rgba(256, 256, 256, .9", color: "darkgrey" });		
			setTimeout(function() { 
				elements.css({ background: "rgba(80, 80, 80, .9)", color: "white" })
				cycles += 1
				if (cycles < numberOfCycles) {
					setTimeout(cycle, 300)
				} else {
					callback && callback();
				}
			}, 300)		
		}
		
		cycle()	
	}	

	this.hasStyle = function($el, propName) {
		var matcher = new RegExp(propName, "g");
		var style = $el.attr("style")
		hasStyle = style && !!style.match(matcher);		
		return hasStyle
	}

	this.hasOneOfStyles = function($el, propNames) {
		var regexString= propNames.map(function(name) { "(" + name + ")"}).join("|");
		var matcher = new RegExp(regexString, "g");	
		return !!$el.attr("style").match(matcher) 
	}

	this.hasChildWithText = function($el, text) {
		return $el.find(":contains(" + text + ")").length > 0
	}
} 
