# srTimer
Configurable javascript timer application. Originally made to run my cube timer app at http://www.solvingrubik.com/
Can easily be included and configured to work on any webpage.

## Usage

The timer requires jQuery. Include timer.js in your web page.
```html
<script type="text/javascript" src="./path/to/timer.js" />
```

The timer looks for a tag to output the time on by id 'timer-face' Reconfigure the id or make sure you have a tag with id 'timer-face' on your page.
```javascript
...

	// CSS
	puzzleSelectID : 'puzzle-select',
	timerID : 'timer-face',
	readyClass : 'time-ready'

...
```

```html
<h1 id="timer-face"></h1>
```

Start/stop the timer by pressing the spacebar. Starting the timer again will restart the timer.
