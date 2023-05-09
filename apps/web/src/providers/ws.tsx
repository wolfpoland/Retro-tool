"use client";
import { FC, ReactNode, useEffect, useRef } from "react";
import { WsStore } from "@/store/ws-store";

export type WsProps = {
  children: ReactNode;
};

export const WsProvider: FC<WsProps> = ({ children }): JSX.Element => {
  const ws = useRef(new WebSocket("ws://localhost:3900"));

  useEffect(() => {
    let storeDestroy: Function | null = null;

    ws.current.onopen = () => {
      console.log("open");
      WsStore.setState({ status: "open" });
      handleWsReads(ws.current);
      storeDestroy = handleWsWrites(ws.current);
    };

    ws.current.onclose = () => {
      WsStore.setState({ status: "closed" });
    };

    return () => {
      storeDestroy && storeDestroy();
    };
  }, []);
  return <>{children}</>;
};

function handleWsReads(ws: WebSocket): void {}

function handleWsWrites(ws: WebSocket): Function {
  // użuyc tu observera i skonczyc z tym absurdem
  return WsStore.subscribe((state, prevState) => {
    console.log("handleWsWrites", state, prevState);
    if (state.messagesToSynchronize !== prevState.messagesToSynchronize) {
      console.log("before send");
      ws.send(JSON.stringify(state.messagesToSynchronize));
    }
  });
}
