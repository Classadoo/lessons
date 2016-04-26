Toolbar = function(parent, html, startsOpen, startingTask) {
	console.log('start', startingTask);

	var tasks = false;
	var taskInput;
	var latestTaskButton;
	var syncButton;

	var CSS = {
		frame: {
			width: "100%",
			height: "38px",
			position: "fixed",
			top: "0px",
			"z-index": "10000",
			display: "none",
			"border-bottom": "2px solid black",
			"border-top": "1px solid black",
			"left": "0px"			
		}	
	}

	var iframe = $("<iframe id='classadoo-test-frame' src='about:blank'></iframe>")
	applyDefaultCSS(iframe).css(CSS.frame);
	parent.prepend(iframe)
	var i = new IframeManager(iframe);	

	i.setIframeContent(html)

	var typeahead;

	i.runWhenLoaded(function() {
		taskInput = i.$(".task-typeahead .typeahead")
		latestTaskButton = i.$(".latest-task-button")
		syncButton = i.$(".sync-button")

		latestTaskButton.click(changeToLatestTask);
		syncButton.click(function() {
			if (state.syncing) {
				state.setSyncing(false);
			} else {
				state.setSyncing(true);
			}			
		})

		startingTask && taskInput.val(startingTask);		

		typeahead = new Typeahead(taskInput)
		tasks && typeahead.setTasks(tasks);
	})	
	

	chrome.runtime.onMessage.addListener(
	   	function(request, sender, sendResponse) {              
	   		if((typeof request.toolbarOpen) === "boolean") {	   			
	   			openOrClose(request.toolbarOpen)
	   		}

	   		if (request.taskNames) {
	   			tasks = request.taskNames
	   			typeahead && typeahead.setTasks(tasks);
	   		}
	   	}
   	)

	function openOrClose(open) {
		if (open) {			
			iframe.show()
			ModifyPageForToolbar(true)
		} else {			
			iframe.hide()
			ModifyPageForToolbar(false)			
		}
	} 	

	function changeToLatestTask() {
		console.log('changiging');				
		chrome.runtime.sendMessage({changeToLatest: true}, function(resp) {
			taskInput.val(resp.latest)	
		});			
	}

	function updateSyncButton() {
		console.log("asdfa", state.syncing)
		if (state.syncing) {
			syncButton.addClass("btn-danger");
		} else {
			syncButton.removeClass("btn-danger");
		}		
	}


   	openOrClose(startsOpen)
   	respond("syncing", updateSyncButton);
}

Typeahead = function($el) {	

	$el.keydown(function(e) {
		var enterKeyCode = 13;	

  		if (e.keyCode === enterKeyCode) {  			
			persistTaskName($el.val());
			$el.blur();
			e.preventDefault()
  		}  		
	})

	function persistTaskName(name) {		
		chrome.runtime.sendMessage({taskName: name});	
	}

	function bh(tasks) {
		return (new Bloodhound({
		  datumTokenizer: Bloodhound.tokenizers.whitespace,
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  // `states` is an array of state names defined in "The Basics"
		  local: tasks
		}));
	}		

	this.setTasks = function(newList) {		
		var source = bh(newList)		

		$el.typeahead({
		  hint: true,
		  highlight: true,
		  minLength: 1
		},
		{
		  name: 'tasks',
		  source: source
		})
	}		
}

function ModifyPageForToolbar(openToolbar, $parent) {
	var $parent = $parent || $(document)

	var host = location.host;
	if (openToolbar) 
		open();
	else
		close();
	

	function close() {
		if (host == "scratchpad.io") {
			$parent.find("#preview").css("top", "0px");
			$parent.find("#commandbar").css("top", "0px");
			$parent.find("#editor").css("top", "32px");
		} else {
			$parent.find("body").css({position: "relative", top: "0px"});
		}
	}

	function open() {
		if (host == "scratchpad.io") {
			$parent.find("#preview").css("top", "38px");
			$parent.find("#commandbar").css("top", "38px");
			$parent.find("#editor").css("top", "70px");
		} else {
			$parent.find("body").css({position: "relative", top: "38px"});
		}
	}
}
