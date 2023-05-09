"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const websocket_1 = __importDefault(require("@fastify/websocket"));
const server = (0, fastify_1.fastify)();
server.register(websocket_1.default, {
    options: { maxPayload: 1048576 },
});
server.register(async function (fastify) {
    server.get("/*", { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
        connection.socket.on("connect", () => {
            console.log("connected");
        });
        connection.socket.on("open", () => {
            console.log("opened");
        });
        connection.socket.on("message", (message) => {
            // message.toString() === 'hi from client'
            console.log("new message", message.toString());
            // connection.socket.send("hi from wildcard route");
        });
    });
});
server.listen({ port: 3900 }).then(() => {
    console.log("Server listening at port 3900");
});
