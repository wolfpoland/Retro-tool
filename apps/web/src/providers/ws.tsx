"use client";
import { createContext, FC, ReactNode, useEffect, useRef } from "react";
import { Observer } from "@/utils/ws/observer";
import { Subject, takeUntil } from "rxjs";
import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { clientInterpreter } from "@/interpreter/interpreter";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { unknown } from "zod";

export type WsProps = {
  children: ReactNode;
};
export const WsObserverContext = createContext<Observer<
  Transaction<unknown>
> | null>(null);

export const WsProvider: FC<WsProps> = ({ children }): JSX.Element => {
  const wsId = useRef<string>(crypto.randomUUID());
  const ws = useRef(new WebSocket("ws://localhost:3900"));
  const destroy$ = useRef(new Subject<void>());
  const writeObserver = useRef<Observer<Transaction<unknown>>>(new Observer());

  useEffect(() => {
    ws.current.onopen = () => {
      console.log("Opened connection !");
      handleWsWrites(
        ws.current,
        writeObserver.current,
        destroy$.current,
        wsId.current
      );
    };

    ws.current.addEventListener("message", (message) => {
      handleWsReads(message, wsId.current);
    });

    ws.current.onclose = () => {};

    return () => {
      destroy$.current.next();
      writeObserver.current.destroy();
    };
  }, []);
  return (
    <>
      <Provider store={store}>
        <WsObserverContext.Provider value={writeObserver.current}>
          {children}
        </WsObserverContext.Provider>
      </Provider>
    </>
  );
};

function handleWsReads(message: MessageEvent<any>, currentWsId: string): void {
  clientInterpreter(JSON.parse(message.data), currentWsId);
}

function handleWsWrites(
  ws: WebSocket,
  wsObserve: Observer<Transaction<unknown>> | null,
  destroy$: Subject<void>,
  wsId: string
): void {
  if (!wsObserve) {
    throw new Error("Observer is not defined");
  }

  wsObserve
    .observeMessage()
    .pipe(takeUntil(destroy$))
    .subscribe((message: Transaction<unknown>) => {
      ws.send(JSON.stringify({ ...message, wsId }));
    });
}
