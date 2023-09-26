import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { broadcaster } from "../../index";
import { redis } from "../../redis-connector";

export async function newCard(transaction: Transaction<Card>) {
  const cards: Array<Card> = (await redis.get("card")) || [];
  await redis.set("card", [transaction.cargo, ...cards]);
  broadcaster.emitTransaction(transaction);
}
