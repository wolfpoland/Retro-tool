"use client";
import { createContext, FC, ReactNode, useEffect, useRef } from "react";
import { Observer } from "@/utils/ws/observer";
import { Subject, takeUntil } from "rxjs";
import { Transaction } from "../../../../packages/types/transaction";
import { Card } from "../../../../packages/types/card";
import { clientInterpreter } from "@/interpreter/interpreter";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export type WsProps = {
  children: ReactNode;
};
export const WsObserverContext = createContext<Observer<
  Transaction<Card>
> | null>(null);

export const WsProvider: FC<WsProps> = ({ children }): JSX.Element => {
  const ws = useRef(new WebSocket("ws://localhost:3900"));
  const destroy$ = useRef(new Subject<void>());
  const writeObserver = useRef<Observer<Transaction<Card>>>(new Observer());

  useEffect(() => {
    ws.current.onopen = () => {
      console.log("Opened connection !");
      handleWsWrites(ws.current, writeObserver.current, destroy$.current);
    };

    ws.current.addEventListener("message", (message) => {
      clientInterpreter(JSON.parse(message.data));
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

function handleWsReads(ws: WebSocket): void {}

function handleWsWrites(
  ws: WebSocket,
  wsObserve: Observer<Transaction<Card>> | null,
  destroy$: Subject<void>
): void {
  if (!wsObserve) {
    throw new Error("Observer is not defined");
  }

  wsObserve
    .observeMessage()
    .pipe(takeUntil(destroy$))
    .subscribe((message: Transaction<Card>) => {
      ws.send(JSON.stringify(message));
    });
}
