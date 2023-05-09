import { createStore, StoreApi } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";

type WsApi = {
  status: "initial" | "open" | "closed" | "error";
  messagesToSynchronize: string[];
};

export const WsStore: StoreApi<WsApi> = createStore(
  (setState, getState, store) => ({
    status: "initial",
    messagesToSynchronize: [],
    addMessageToSynchronize: setState((state) => ({})),
  })
);
