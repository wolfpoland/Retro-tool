import { Transaction } from "../../../packages/types/transaction";
import { RawData } from "ws";
import { interpreter } from "../index";
import prisma from "../utils/prisma";

export async function messageHandler(message: RawData): Promise<void> {
  //create parser here
  const parsedMessage = JSON.parse(message.toString()) as Transaction<unknown>;

  const session = await prisma.session.findUnique({
    where: {
      sessionToken: parsedMessage.token,
    },
  });

  if (session) {
    interpreter.interpret(parsedMessage);
  }
}
