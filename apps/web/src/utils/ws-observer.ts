export class WsObserver<T> {
  private subscribers: Map<
    string,
    Array<(callback: (...args: any[]) => T) => void>
  > = new Map();

  subscribe(eventName: string, callback: (payload: unknown) => void) {
    let subscribers = this.subscribers.get(eventName);

    if (!subscribers) {
      subscribers = [];
      this.subscribers.set(eventName, subscribers);
    } else {
      subscribers.push(callback);
      this.subscribers.set(eventName, subscribers);
    }
  }

  unsubscribe(eventName: string) {
    this.subscribers.delete(eventName);
  }

  destroy(): void {
    this.subscribers.clear();
  }

  emit(eventName: string, payload: (...args: any[]) => T) {
    const subscribers = this.subscribers.get(eventName);
    if (subscribers) {
      subscribers.forEach((callback) => callback(payload));
    }
  }
}
