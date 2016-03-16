SampleTask1 = new function() {
	this.url = "file:///Users/dgaynor/classadoo.github.io/index.html",
	this.description = "Move the banner from lego starting location",
	this.hint = 'The banner is the big, black bar in the center of the page. Move it by right clicking, then using "inspect element" to change it\'s style'
	this.hintAction = function() {
		Helpers.flash($(".intro-container"));
	}

	this.initialize = function() {

	} 

	this.check = function() {
		return Helpers.hasStyle($(".intro-container"), "right")
	}		
}