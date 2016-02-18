SampleTask2 = new function() {
	this.url = "file:///Users/dgaynor/classadoo.github.io/index.html",
	this.description = "Change the banner's background color",
	this.hint = 'The banner is the big, black bar in the center of the page. Change it\'s color by right clicking, then using "inspect element" to change it\'s style.'

	this.hintAction = function() {
		Helpers.flash($(".intro-container"));
	}

	this.check = function() {
		Helpers.hasStyle("background")
	}
}