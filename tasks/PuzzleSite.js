Challenge1 = new function() {	
	this.description = 'Go to www.classadoo.com/challenge_1.html. Hidden on this page are 4 secret letters, 3 secret words and one secret image. Use x-ray goggles to reveal them all!'	
	this.location = ".*"
	this.name = "Challenge1"

	this.check = function() {			
		return false
	}	
}
