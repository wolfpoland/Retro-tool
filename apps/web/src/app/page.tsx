import { ColumnGridComponent } from "@/components/column/column-grid";
import { WsProvider } from "@/providers/ws";
import { StatusNavbarComponent } from "@/components/status/status-navbar";

const leftStatus: string[] = ["Timer: 5:00", "Current Phase: Creating Cards"];

const rightStatus: string[] = ["Next Phase: Picking Cards"];

export default function Home() {
  return (
    <main>
      <WsProvider>
        <ColumnGridComponent />
        <StatusNavbarComponent position="LEFT" titles={leftStatus} />

        <StatusNavbarComponent position="RIGHT" titles={rightStatus} />
      </WsProvider>
    </main>
  );
}
