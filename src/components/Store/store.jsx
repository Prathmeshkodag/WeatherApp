import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../CreateSlice/createSlice";

// Create Redux Store
export const store = configureStore({
  reducer: {
    weatherData: weatherReducer, 
  },
});
