/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	__webpack_require__(3);
	__webpack_require__(5);

	__importedLesson = [
		// ScratchpadWriteGoogle,	
		CreateHouse,
		AddRoom,
		AddTwoMoreRooms,
		AddFurniture,
		SDivWithinDiv,	
	]

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(4);

	ScratchpadWriteGoogle = new function() {	
		this.description = 'Make a div with the word "Google" in it'
		this.hint = "remember you'll need to start the div with <div> and end it with </div>"
		this.location = "scractchpad.io"
		
		this.check = function() {		
			var i = new IframeManager($("#preview"));		
			return H.hasChildWithText(i.$("body"), "Google")
		}	
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = new function() {	
		this.flash = function(elements, numberOfCycles, callback) {
			numberOfCycles = numberOfCycles || 2
			var cycles = 0;	
			function cycle() {
				elements.css({ background: "rgba(256, 256, 256, .9", color: "darkgrey" });		
				setTimeout(function() { 
					elements.css({ background: "rgba(80, 80, 80, .9)", color: "white" })
					cycles += 1
					if (cycles < numberOfCycles) {
						setTimeout(cycle, 300)
					} else {
						callback && callback();
					}
				}, 300)		
			}
			
			cycle()	
		}	

		this.hasStyle = function($el, propName) {
			var matcher = new RegExp(propName, "g");
			var style = $el.attr("style")
			hasStyle = style && !!style.match(matcher);		
			return hasStyle
		}

		this.hasOneOfStyles = function($el, propNames) {
			var regexString= propNames.map(function(name) { "(" + name + ")"}).join("|");
			var matcher = new RegExp(regexString, "g");	
			return !!$el.attr("style").match(matcher) 
		}

		this.hasChildWithText = function($el, text) {
			return $el.find(":contains(" + text + ")").length > 0
		}
	} 


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(4);

	SDivWithinDiv = new function() {	
		this.description = 'Now put that div container inside another div container',
		this.hint = "remember you'll need to start the div with <div> and end it with </div>"
		this.location = "scractchpad.io"
		
		this.check = function() {			
			var i = new IframeManager($("#preview"));				
			return i.$("div > :contains(Google)").length > 0
		}	
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var H = __webpack_require__(4);

	CreateHouse = new function() {	
		this.description = 'Starting by creating an empty house using HTML',
		this.hint = "remember you'll need to start the house with <house> and end it with </house>"
		this.location = "scratchpad\.io"
		
		this.check = function() {			
			var i = new IframeManager($("#preview"));				
			return i.$("house").length > 0
		}	
	}

	AddRoom = new function() {	
		this.description = 'Great, now put a room in that house.',
		this.hint = "You can make the room in the same way you made the house. Just make sure to put the room betwee <house> and </house>"
		this.location = "scratchpad\.io"
		
		this.check = function() {			
			var i = new IframeManager($("#preview"));				
			return i.$("house > room").length > 0
		}	
	}

	AddTwoMoreRooms = new function() {	
		this.description = 'Great, now put two more rooms in.',
		this.hint = "Make the rooms in the same way you made the last room, and add them underneath that one."
		this.location = "scratchpad\.io"
		
		this.check = function() {			
			var i = new IframeManager($("#preview"));				
			return i.$("house > room").length > 2
		}	
	}

	AddFurniture = new function() {	
		this.description = 'Great, now add furniture to each room. You can make a couch, chair, or anything else that comes to mind!',
		this.hint = "You can make furniture the same way you make rooms."
		this.location = "scratchpad\.io"
		
		this.check = function() {			
			var i = new IframeManager($("#preview"));				
			var roomsWithChildren = i.$("room").filter(function(i, el) {
				return $(el).children().length > 0
			})

			return roomsWithChildren.length > 2
		}	
	}

/***/ }
/******/ ]);