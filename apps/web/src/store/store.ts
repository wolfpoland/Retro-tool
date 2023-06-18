import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { columnReducer } from "@/store/reducers/column.reducer";
import { workspaceReducer } from "@/store/reducers/wokrspace.reducer";
import { workspaceApi } from "@/store/api/workspace.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    columnState: columnReducer,
    workspaceState: workspaceReducer,
    // [workspaceApi.reducerPath]: workspaceApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(workspaceApi.middleware),
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
