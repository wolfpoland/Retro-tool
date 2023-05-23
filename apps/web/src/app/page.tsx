import { ColumnGrid } from "@/components/column-grid";
import { WsProvider } from "@/providers/ws";
import { StatusNavbar } from "@/components/status/status-navbar";

const titles: string[] = [
  "Timer: 5:00",
  "Current Phase: Creating Cards",
  "Next Phase: Picking Cards",
];

export default function Home() {
  return (
    <main>
      <WsProvider>
        <ColumnGrid />
        <StatusNavbar titles={titles} />
      </WsProvider>
    </main>
  );
}
