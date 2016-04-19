var H = require("../helpers/TaskHelpers.js");
var IframeManager = require("../helpers/IframeManager.js");
var $ = require("jquery")

GoogleDiv = new function() {	
	this.description = 'Make a div with the word "Google" in it'
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "GoogleDiv"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(Google)").length > 0
	}	
}

GoogleDivWithinDiv = new function() {	
	this.description = 'Now put that div container inside another div container',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "GoogleDivWithinDiv"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$("div > :contains(Google)").length > 0
	}	
}

SearchDiv = new function() {	
	this.description = 'Now make a div containing the word "Search". This will later become our search button',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "SearchDiv"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(Search)").length > 0
	}	
}

FeelingLuckyDiv = new function() {	
	this.description = 'Now make a div containing the words "I\'m Feeling Lucky". This will later become the "I\'m Feeling Lucky" button',
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "FeelingLuckyDiv"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		return i.$(":contains(I\'m Feeling Lucky)").length > 0
	}	
}

StyleGoogleHor = new function() {	
	this.description = 'Now move the div containing "Google" horizontally until it\'s near the center of the page. Do this by adding a "style" property.'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "StyleGoogleHor"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				

		var match = i.$(":contains(Google)").filter(function(i, el){															
			var prop = $(el).css("left");

			if (prop) {
				return Number(prop.slice(0,3)) > 200
			} else {
				return false
			}
		})
		
		return match.length > 0
	}	
}

StyleGoogleVert = new function() {	
	this.description = 'Now move the div containing "Google" vertically until it\'s near the center of the page'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "StyleGoogleVert"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		
		var match = i.$(":contains(Google)").filter(function(i, el){												
			var prop = $(el).css("top");

			if (prop) {
				return Number(prop.slice(0,3)) > 200
			} else {
				return false
			}			
		})
		
		return match.length > 0
	}	
}

StyleGoogleFont = new function() {	
	this.description = 'Now make "Google" have a font-size larger than 20'
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "StyleGoogleFont"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		var match = i.$(":contains(Google)").filter(function(i, el){															
			var prop = $(el).css("font-size");			

			if (prop) {
				return Number(prop.slice(0,2)) > 20
			} else {
				return false
			}			
		})
		
		return match.length > 0
	}	
}

MoveSearch = new function() {	
	this.description = 'Cool, now let\'s put the Search button in the right place. Move it to the center, and below "Google"',
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "MoveSearch"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		var googleTop = elThatContains(i, "Google").position().top			
		var match = i.$(":contains(Search)").filter(function(i, el){																		
			var top = $(el).position().top;
			var left = $(el).position().left;			

			return left > 200 && top > googleTop 			
		})
		
		return match.length > 0
	}	
}

MoveLucky = new function() {	
	this.description = 'Finally, let\'s put the "I\'m feeling lucky" in the right place. Move it below "Google" and to the right of the search button.',
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "MoveLucky"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));				
		var googleTop =  elThatContains(i, "Google").position().top
		var searchLeft =  elThatContains(i, "Search").position().left

		var match = i.$(":contains(I\'m Feeling Lucky)").filter(function(i, el){																		
			var top = $(el).position().top;
			var left = $(el).position().left;			

			return left > searchLeft && top > googleTop 			
		})
		
		return match.length > 0
	}	
}

AddImage = new function() {	
	this.description = 'Try adding an image to your site. You can do this with a tag that looks like <img src="some/url.png"></img>',
	this.hint = "an img tag looks like <img src='your/image/address/here.png'></img>"
	this.location = "scratchpad.io"
	this.name = "AddImage"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]");			
		return imgWithSrc.length > 0
	}	
}

ChangeImageHeight = new function() {	
	this.description = 'Now change the image\'s height. You can do this by adding style="height: 100px"',
	this.hint = "an img tag looks like <img src='your/image/address/here.png'></img>"
	this.location = "scratchpad.io"
	this.name = "ChangeImageHeight"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]")		

		var results = imgWithSrc.filter(function(i, img) {			
			return img.style.height
		})

		return results.length > 0
	}	
}

ChangeImageWidth = new function() {	
	this.description = 'Now change the image\'s width. You can do this by adding style="width: 100px"',
	this.hint = "an img tag looks like <img src='your/image/address/here.png'></img>"
	this.location = "scratchpad.io"
	this.name = "ChangeImageWidth"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]")		

		var results = imgWithSrc.filter(function(i, img) {			
			return img.style.width
		})

		return results.length > 0
	}	
}

ButtonBorders = new function() {	
	this.description = 'Bonus Challenge: let\'s try draw a box around our "Search" and "I\'m feeling lucky" buttons. To learn what property to use try googling "html border property"',
	this.hint = "use 'style'"
	this.location = "scratchpad.io"
	this.name = "ButtonBorders"
	
	this.check = function() {			
		var i = new IframeManager($("#preview"));						
		var searchBorder = elThatContains(i, "Search").css("border-style")
		var luckyBorder = elThatContains(i, "I\'m Feeling Lucky").css("border-style");		

		return !!(searchBorder && searchBorder !== "none" && luckyBorder && luckyBorder !== "none")
	}	
}

function elThatContains(i, contains) {
	return i.$(":contains(" + contains + "):not(:has(*))")
}