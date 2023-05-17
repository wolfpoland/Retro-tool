import { Observable, Subject } from "rxjs";

export class Observer<T> {
  private message: Subject<any> = new Subject();
  private status: Subject<any> = new Subject();

  public observeMessage(): Observable<T> {
    return this.message.asObservable();
  }

  public observeStatus(): Observable<T> {
    return this.message.asObservable();
  }

  public emitMessage(message: T) {
    this.message.next(message);
  }

  public emitStatus(status: T) {
    this.message.next(status);
  }

  public destroy() {
    this.message.complete();
    this.status.complete();
  }
}
