import { Observable, Subject } from "rxjs";
import { Transaction } from "../../../../../packages/types/transaction";

export class Observer<T> {
  private message: Subject<any> = new Subject();
  private status: Subject<any> = new Subject();

  public observeMessage(): Observable<Transaction<T>> {
    return this.message.asObservable();
  }

  public observeStatus(): Observable<T> {
    return this.message.asObservable();
  }

  public emitMessage<E>(message: Transaction<E>) {
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
