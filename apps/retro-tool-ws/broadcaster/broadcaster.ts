import { Observable, Subject } from "rxjs";
import { Transaction } from "../../../packages/types/transaction";

export class Broadcaster<T> {
  private message: Subject<Transaction<T>> = new Subject();

  public observeMessage(): Observable<Transaction<T>> {
    return this.message.asObservable();
  }

  public emitMessage(message: Transaction<T>) {
    console.log("emmit", this.message);
    this.message.next(message);
  }

  public destroy() {
    this.message.complete();
  }
}
