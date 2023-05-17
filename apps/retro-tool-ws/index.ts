"use strict";
import { fastify } from "fastify";
import ws from "@fastify/websocket";
import { Broadcaster } from "./broadcaster/broadcaster";
import { MessageInterpreter } from "./interpreter/message-interpreter";
import { Transaction } from "../../packages/types/transaction";
import { messageHandler } from "./handlers/message-handler";
import { broadcastHandler } from "./handlers/broadcast-handler";
import { Subject } from "rxjs";

const server = fastify();
export const broadcaster: Broadcaster<unknown> = new Broadcaster();
export const interpreter: MessageInterpreter = new MessageInterpreter();
export const connectionClosed$: Subject<void> = new Subject();

server.register(ws, {
  options: { maxPayload: 1048576 },
});

server.register(async function (fastify) {
  server.get(
    "/*",
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      broadcastHandler(connection.socket);

      connection.socket.on("message", (message) => {
        messageHandler(message);
      });

      connection.socket.on("open", () => {
        console.log("connection opened  !");
      });

      connection.socket.on("close", () => {
        console.log("connection closed  !");
        // connectionClosed$.next();
      });
    }
  );
});

server.listen({ port: 3900 }).then(() => {
  console.log("Server listening at port 3900");
});
