import { observable } from "@legendapp/state";

type WsStoreState = {
  cards: Array<string>;
};

const obs = observable<WsStoreState>({ cards: [] });
