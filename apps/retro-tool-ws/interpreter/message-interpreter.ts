import { Transaction } from "../../../packages/types/transaction";
import { newCard } from "./handlers/new-card";
import { Card } from "../../../packages/types/card";
import { removeCard } from "./handlers/remove-card";

// implement zod here
export class MessageInterpreter {
  interpret(transaction: Transaction<unknown>): void {
    switch (transaction.type) {
      case "NEW_CARD": {
        newCard(transaction as Transaction<Card>);
        break;
      }

      case "CARD_REMOVE": {
        removeCard(transaction as Transaction<Card>);
        break;
      }

      default: {
        throw new Error("Message type unknown");
      }
    }
  }
}
