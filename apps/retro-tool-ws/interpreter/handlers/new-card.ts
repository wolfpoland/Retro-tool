import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { broadcaster } from "../../index";

export function newCard(transaction: Transaction<Card>) {
  broadcaster.emitMessage(transaction);
}