var KeyCode = {
  enter: 13,
  down: 40,
  up: 38,
  escape: 27
}

// contains convenience methods for binding to certain key presses
KeyBinding = new function() {
  var self = this;

  function checkForKeyCode(e, codeExpected) {
    var codeReceived = e.keyCode || e.which;
    return codeReceived === codeExpected
  }

  this.keypress = function(keyCode, $bindTo, callback) {
    return bindKeyEvent("keypress", keyCode, $bindTo, callback)
  };

  this.keyup = function(keyCode, $bindTo, callback) {
    return bindKeyEvent("keyup", keyCode, $bindTo, callback)
  };

  this.keydown = function(keyCode, $bindTo, callback) {
    return bindKeyEvent("keydown", keyCode, $bindTo, callback);
  };

  function bindKeyEvent(eventType, keyCode, $bindTo, callback) {
    return new Binding(eventType, $bindTo, function(e) {
      if (checkForKeyCode(e, keyCode)) {
        callback(e)
      }
    })
  }
}();

// a wrapper around an event binding which can manage it's own unbinding
Binding = function(type, $bindTo, callback) {
  var namespace = Util.incrementingString();
  var eventString = type + "." + namespace;

  $bindTo.on(eventString, function(e, data) {    
    // console.log(e, data);
    if (data) {
      callback(data.contents);
    } else {
      callback(e);
    }
    
  });

  this.unbind = function() {
    $bindTo.off(eventString)
  }
};

function respond(eventName, callback) {
  return new Binding(eventName, $(document), callback);
}

function fire(eventName, data) {
  var id = Util.incrementingString();    
  // console.log("firing event: " + eventName, data);
  $(document).trigger(eventName, [{id: id, contents: data}]);
}
