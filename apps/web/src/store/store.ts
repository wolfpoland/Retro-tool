import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { workspaceReducer } from "@/store/reducers/workspace.reducer";

export const store = configureStore({
  reducer: {
    workspaceState: workspaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
