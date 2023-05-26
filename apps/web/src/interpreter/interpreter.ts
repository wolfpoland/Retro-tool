import { Transaction } from "../../../../packages/types/transaction";

import { Card } from "../../../../packages/types/card";
import { store } from "@/store/store";
import {
  createCardAction,
  removeCardAction,
} from "@/store/actions/card.action";

export function clientInterpreter(transaction: Transaction<unknown>) {
  switch (transaction.type) {
    case "NEW_CARD": {
      store.dispatch(createCardAction(transaction.cargo as Card));
      break;
    }

    case "CARD_REMOVE": {
      store.dispatch(removeCardAction(transaction.cargo as Card));
      break;
    }
  }
}
