/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./lessons/Lesson_1.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../tasks/SampleTask1 */ 1);
	__webpack_require__(/*! ../tasks/SampleTask2 */ 2);
	
	__importedLesson = [
		SampleTask1,
		SampleTask2
	]

/***/ },
/* 1 */
/*!******************************!*\
  !*** ./tasks/SampleTask1.js ***!
  \******************************/
/***/ function(module, exports) {



/***/ },
/* 2 */
/*!******************************!*\
  !*** ./tasks/SampleTask2.js ***!
  \******************************/
/***/ function(module, exports) {

	SampleTask2 = new function() {
		this.url = "file:///Users/dgaynor/classadoo.github.io/index.html",
		this.description = "Change the banner's background color",
		this.hint = 'The banner is the big, black bar in the center of the page. Change it\'s color by right clicking, then using "inspect element" to change it\'s style.'
	
		this.hintAction = function() {
			Helpers.flash($(".intro-container"));
		}
	
		this.check = function() {
			Helpers.hasStyle("background")
		}
	}

/***/ }
/******/ ]);
//# sourceMappingURL=Lesson_1.js.map