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
  currentWsId: string,
  channelId: number
) {
  if (transaction.wsId === currentWsId || transaction.channelId !== channelId) {
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
