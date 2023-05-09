"use strict";
import { fastify } from "fastify";
import ws from "@fastify/websocket";

const server = fastify();

server.register(ws, {
  options: { maxPayload: 1048576 },
});

server.register(async function (fastify) {
  server.get(
    "/*",
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on("message", (message) => {
        // message.toString() === 'hi from client'
        console.log("new message", message.toString());
        // connection.socket.send("hi from wildcard route");
      });
    }
  );
});

server.listen({ port: 3900 }).then(() => {
  console.log("Server listening at port 3900");
});
