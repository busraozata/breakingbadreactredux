import { configureStore } from "@reduxjs/toolkit";
import quotesSlice from "./quotesSlice";

import characterSlice from "./characterSlice";
export const store = configureStore({
  reducer: {
    characters: characterSlice,
    quotes: quotesSlice,
  },
});
