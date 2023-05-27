import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { broadcaster } from "../../index";
import { redis } from "../../redis-connector";

export async function editCard(transaction: Transaction<Card>) {
  const cards: Array<Card> = (await redis.get("card")) || [];

  const filteredCards = cards.map((card) => {
    if (card.id === transaction.cargo.id) {
      return transaction.cargo;
    } else {
      return card;
    }
  });

  await redis.set("card", filteredCards);

  broadcaster.emitMessage(transaction);
}
