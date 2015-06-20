/*

	Name: timer.js
	Author: Tyson Decker
	Email: tyson.decker@gmail.com

	Description: Configurable javascript timing app for use on www.solvingrubik.com

 */

var SRModules = SRModules || {};

// Configurations
var config =
{

	// Timer
	milisecondDigitsToDisplay: 2,
	updateDisplayInterval : 15,

	timerKey : 32, 				// space
	timerID : 'timer-face',
	readyClass : 'time-ready'

}

// Timer Object
SRModules.timer = (function() {


	var startTime = 0;
	var endTime = 0;
	var running = false;
	var timeHistory = [];
	var startListeners = [];
	var stopListeners = [];
	var resetListeners = [];

	/**
	 * adds 0's to the front of a number returns a string representation of the number
	 * @param  {int} number
	 * @param  {int} digits how many digits the final number should be
	 * @return {string} 	string representation of the number
	 */
	function prependZeros(number, digits)
	{
		var stringNumber = number.toString();
		var length = stringNumber.length;

		for (var i = 0; i < (digits - length); i++)
		{
			stringNumber = '0' + stringNumber; 
		}

		return stringNumber;
	}

	/**
	 * add 0's to the end of a number
	 * @param  {int} number
	 * @param  {int} digits
	 * @return {string}
	 */
	function appendZeros(number, digits)
	{
		var stringNumber = number.toString();
		var length = stringNumber.length;

		for (var i = 0; i < (digits - length); i++)
		{
			stringNumber = stringNumber + '0'; 
		}

		return stringNumber;
	}

	/**
	 * formats milliseconds for display on the timer face
	 * by padding with 0s as necessary
	 * @param  {int} number the number of miliseconds
	 * @param  {int} digits how many digits the timer face diplays (2-3)
	 * @return {string}
	 */
	function formatMiliseconds(number, digits)
	{
		return prependZeros(number, 3).substring(0,digits);
	}

	/**
	 * Converts milliseconds to a clock face display ex. "00:00.0"
	 * @param  {int} totalMilliseconds the elapsed time
	 * @return {string} the clock face
	 */
	function formatTime(totalMilliseconds)
	{

		if (totalMilliseconds == undefined)
		{
			return "00:00.00";
		}

		var hours = Math.floor(totalMilliseconds / 1000 / 60 / 60);
		var minutes = Math.floor(((totalMilliseconds % 3600000) / 1000) / 60);
		var seconds = Math.floor(((totalMilliseconds % 3600000) % 60000) / 1000);
		var milliseconds = Math.floor(((totalMilliseconds % 3600000) % 60000) % 1000);

		return (hours > 0 ? prependZeros(hours, 2) + ":" : "") + prependZeros(minutes, 2) + ":" + prependZeros(seconds, 2) + "." + formatMiliseconds(milliseconds, config.milisecondDigitsToDisplay);

	}

	/**
	 * Fires all listeners in the given array and passes in 
	 * the arguments to the listener function
	 * @param  {array<function>} listeners
	 * @param  {object} args      arguments to pass into the listener
	 * @return {void}
	 */
	function fireListeners(listeners, args)
	{
		listeners.forEach(function(listener){
			listener(args);
		});
	}


	var Timer = {};

	Timer.start = function()
	{
		running = true;
		startTime = new Date().getTime();
		fireListeners(startListeners, {});
	}

	Timer.stop = function()
	{
		running = false;
		endTime = new Date().getTime();
		fireListeners(stopListeners, {time:Timer.getRawElapsedTime()});
	}

	Timer.reset = function()
	{
		startTime = undefined;
		fireListeners(resetListeners, {});
	}

	Timer.isRunning = function()
	{
		return running;
	}

	/**
	 * Gives the current elapsed time as a formatted string
	 * @return {string} the elapsed time
	 */
	Timer.getElapsedTime = function()
	{
		if (startTime == undefined)
		{
			return formatTime(startTime);
		}

		return formatTime(Timer.getRawElapsedTime());
	}

	/**
	 * Returns the current elapsed time in miliseconds
	 * @return {int} the elapsed time
	 */
	Timer.getRawElapsedTime = function()
	{
		if (startTime == undefined)
		{
			return 0;
		}

		var elapsedTime;

		if (running)
		{
			elapsedTime = new Date(new Date().getTime() - startTime);
		}
		else
		{
			elapsedTime = new Date(endTime - startTime);
		}

		return elapsedTime.getTime();
	}

	Timer.addStartListener = function(listener)
	{
		startListeners.push(listener);
	}

	Timer.addStopListener = function(listener)
	{
		stopListeners.push(listener);
	}

	Timer.addResetListener = function(listener)
	{
		resetListeners.push(listener);
	}

	return Timer;

})();

// Timer Controller
SRModules.timerController = (function(){

	var ticker;
	var controller = {};

	controller.startTimer = function()
	{
		SRModules.timer.start();
	}

	controller.stopTimer = function()
	{
		SRModules.timer.stop();
	}

	controller.keyDown = function(e)
	{
		if  (!SRModules.timer.isRunning())
		{
			controller.resetDisplay();
		}
	}

	controller.keyUp = function(e)
	{
		if (SRModules.timer.isRunning()) {
			controller.stopTimer();
			clearInterval(ticker);
			controller.updateDisplay();
		} else {
			controller.startTimer();
			ticker = setInterval(controller.updateDisplay, config.updateDisplayInterval);
		}
	}

	controller.setTimerDisplayReady = function()
	{
		$('#' + config.timerID).addClass(config['readyClass']);
	}

	controller.setTimerDisplayWaiting = function()
	{
		$('#' + config.timerID).removeClass(config['readyClass']);
	}

	/**
	 * writes the elapsed time to the element
	 */
	controller.updateDisplay = function()
	{
		$('#' + config.timerID).html(SRModules.timer.getElapsedTime());
	}

	/**
	 * sets the timer back to 0
	 */
	controller.resetDisplay = function()
	{
		SRModules.timer.reset();
		controller.updateDisplay();
	}

	return controller;

})();


// Key listeners
window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	switch(key) {
		case config.timerKey:
			SRModules.timerController.keyUp();
			break;
	}
}

window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	switch(key) {
		case config.timerKey:
			SRModules.timerController.keyDown();
			break;
	}
}