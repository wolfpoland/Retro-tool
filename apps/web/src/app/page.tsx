import { ColumnGrid } from "@/components/column-grid";
import { WsProvider } from "@/providers/ws";

export default function Home() {
  return (
    <main>
      <WsProvider>
        <ColumnGrid />
      </WsProvider>
    </main>
  );
}
