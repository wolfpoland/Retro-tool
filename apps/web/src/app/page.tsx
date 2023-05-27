import { ColumnGridComponent } from "@/components/column/column-grid";
import { WsProvider } from "@/providers/ws";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { redisConnector } from "@/redis-connector";
import { Card } from "../../../../packages/types/card";

const getCards = async (): Promise<Array<Card> | null> => {
  return await redisConnector.get<Array<Card>>("card");
};

export default async function Home() {
  const cards = await getCards();

  return (
    <main>
      {/*<WsProvider>*/}
      {/*  <ColumnGridComponent cards={cards ?? []} />*/}
      {/*  <StatusNavbarComponent position="LEFT" titles={leftStatus} />*/}

      {/*  <StatusNavbarComponent position="RIGHT" titles={rightStatus} />*/}
      {/*</WsProvider>*/}
    </main>
  );
}
