export type ListenerFunc<T> = (event: T) => void

export type TimerEvent = {
  time: number
  displayTime: string; 
}

export class KeyCodes {
  static Space: number = 32;
}