import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";

 const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

export default store;