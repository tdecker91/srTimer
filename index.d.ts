declare class SRTimer {
  unbind: () => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: () => boolean;
  getElapsedTime: () => string;
  addStartListener(listener: SRTimer.ListenerFunc<void>): void;
  addStopListener(listener: SRTimer.ListenerFunc<SRTimer.TimerEvent>): void;
  addResetListener(listener: SRTimer.ListenerFunc<void>): void;
  addTickListener(listener: SRTimer.ListenerFunc<SRTimer.TimerEvent>): void;
}

declare namespace SRTimer {
  export type ListenerFunc<T> = (event: T) => void

  export type TimerEvent = {
    time: number
    displayTime: string; 
  }
}

export = SRTimer