# srTimer
Simple javascript timer application. Originally made to run my cube timer app at http://www.solvingrubik.com/
Can easily be included and configured to work on any webpage.

## Instalation
Download the timer.js file and put it in your web directory.

OR

Install the package using npm
```bash
npm install --save sr-timer
```

## Usage
Import the library

```javascript
import SRTimer from 'sr-timer'
```

Create a new instance of the timer. The timer will automatically bind to window key events to listen for the spacebar to start / stop the timer.

```javascript
let timer = new SRTimer()
```

Optionally an alternate keycode can be passed in to the constructor customize what key is listens for.

```javascript
let timer = new SRTimer(65) // use 'A' key
```

If you don't want the timer to bind to window events you can pass in null as the timer key.

```javascript
let timer = new SRTimer(null) // start / stop timer manually
timer.start()
...
timer.stop()
const elapsed = timer.getElapsedTime()
```

When you no longer need the timer make sure to call `unbind` to stop listening for keyevents
```javascript
timer.unbind();
delete timer;
```

## Registering Listeners
Listeners can be registered to receive events when the timer starts, stops, ticks, or resets. This allows the timer to call your custom code to fit any of your application's needs. 
```javascript
timer.addStartListener(() => {
  console.log('timer started')
})

timer.addStopListener(stopEvent => {
  console.log(`elapsed time ${stopEvent.time}`)
})
```

## API
  | Method | Description | Example |
  |---|---|---|
  | `start()` | starts the timer | `timer.start()` |
  | `stop()` | stops the timer and sets the elapsed time. | `timer.stop()` |
  | `reset()` | resets the timer and sets elapsed time back to 0 | `timer.reset()` |
  | `isRunning()` | returns true if the timer is currently started | `timer.isRunning()` |
  | `getElapsedTime()` | Gives the current elapsed time as a formatted string | `let elapsed = timer.getElapsedTime()` |
  | `addStartListener(listener: () => void)` | register listener for when the timer starts | `timer.addStartListener(() => { console.log('started') })` |
  | `addStopListener(listener: (event: TimerEvent) => void)` | register listener for when the timer stops | `timer.addStopListener(event => { console.log('stopped', event) })` |
  | `addResetListener(listener: () => void)` | register listener for when the timer resets | `timer.addResetListener(() => { console.log('reset') })` |
  | `addTickListener(listener: (event: TimerEvent) => void)` | register listener for when the timer ticks | `timer.addTickListener(event => { console.log('tick', event) })` |

## Development

### Build the dist
```bash
npm run build
```

Publish to registry

1. update version in `package.json`
1. build bundle `npm run build` and build library `tsc`
1. run `npm publish`