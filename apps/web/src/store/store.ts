import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { cardReducer } from "@/store/reducers/card.reducer";

export const store = configureStore({
  reducer: {
    cardState: cardReducer,
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
