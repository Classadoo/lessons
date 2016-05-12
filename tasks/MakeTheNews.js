var H = require("../helpers/TaskHelpers.js");
var $ = require("jquery")
var IframeManager = require("../helpers/IframeManager.js");

AddNewsTitle = new function() {
	this.description = "Let's start by making a div with the title of your news site. You can name it anything you want, maybe 'News according to Dogs'?"
	this.location = "scratchpad"
	this.name = "AddNewsTitle"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));						
		var div = i.$("div:not(:empty)");			
		return div.length > 0
	}	
}

AddNewsTitleId = new function() {
	this.description = "Great, now let's add an id to the title, so we can style it with CSS. e.g id='title'"
	this.location = "scratchpad"
	this.name = "AddNewsTitleId"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));						
		var div = i.$("div:not(:empty)[id]");			
		return div.length > 0
	}	
}

AddNewsStyleTag = new function() {
	this.description = "OK, now let's create a style tag, e.g. 	<style></style>"
	this.location = "scratchpad"
	this.name = "AddNewsStyleTag"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var styleTag = i.$("style");			
		return styleTag.length > 0
	}	
}

CenterNewsTitle = new function() {
	this.description = "Now let's style the title so it's centered on the page. Create a CSS rule-set like #title { text-align: center }."
	this.location = "scratchpad"
	this.name = "CenterNewsTitle"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var title = i.$("div:not(:empty)[id]");								
		return title.css("text-align") == "center"
	}	
}

MakeTitleBold = new function() {
	this.description = "Now our news will be BOLD, so let's make our title bold. Add the following rule to #title, font-weight: bold;"
	this.location = "scratchpad"
	this.name = "MakeTitleBold"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var title = i.$("div:not(:empty)[id]");										
		return title.css("font-weight") == "bold"
	}	
}

BigNewsTitle = new function() {
	this.description = "Let's also increase the size of the title. Try adding the rule font-size: 30px;"
	this.location = "scratchpad"
	this.name = "BigNewsTitle"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var title = i.$("div:not(:empty)[id]");										
		return Number(title.css("font-size")[0]) > 2
	}	
}

CreateNewsImage = new function() {
	this.description = "Awesome, now let's add an eye-catching image. Create an <img src='some/cool/img'>, underneath your title"
	this.location = "scratchpad"
	this.name = "CreateNewsImage"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var img = i.$("img[src]");										
		return img.length > 0
	}	
}

CenterNewsImage = new function() {
	this.description = "Ok, now we want the img to be centered as well. So let's put this image inside the same div as our title."
	this.location = "scratchpad"
	this.name = "CenterNewsImage"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));	
		var titleWithChild = i.$("div[id] > img[src]")			
		return titleWithChild.length > 0
	}	
}

InvestigateInlineNewsImage = new function() {
	this.description = "Huh, why is the image next to the title, not underneath? Google search: 'display inline vs. block', and you might find some answers. We'll investigate as a class shortly."
	this.location = "scratchpad"
	this.name = "InvestigateInlineNewsImage"
	
	this.check = function() {					
		return false
	}	
}

PutNewsImageInsideDiv = new function() {
	this.description = "Let's put the image underneath the title by putting it inside a <div>"
	this.location = "scratchpad.io"
	this.name = "PutNewsImageInsideDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var img = i.$("div > div > img[src]");										
		return img.length > 0
	}	
}

ChangeImageWidth = new function() {
	this.description = "Let's tweak the image width a bit. Give the img an id, like 'title-img', and then create a new css rule-set like #title-img { width: 400px }"
	this.location = "scratchpad"
	this.name = "ChangeImageWidth"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var img = i.$("img[id]");												
		return img.width() > 200 && img.width() < 500
	}	
}

ChangeNewsImageMarginTop = new function() {
	this.description = "Let's put some space between the image and the title above it. For this add a new css rule to the #title-img rule-set: margin-top: 40px;"
	this.location = "scratchpad"
	this.name = "ChangeNewsImageMarginTop"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var img = i.$("img[id]");												
		var margin = img.css("margin-top")		
		return margin && Number(img.css("margin-top")[0]) > 0
	}	
}

AddArticleDiv = new function() {
	this.description = "Great! Now let's add some news. Add a new div underneath the 'title' div, and give it the id 'articles'."
	this.location = "scratchpad"
	this.name = "AddArticleDiv"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divsWithIds = i.$("#articles");														
		return divsWithIds.length > 0
	}	
}

AddArticles = new function() {
	this.description = "We want TWO articles in this div, and we want them to display next to eachother. Start by adding two divs to the 'articles' div, containing text of your choosing."
	this.location = "scratchpad"
	this.name = "AddArticles"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div > div");																
		return divs.length > 2
	}	
}

GiveArticlesIds = new function() { 
	this.description = "Now let's add an id to each article."
	this.location = "scratchpad"
	this.name = "GiveArticlesIds"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div > div[id]");														
		return divs.length > 1
	}	
}

MarkArticlesInline = new function() {
	this.description = "Now to put the articles next to eachother, let's give them the css property display: inline."
	this.location = "scratchpad"
	this.name = "MarkArticlesInline"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div").filter(function(i, div){
			return $(div).css("display") == "inline"
		})		
		return divs.length > 1
	}	
}

AddArticleText = new function() {
	this.description = "Ok, now let's add a big block of text to each article div, and see what happens. Find a large block of text online, may I suggest something from en.wikipedia.org/wiki/Underdog_(TV_series)?"
	this.location = "scratchpad"
	this.name = "AddArticleText"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div > div[id]").filter(function(i, div){
			return $(div).html().length > 100
		})		
		return divs.length > 1
	}	
}

MakeArticlesInlineBlock = new function() {
	this.description = "To get our articles so they are next to eachother AND have a fixed width, we need to use the display: inline-block"
	this.location = "scratchpad"
	this.name = "MakeArticlesInlineBlock"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div").filter(function(i, div){
			return $(div).css("display") == "inline-block"
		})		
		return divs.length > 1
	}	
}

GiveArticlesFixedWidth = new function() {
	this.description = "Now we just need to give our articles a width. Add a css rule for each article, width: 300px."
	this.location = "scratchpad"
	this.name = "GiveArticlesFixedWidth"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div").filter(function(i, div){
			return $(div).width() < 400 && $(div).width() > 200
		})		
		return divs.length > 1
	}	
}

CenterArticles = new function() {
	this.description = "And now finally let's center our articles."
	this.location = "scratchpad"
	this.name = "CenterArticles"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div").filter(function(i, div) {			
			return ($(div).children().length >= 2) && ($(div).css("text-align") == "center")
		})

		return divs.length > 0
	}	
}

AdjustArticlesMarginTop = new function() {
	this.description = "Finish off by adjusting the margin-top for the 'articles' div."
	this.location = "scratchpad"
	this.name = "AdjustArticlesMarginTop"
	
	this.check = function() {					
		var i = new IframeManager($("#preview"));				
		var divs = i.$("div").filter(function(i, div) {
			var margin = $(div).css("margin-top")			
			return ($(div).children().length >= 2) && (margin && Number(margin[0]) > 0)
		})

		return divs.length > 0
	}	
}