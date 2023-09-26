import { broadcaster } from "../index";
import { Transaction } from "../../../packages/types/transaction";
import { WebSocket } from "ws";

export function broadcastHandler(socket: WebSocket): void {
  broadcaster
    .observeTransaction()
    .subscribe((message: Transaction<unknown>) => {
      socket.send(JSON.stringify(message));
    });
}
