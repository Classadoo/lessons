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

require(wd + "/lib/prod/" + lesson + ".js");

var results = []

testIndex = 0;

function checkLoop() {
	if (!__importedLesson[testIndex]) {
		console.log("TESTING DONE");
		printResults();
		return
	}

	var filePath = "file:///Users/dgaynor/classadoo-lessons/tests/test_files/" + lesson + "/" + testIndex + ".html"

	page.open(filePath, catchE(function(status) {						
		if (status != "success") {
			fail("test html does not exist!");
			return
		} else {
			if(!page.injectJs('lib/dev/websites.js')) {				
				fail("injection failed!");
				return 
			}	

			function check() {  			
				var currentTask = __importedLesson[ testIndex ];
				var locationResult = RegExp(currentTask.location).test(testlocationHref)			
				var checkResult = currentTask.check()	
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
		var renderPath = wd + "/tests/test_screenshots/" + testIndex + ".png";
		page.render(renderPath);
	}	    	

	results[testIndex] = result		    	
	testIndex = testIndex + 1;
	checkLoop();
}

function fail(message) {	
	results[testIndex] = ["Error", "Error", message];
	testIndex = testIndex + 1;
	checkLoop();
}

checkLoop();

function printResults() {	
	results.forEach(function(res, i) {		
		console.log(i, "Check:", res[0], "Location:", res[1], res[2]);
	})	
	phantom.exit();
}

