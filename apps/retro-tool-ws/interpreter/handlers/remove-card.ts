import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { broadcaster } from "../../index";
import { redis } from "../../redis-connector";

export async function removeCard(transaction: Transaction<Card>) {
  const cards: Array<Card> = (await redis.get("card")) || [];

  const filteredCards = cards.filter(
    (card) => card.id !== transaction.cargo.id
  );

  await redis.set("card", filteredCards);

  broadcaster.emitTransaction(transaction);
}
