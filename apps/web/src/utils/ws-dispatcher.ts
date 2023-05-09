import { WsObserver } from "@/utils/ws-observer";

export type WsAction = {
  type: string;
  payload: unknown;
};

export class WsDispatcher {
  constructor(private readonly wsObserver: WsObserver) {}
  public dispatch({ type, payload }: WsAction) {
    this.wsObserver.emit(type, payload);
  }
}
