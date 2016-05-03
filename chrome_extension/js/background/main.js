var showingCurrentId = true;
var idToSave = 0
var testFileDir = "../tests/test_resources"
var toolbarOpen = false;
var currentTask = false;

while (!chrome.runtime.getPlatformInfo) {
  // just putting this in here to make sure everything is ready before moving on    
}

var m = new ClassManager()

console.log("adding the listener");
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {   		
		if (request.resolveUrls) {
		   console.log("resolving urls")
		   var resolver = new UrlResolver($.extend(request.resolveUrls, {fileId: currentTask}), sender.tab.id, testFileDir);
		   resolver.resolve();
		}

		if (request.getTaskNames) {
			console.log('getting names');
			Requests.getTaskNames().then(function(resp) {		
				console.log('got the names', resp);
				sendToCurrentTab({taskNames: resp.names});
			})	
		}

		if (request.getToolbar) {
			var deferredToolbarHtml = $.ajax({
			    url: "/html/toolbar.html",
			    type: "get",
			    success: function(html) {
			    	var toolbarDoc = document.implementation.createHTMLDocument().documentElement;
			    	var bootstrapCss = $("<link rel='stylesheet'></link>");
			    	var toolbarCss = $("<link rel='stylesheet'></link>");
			    	bootstrapCss.attr("href", chrome.extension.getURL("css/bootstrap.min.css"));
			    	toolbarCss.attr("href", chrome.extension.getURL("css/toolbar.css"));

			    	toolbarDoc.innerHTML = html;
            		var $html = $(toolbarDoc);

			    	addTagsToHead($html, [bootstrapCss, toolbarCss])
			        sendResponse({html: toolbarDoc.outerHTML, open: toolbarOpen, startingTask: currentTask, startingStudents: m.getStudents(), startingClass: m.getClass()});
			    }
			});

			return true
		}

		if (request.taskName) {
			currentTask = request.taskName;
		}
		
		if (request.changeToLatest) {
			Requests.getTaskNames().then(function(resp) {										
				sendToCurrentTab({taskNames: resp.names});
				currentTask = resp.names[resp.names.length - 1];
				sendResponse({latest: currentTask});
			})	

			return true
		}
   }
);

// chrome.browserAction.onClicked.addListener(toggleIdDisplay);
chrome.browserAction.onClicked.addListener(function() {					
	sendToCurrentTab({toolbarOpen: !toolbarOpen});				
	toolbarOpen = !toolbarOpen;		
});

function sendToCurrentTab(message) {
	chrome.tabs.query({active: true}, function(tabs) {		
		tabs.forEach(function(tab) {
			chrome.tabs.sendMessage(tab.id, message);	
		})		
	})
}

function addTagsToHead($html, tags) {
    var tagString = "";
    $.each(tags, function(i, tag) {
        tagString += tag[0].outerHTML
    });
    var head = $html.find('head');
    head[0].innerHTML = tagString;
}