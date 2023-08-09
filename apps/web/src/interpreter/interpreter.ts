import { Transaction } from "../../../../packages/types/transaction";

import { Card, createCard } from "../../../../packages/types/card";
import { store } from "@/store/store";
import {
  changeColumnAction,
  ChangeColumnActionType,
  createCardAction,
  editCardAction,
  removeCardAction,
} from "@/store/actions/column.action";

export function clientInterpreter(
  transaction: Transaction<unknown>,
  currentWsId: string
) {
  console.log("transaction", transaction);
  if (transaction.wsId === currentWsId) {
    console.log("transaction cancelded");
    return;
  }

  switch (transaction.type) {
    case "NEW_CARD": {
      store.dispatch(createCardAction(createCard(transaction.cargo as Card)));
      break;
    }

    case "CARD_REMOVE": {
      store.dispatch(removeCardAction(createCard(transaction.cargo as Card)));
      break;
    }

    case "CARD_EDIT": {
      store.dispatch(editCardAction(createCard(transaction.cargo as Card)));
      break;
    }

    case "CARD_MOVE": {
      store.dispatch(
        changeColumnAction(transaction.cargo as ChangeColumnActionType)
      );
      break;
    }
  }
}
