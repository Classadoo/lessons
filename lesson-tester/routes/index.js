var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var url = require('url');
var path = require('path');
var mkdirp = require('mkdirp');
var testDir = "/Users/dgaynor/classadoo-lessons/tests/test_files/"
var lessonName = "websites"
var testFileBase = testDir + lessonName;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/next_test_id', function(req, res, next) {	
	mkdirp(testFileBase, function (err) {
		var currentDirectoryIds = fs.readdirSync(testFileBase).map(function(file) {
			var name = file.split(".")[0];
			return Number(name)
		})

		console.log("curent", currentDirectoryIds);
		currentDirectoryIds.sort()

		var previousId = currentDirectoryIds[currentDirectoryIds.length - 1]
		if (previousId === undefined) previousId = -1

		console.log(previousId);

		res.send({id: previousId + 1}, 200);	
	})			
})

router.post('/resource_downloader', function(req, res, next) {
	console.log("in the resource downloader");
		  
	new ResourceHandler(req);

	res.send(200);      
})

ResourceHandler = function(req) {      
	var resources = req.body.originalToAwsUrlMap || [];
	var stylesheets= req.body.processedStylesheets || [];	
	var fileId = req.body.fileId;
	var html = req.body.html;		
	var archivePath = html.awsPath;	

	console.log("stylesheets", stylesheets);

	console.log("kin this thing");
	var isIframe = req.body.isIframe;  
	var archiveBase = req.body.fileSystemBase
	
	console.log("herhehe");

	var callbackTracker = new CallbackTracker(Object.keys(resources).length, Object.keys(stylesheets).length);	

	console.log('in the resource handler');

	function mirrorResource(resourceUrl, mirrorPath) {
		var requestOptions = {
			uri: resourceUrl,
			encoding: null
		}

		request(requestOptions, function(error, response, body) {		
			if (!error && response.statusCode == 200) {
				writeFile(archiveBase, mirrorPath, body)                  
				callbackTracker.markResourceAsSaved();                
			} else {
				console.log("error downloading from: " + resourceUrl);
			if (error) console.log("error is: " + error.message);
				//                console.log("status code is: " + response.statusCode);
				callbackTracker.markResourceAsSaved();
			}
		})
	}

	function writeFile(base, filePath, data) {		
		var writePath = path.join(base, filePath);
		console.log(filePath, base, writePath)


		mkdirp(path.dirname(writePath), function (err) {
			fs.writeFile(writePath, data);
		})		
	}     

	for ( var filePath in stylesheets ) {          
		writeFile(archiveBase, filePath, stylesheets[filePath])          
		callbackTracker.markStylesheetAsSaved();          
	}

	for ( var resourceUrl in resources ) {       
		mirrorResource(resourceUrl, resources[resourceUrl]);       
	}

	callbackTracker.setSaveHtmlFunction(function() {
		writeFile(testFileBase, fileId + ".html", html.html)            		
	})
}


// Waits for all resources to be downloaded before saving the full html and
// calling the given callback.
CallbackTracker = function(resourcesRemaining, stylesheetsRemaining) {
  var htmlSaveFunction = false;

  this.markResourceAsSaved = function() {
      resourcesRemaining -= 1;
      checkIfMirroringIsComplete();
  };

  this.markStylesheetAsSaved = function() {
      stylesheetsRemaining -= 1;
      checkIfMirroringIsComplete();
  };

  this.setSaveHtmlFunction = function(fn) {
      htmlSaveFunction = fn;
      checkIfMirroringIsComplete();
  };

  function checkIfMirroringIsComplete() {
      console.log("stylesheets remaining is:" + stylesheetsRemaining);
      console.log("resources remaining is:" + resourcesRemaining);
      if (stylesheetsRemaining <= 0 && resourcesRemaining <= 0 && htmlSaveFunction) {
          console.log("mirroring complete");
          htmlSaveFunction();
      }
  }
};

module.exports = router;
