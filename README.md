# srTimer
Simple javascript timer application. Originally made to run my cube timer app at http://www.solvingrubik.com/
Can easily be included and configured to work on any webpage.

## Instalation
Download the timer.js file and put it in your web directory.

OR

Install the package using bower
```
bower install --save srTimer
```

## Usage

The timer requires jQuery. Include timer.js in your web page.
```html
<script type="text/javascript" src="./path/to/timer.js" />
```

The timer looks for a tag to output the time on by id 'timer-face' Reconfigure the id or make sure you have a tag with id 'timer-face' on your page.
```javascript
...

	timerID : 'timer-face',
	readyClass : 'time-ready'

...
```

```html
<h1 id="timer-face"></h1>
```

Start/stop the timer by pressing the spacebar. Starting the timer again will restart the timer.

## Registering Listeners
Listeners can be registered to receive events when the timer starts, stops, or resets. This allows the timer to call your custom code to fit any of your application's needs. 
```javascript
SRModules.timer.addStopListener(function(e){

	console.log('Received stop event', e);
	
	// Add custom event listener code
	
});
```
