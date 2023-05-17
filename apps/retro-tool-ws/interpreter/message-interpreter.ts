import { Transaction } from "../../../packages/types/transaction";
import { newCard } from "./handlers/new-card";
import { Card } from "../../../packages/types/card";

// implement zod here
export class MessageInterpreter {
  interpret(transaction: Transaction<unknown>): void {
    switch (transaction.type) {
      case "NEW_CARD": {
        newCard(transaction as Transaction<Card>);
      }
    }
  }
}
