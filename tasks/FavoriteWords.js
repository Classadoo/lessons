var H = require("../helpers/TaskHelpers.js");
var IframeManager = require("../helpers/IframeManager.js");
var $ = require("jquery")

FavoriteWordDiv = new function() {	
	this.description = 'Make a div with your favorite word in in'
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "FavoriteWordDiv"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));						
		return i.$("div:not(:empty)").length > 0
	}	
}

SecondFavoriteWordDiv = new function() {	
	this.description = 'Now make another div with your second favorite word'
	this.hint = "remember you'll need to start the div with <div> and end it with </div>"
	this.location = "scratchpad.io"
	this.name = "SecondFavoriteWordDiv"
	
	this.check = function() {		
		var i = new IframeManager($("#preview"));				
		return i.$("div:not(:empty)").length > 1
	}	
}

FavoriteImage = new function() {	
	this.description = 'Now add an image of your favorite word. Use google images to get the src for the image.',
	this.hint = "an img tag looks like img src='your/image/address/here.png"
	this.location = "scratchpad.io"
	this.name = "FavoriteImage"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]");			
		return imgWithSrc.length > 0
	}	
}

SecondFavoriteImage = new function() {	
	this.description = 'Now add an image for your favorite word in the same way',
	this.hint = "an img tag looks like img src='your/image/address/here.png"
	this.location = "scratchpad.io"
	this.name = "SecondFavoriteImage"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]");			
		return imgWithSrc.length > 1
	}	
}

ChangeFavoriteImageHeight = new function() {	
	this.description = 'Now change the height of the one of the images. You can do this by adding style="height: 100px"',
	this.hint = "an img tag looks like src='your/image/address/here.png'"
	this.location = "scratchpad.io"
	this.name = "ChangeFavoriteImageHeight"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]")		

		var results = imgWithSrc.filter(function(i, img) {			
			return img.style.height
		})

		return results.length > 0
	}	
}

ChangeFavoriteImageWidth = new function() {	
	this.description = 'Now change the width of one of the images. You can do this by adding style="width: 100px"',
	this.hint = "an img tag looks like <img src='your/image/address/here.png'></img>"
	this.location = "scratchpad.io"
	this.name = "ChangeFavoriteImageWidth"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithSrc = i.$("img[src]")		

		var results = imgWithSrc.filter(function(i, img) {			
			return img.style.width
		})

		return results.length > 0
	}	
}