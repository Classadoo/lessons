// const Browser = require('zombie');
require("../lessons/websites")
var page = require('webpage').create();
$ = require("jquery");


page.onConsoleMessage = function(msg) {
  console.log(msg);
}

// phantom.onError = function(msg, trace) {
// 	console.log("asdfasfsadf");
//   var msgStack = ['PHANTOM ERROR: ' + msg];
//   if (trace && trace.length) {
//     msgStack.push('TRACE:');
//     trace.forEach(function(t) {
//       msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
//     });
//   }
//   console.error(msgStack.join('\n'));
//   phantom.exit(1);
// };

page.onError = function(msg, trace) {	
	var msgStack = ['PHANTOM ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
		  	msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line)
		});
	}
   console.error(msgStack.join('\n'));
  	phantom.exit(1);
};

// Browser.localhost('example.com', 8000);

// const browser = new Browser();

// browser.visit("/tests/test_files/websites/1.html", function() {
// 	console.log("sts", browser.statusCode);	
// 	GLOBAL.window = browser.window
// 	GLOBAL.document = window.document;
// 	GLOBAL.$ = require("jquery");
	
// 	 browser.wait(function(window) {
//     	// make sure the new script tag is inserted   		
// 	    return window.classadooIframesLoading.length === 0
//   	}, function() {
//   		setInterval(function() {
//   			console.log("result", __importedLesson[0].check())			
//   		}, 100)  		
//   	})
// 	// console.log("Asdfasfsd")	
// });

page.onInitialized = catchE(function() {
    

    
});

page.onCallback = function(data) {
    console.log('Main page is loaded and ready');
           
};

function catchE(fun) {
	return function(args1, args2, args3) {
		try {
			fun(args1, args2, args3)
		} catch(e) {			
			console.log(e)
			phantom.exit(1);
		}
	}
}

page.open("file:///Users/dgaynor/classadoo-lessons/tests/test_files/websites/2.html", catchE(function(status) {		
	console.log("Status: " + status);	  	

	if(page.injectJs('lib/dev/websites.js')) {
		console.log("injected success");
	}	

	var result = page.evaluate(function() {
    	console.log("frames lesn", classadooIframesLoading.length)        	
    	return __importedLesson[0].check()	
    })
            
    console.log("slut", result);
	phantom.exit();	 

	// page.evaluate(function() {               
	// 	window.callPhantom();            
 //        setInterval(function() {        	
 //        	if (!classadooIframesLoading.length) {
        	
 //        	}
 //        },50)

 //        console.log("Added listener to wait for page ready");
 //    });
}))	

