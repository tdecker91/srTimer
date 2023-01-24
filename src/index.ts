import { KeyCodes, ListenerFunc, TimerEvent } from "./models";
import { formatTime } from "./util";

export default class SRTimer {
  private timerKey: number;
  private tickInterval: number;

  private ticker: number;
  private startTime: number = 0;
  private endTime: number = 0;
  private running = false;
  private isReset = false;
  private startListeners: ListenerFunc<void>[] = [];
  private stopListeners: ListenerFunc<TimerEvent>[] = [];
  private resetListeners: ListenerFunc<void>[] = [];
  private tickListeners: ListenerFunc<TimerEvent>[] = [];

  unbind: () => void;

  constructor(keyCode: number = KeyCodes.Space, tickInterval: number = 15) {
    this.timerKey = keyCode;
    this.tickInterval = tickInterval;
    this.unbind = this.bind();
  }

  private bind(): () => void {
    if (!this.timerKey) return () => {} // Don't bind to window events

    const keyUpRef = this.onKeyUp.bind(this);
    const keyDownRef = this.onKeyDown.bind(this);

    window.addEventListener("keyup", keyUpRef);
    window.addEventListener("keydown", keyDownRef);

    return () => {
      window.removeEventListener("keyup", keyUpRef);
      window.removeEventListener("keydown", keyDownRef);
    }
  }

  private tickTimer() {
    const rawTime = this.getRawElapsedTime();
    const displayTime = formatTime(rawTime);
    const tickEvent = {
      time: rawTime,
      displayTime
    };
    this.fireListeners(this.tickListeners, tickEvent);
  }

  private onKeyUp(e: KeyboardEvent) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key !== this.timerKey) return;

    if (this.running) {
      this.stop();
      clearInterval(this.ticker);
    } else {
      this.start();
      this.ticker = <any>(setInterval(() => this.tickTimer(), this.tickInterval));
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key !== this.timerKey) return;

    if (!this.running) {
      this.reset();
    }
  }

  private fireListeners<T>(listeners: ListenerFunc<T>[], args: T) {
    listeners.forEach(function(listener) {
      listener(args);
    });
  }

  /**
   * Returns the current elapsed time in miliseconds
   */
  private getRawElapsedTime(): number {
    if (this.startTime == undefined) {
      return 0;
    }

    var elapsedTime;

    if (this.running) {
      elapsedTime = new Date(new Date().getTime() - this.startTime);
    } else {
      elapsedTime = new Date(this.endTime - this.startTime);
    }

    return elapsedTime.getTime();
  }

  start(): void {
    this.isReset = false;
    this.running = true;
    this.startTime = new Date().getTime();
    this.fireListeners<void>(this.startListeners, null);
  }

  stop(): void {
    this.running = false;
    this.endTime = new Date().getTime();

    const event: TimerEvent = {
      time: this.getRawElapsedTime(),
      displayTime: this.getElapsedTime()
    };
    this.fireListeners<TimerEvent>(this.stopListeners, event);
  }

  reset(): void {
    if (!this.isReset) {
      this.isReset = true;
      this.startTime = undefined;
      this.fireListeners<void>(this.resetListeners, null);
    }
  }

  isRunning(): boolean {
    return this.running;
  }

  /**
   * Gives the current elapsed time as a formatted string
   */
  getElapsedTime(): string {
    if (this.startTime == undefined) {
      return formatTime(this.startTime);
    }

    return formatTime(this.getRawElapsedTime());
  }

  addStartListener(listener: ListenerFunc<void>) {
    this.startListeners.push(listener);
  }

  addStopListener(listener: ListenerFunc<TimerEvent>) {
    this.stopListeners.push(listener);
  }

  addResetListener(listener: ListenerFunc<void>) {
    this.resetListeners.push(listener);
  }

  addTickListener(listener: ListenerFunc<TimerEvent>) {
    this.tickListeners.push(listener);
  }
}