import { Transaction } from "../../../../packages/types/transaction";

import { Card } from "../../../../packages/types/card";
import { store } from "@/store/store";
import { createCardAction } from "@/store/actions/card.action";

export function clientInterpreter(transaction: Transaction<unknown>) {
  switch (transaction.type) {
    case "NEW_CARD": {
      store.dispatch(createCardAction(transaction.cargo as Card));
    }
  }
}
