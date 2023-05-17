import { broadcaster, connectionClosed$ } from "../index";
import { takeUntil } from "rxjs";
import { Transaction } from "../../../packages/types/transaction";
import { WebSocket } from "ws";

export function broadcastHandler(socket: WebSocket): void {
  broadcaster.observeMessage().subscribe((message: Transaction<unknown>) => {
    console.log("send broadcast: ", message);
    socket.send(JSON.stringify(message));
  });
}
