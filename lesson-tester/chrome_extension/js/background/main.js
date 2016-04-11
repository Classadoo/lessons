var showingCurrentId = true;
var idToSave = 0
var testFileDir = "/Users/dgaynor/classadoo-lessons/lesson-tester/public/test_files/"

while (!chrome.runtime.getPlatformInfo) {
  // just putting this in here to make sure everything is ready before moving on    
}

console.log("adding the listener");
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
   		console.log("got reequsetssts");
		if (request.resolveUrls) {
		   console.log("resolving urls")
		   var resolver = new UrlResolver(request.resolveUrls, sender.tab.id, testFileDir + idToSave);
		   resolver.resolve();

		   if (!request.resolveUrls.iframe){
		       console.log("sending message to iframes")
		       chrome.tabs.sendRequest(sender.tab.id, { resolveIframeUrls: request.resolveUrls});
		   } else {
		       console.log("message sent to iframes, now getting parse requests from all iframes");
		   }
		}
   }
);

chrome.browserAction.onClicked.addListener(toggleIdDisplay);

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

		chrome.browserAction.setBadgeText({
			text: String(idToSave)
		})
	})	
}