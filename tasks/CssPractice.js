var H = require("../helpers/TaskHelpers.js");
var IframeManager = require("../helpers/IframeManager.js");
var $ = require("jquery")

AddStyleTag = new function() {	
	this.description = 'Now add a style tag to your site. We\'ll put CSS in here next.',	
	this.location = "scratchpad.io"
	this.name = "AddStyleTag"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var styleTag = i.$("style");			
		return styleTag.length > 0
	}	
}

AddCustomDiv =  new function() {	
	this.description = 'Now add a div, and put whatever text you want in it.',	
	this.location = "scratchpad.io"
	this.name = "AddCustomDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));						
		var div = i.$("div:not(:empty)");			
		return div.length > 0
	}	
}

AddIdToDiv = new function() {	
	this.description = 'Now add the id "cool-div" to your div. e.g. id="cool-div"',	
	this.location = "scratchpad.io"
	this.name = "AddIdToDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divWithId = i.$("div:not(:empty)[id]");			
		return divWithId.length > 0
	}	
}

ColorDiv = new function() {	
	this.description = 'Now use that id to make the div\'s text blue, using CSS. e.g. add this to your style tag #cool-div { color: blue }',	
	this.location = "scratchpad.io"
	this.name = "ColorDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var coloredDivs = i.$("div:not(:empty)[id]").filter(function(i, div) {			
			return $(div).css("color") == "rgb(0, 0, 255)"
		});		
		return coloredDivs.length > 0
	}	
}

BackgroundDiv = new function() {	
	this.description = 'Now use CSS to make the div\'s background red. e.g. add this under color:blue : "background: red"',	
	this.location = "scratchpad.io"
	this.name = "BackgroundDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var coloredDivs = i.$("div:not(:empty)[id]").filter(function(i, div) {			
			return $(div).css("background-color") == "rgb(255, 0, 0)"
		});		
		return coloredDivs.length > 0
	}	
}

AddIdToImg = new function() {	
	this.description = 'Now add any ID to the img you added earlier. e.g id="put an id here"',	
	this.location = "scratchpad.io"
	this.name = "AddIdToImg"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var imgWithId = i.$("img[id]")
		return imgWithId.length > 0
	}	
}

MoveImgWithCss = new function() {	
	this.description = 'Now use that id to create a new CSS rule, which moves the img to the left. e.g. #your-id { position:relative; left: 100px }',	
	this.location = "scratchpad.io"
	this.name = "MoveImgWithCss"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var movedImgs = i.$("img[id]").filter(function(i, img) {
			return Number($(img).css("left")[0]) >= 0
		})
		return movedImgs.length > 0
	}	
}

AddBorderToImg = new function() {	
	this.description = 'Bonus: try to add a border to your image using css. To find out how, try googling "css border"',	
	this.location = "scratchpad.io"
	this.name = "AddBorderToImg"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));						
	 	var borderImgs = i.$("img[id]").filter(function(i, img) {
			return $(img).css("border-style") !== "none"
		})

		return borderImgs.length > 0
	}	
}