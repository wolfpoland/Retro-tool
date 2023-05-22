import { Transaction } from "../../../packages/types/transaction";
import { RawData } from "ws";
import { interpreter } from "../index";

export function messageHandler(message: RawData): void {
  //create parser here
  const parsedMessage = JSON.parse(message.toString()) as Transaction<unknown>;
  interpreter.interpret(parsedMessage);
}
