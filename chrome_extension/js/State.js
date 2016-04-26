State = function(props) {	
	var self = this;

	props.forEach(function(prop) {
		self["set" + Util.capitalizeFirstLetter(prop)] = set(prop);
	})

	function set(propName) {
		return function(val) {
			self[propName] = val
			fire(propName)
		}
	}
}