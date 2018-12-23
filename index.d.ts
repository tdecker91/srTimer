declare module 'sr-timer' {
  export interface ISRTimer {
    unbind: () => void;
    start: () => void;
    stop: () => void;
    reset: () => void;
    isRunning: () => boolean;
    getElapsedTime: () => string;
    addStartListener(listener: ListenerFunc<void>): void;
    addStopListener(listener: ListenerFunc<TimerEvent>): void;
    addResetListener(listener: ListenerFunc<void>): void;
    addTickListener(listener: ListenerFunc<TimerEvent>): void;
  }

  export type ListenerFunc<T> = (event: T) => void

  export type TimerEvent = {
    time: number
    displayTime: string; 
  }
}