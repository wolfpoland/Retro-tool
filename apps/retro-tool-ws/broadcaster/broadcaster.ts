import { Observable, Subject } from "rxjs";
import { Transaction } from "../../../packages/types/transaction";

export class Broadcaster<T> {
  private message: Subject<Transaction<T>> = new Subject();

  public observeTransaction(): Observable<Transaction<T>> {
    return this.message.asObservable();
  }

  public emitTransaction(message: Transaction<T>) {
    this.message.next(message);
  }

  public destroy() {
    this.message.complete();
  }
}
