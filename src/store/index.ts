import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersReducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;