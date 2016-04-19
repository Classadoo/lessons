var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

// only logs if there's a change
var lastLog;
function smartLog(log1, log2) {	
	var aggLog = log1 + log2
	if (lastLog !== aggLog) { 
		console.log(log1, log2 || "")
		lastLog = aggLog
	}	
}

page.onConsoleMessage = function(msg) {	
  smartLog(msg);
}

page.onError = function(msg, trace) {	
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
		  	msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line)
		});
	}
   smartLog(msgStack.join('\n'));
};

function catchE(fun) {
	return function(args1, args2, args3) {
		try {
			fun(args1, args2, args3)
		} catch(e) {			
			smartLog(e)
		    setTimeout(testLoop, 100);
		}
	}
}

var args = system.args

if (args.length != 2) {
	console.log("please pass the name of one lesson to test")
	phantom.exit()	
} else {
	var lesson = args[1];
}

var wd = fs.workingDirectory

require(wd + "/lib/dev/" + lesson + ".js");

function testTask(taskName, callback) {		
	var filePath = "file:///Users/dgaynor/classadoo-lessons/samples/" + taskName + ".html"	
	page.open(filePath, catchE(function(status) {				
		if (status != "success") {
			smartLog("test html does not exist!", filePath, status)
			return
		} else {
			if(!page.injectJs('lib/dev/' + lesson + ".js")) {
				smartLog("injection FAILED");
			}	

			var result = page.evaluate(function() {								
				var testIndex = __importedLesson.length - 1
				var currentTask = __importedLesson[testIndex];
				var locationResult = RegExp(currentTask.location).test(testlocationHref)							

				var checkResult = currentTask.check()											

		    	return ["Check: " + (checkResult || false), "Location: " + locationResult]
		    })		    		   

			callback(result);
		}	
	}))
}

function testLoop() {	
	var currentTaskName = __importedLesson[__importedLesson.length - 1].name;
	testTask(currentTaskName, function(results) {		
		setTimeout(function() { testPrevious(results) }, 50);
	});

	function testPrevious(currentResults) {
		var previousTask = __importedLesson[__importedLesson.length - 2] 		
		if (previousTask) {
			testTask(previousTask.name, function(results) {
				var prevResultWithHeader = ["Previous"].concat(results.slice(0,1));				
				smartLog("\n", currentResults.concat(prevResultWithHeader).join("\n"));
				setTimeout(testLoop, 100);
			});
		} else { 
			smartLog("\n", currentResults.concat(["Previous", false]).join("\n"));
			setTimeout(testLoop, 100);
		}			
	}	
}

testLoop()