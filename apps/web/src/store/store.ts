import {
  Action,
  configureStore,
  createListenerMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { columnReducer } from "@/store/reducers/column/column.reducer";
import { workspaceReducer } from "@/store/reducers/wokrspace.reducer";
import { workspaceApi } from "@/store/api/workspace.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { actionPlanReducer } from "@/store/reducers/action-plan.reducer";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    columnState: columnReducer,
    workspaceState: workspaceReducer,
    actionPlanState: actionPlanReducer,
    // [workspaceApi.reducerPath]: workspaceApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(workspaceApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
