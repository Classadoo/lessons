var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

page.onConsoleMessage = function(msg) {
  console.log("message", msg)
}

page.onError = function(msg, trace) {	
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
		  	msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line)
		});
	}
   console.log(msgStack.join('\n'));
};

function catchE(fun) {
	return function(args1, args2, args3) {
		try {
			fun(args1, args2, args3)
		} catch(e) {			
			console.log("ERROR", e);
			results[testIndex] = fail(e);			    
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

var results = []

testIndex = 0;

function checkLoop() {
	var task = __importedLesson[testIndex]

	if (!task) {
		console.log("TESTING DONE");
		printResults();
		return
	}

	var filePath = "file:///Users/dgaynor/classadoo-lessons/samples/" + task.name + ".html"

	page.open(filePath, catchE(function(status) {						
		if (status != "success") {
			fail("test html does not exist!");
			return
		} else {
			if(!page.injectJs('lib/dev/' + lesson + '.js')) {				
				fail("injection failed!");
				return 
			}	

			function check() {  
				if (document.getElementById("video-sample")) {					
					var locationResult = "VIDEO"
					var checkResult = "VIDEO"
				} else {
					var currentTask = __importedLesson[ testIndex ];					
					var locationResult = RegExp(currentTask.location).test(testlocationHref)			
					var checkResult = currentTask.check()	
				}				
		    	return [checkResult, locationResult]
		    }

			var result = page.evaluateJavaScript(check.toString().replace(" testIndex ", testIndex));			
	    	result.push("")
		    success(result)		    
		}		
	}))	
}

function success(result) {	
	if (!result[0]) {		
		var renderPath = wd + "/tests/test_screenshots/" + __importedLesson[testIndex].name + ".png";
		page.render(renderPath);
	}	    	

	results[testIndex] = result		    	
	testIndex = testIndex + 1;
	setTimeout(checkLoop, 50);
}

function fail(message) {	
	results[testIndex] = ["Error", "Error", message];
	testIndex = testIndex + 1;
	setTimeout(checkLoop, 50);
}

checkLoop();

function printResults() {	
	results.forEach(function(res, i) {		
		console.log(__importedLesson[i].name, "Check:", res[0], "Location:", res[1], res[2]);
	})	
	phantom.exit();
}

