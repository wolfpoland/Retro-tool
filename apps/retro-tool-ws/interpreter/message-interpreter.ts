import { Transaction } from "../../../packages/types/transaction";
import { newCard } from "./handlers/new-card";
import { Card, createCard } from "../../../packages/types/card";
import { removeCard } from "./handlers/remove-card";
import { editCard } from "./handlers/edit-card";
import { broadcaster } from "../index";

// implement zod here
export class MessageInterpreter {
  interpret(transaction: Transaction<unknown>): void {
    switch (transaction.type) {
      case "NEW_CARD": {
        newCard({
          ...transaction,
          cargo: createCard(transaction.cargo as Card),
        });
        break;
      }

      case "CARD_REMOVE": {
        removeCard({
          ...transaction,
          cargo: createCard(transaction.cargo as Card),
        });
        break;
      }

      case "CARD_EDIT": {
        editCard({
          ...transaction,
          cargo: createCard(transaction.cargo as Card),
        });
        break;
      }

      default: {
        broadcaster.emitMessage(transaction);
        // throw new Error("Message type unknown");
      }
    }
  }
}
