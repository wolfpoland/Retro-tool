import { listenerMiddleware } from "@/store/store";
import { addingPreviewSuccessAction } from "@/store/actions/column.action";

export function columnsChangedEffect() {
  return listenerMiddleware.startListening({
    actionCreator: addingPreviewSuccessAction,
    effect: (action) => {},
  });
}
