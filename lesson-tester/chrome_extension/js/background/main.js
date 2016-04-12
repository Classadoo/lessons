var showingCurrentId = true;
var idToSave = 0
var testFileDir = "../../test_resources"

while (!chrome.runtime.getPlatformInfo) {
  // just putting this in here to make sure everything is ready before moving on    
}

console.log("adding the listener");
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {   		
		if (request.resolveUrls) {
		   console.log("resolving urls")
		   var resolver = new UrlResolver($.extend(request.resolveUrls, {fileId: idToSave}), sender.tab.id, testFileDir);
		   resolver.resolve();

		   if (!showingCurrentId) {		   		
		   		idToSave = idToSave + 1
		   		updateFileId()
		   }
		}
   }
);

chrome.browserAction.onClicked.addListener(toggleIdDisplay);

function updateFileId() {
	chrome.browserAction.setBadgeText({
		text: String(idToSave)
	})
}

function toggleIdDisplay() {	
	Requests.getNextId(testFileDir).then(function(resp) {
		console.log("ASdfasdfasfd");
		var nextId = resp.id;
		if (showingCurrentId) {
			chrome.browserAction.setIcon({
				path: 'new-id.png'			
			})
			idToSave = nextId;
			showingCurrentId = false;
		} else {
			chrome.browserAction.setIcon({
				path: 'current-id.png'			
			})
			idToSave = nextId - 1;
			showingCurrentId = true;	
		}

		updateFileId()
	})	
}