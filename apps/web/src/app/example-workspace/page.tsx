import { WsProvider } from "@/providers/ws";
import { ColumnGridComponent } from "@/components/column/column-grid";
import { StatusNavbarComponent } from "@/components/status/status-navbar";
import { Card } from "../../../../../packages/types/card";
import { redisConnector } from "@/redis-connector";

const leftStatus: string[] = ["Timer: 5:00", "Current Phase: Creating Cards"];

const rightStatus: string[] = ["Next Phase: Picking Cards"];

const getCards = async (): Promise<Array<Card> | null> => {
  return await redisConnector.get<Array<Card>>("card");
};

export default async function ExampleWorkspace() {
  const cards = await getCards();

  return (
    <>
      <WsProvider>
        <ColumnGridComponent cards={cards ?? []} />
        <StatusNavbarComponent position="LEFT" titles={leftStatus} />

        <StatusNavbarComponent position="RIGHT" titles={rightStatus} />
      </WsProvider>
    </>
  );
}
