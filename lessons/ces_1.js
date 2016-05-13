require("../tasks/FavoriteWords.js");
require("../tasks/ChangeTheNews.js");
require("../tasks/MakeTheNews.js");
require("../tasks/CssPractice.js");

PlacerHolder = function() {
	this.description = 'No tasks right now'
	this.location = ".*"
	this.name = "NoTasks"

	this.check = function() {			
		return true;
	}	
}

__importedLesson = [

	// mess up a page	
	ChangePageText,
	ChangeImgSrc,
	ChangeElementStyle,
	FreeChangeAPage
]