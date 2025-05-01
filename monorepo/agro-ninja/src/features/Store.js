import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "./auth/AuthSlice";

// First create the store
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Then initialize the persisted state
const persistedToken = localStorage.getItem('token');
const persistedUser = localStorage.getItem('user');

if (persistedToken && persistedUser) {
    store.dispatch(setCredentials({
        accessToken: persistedToken,
        user: JSON.parse(persistedUser)
    }));
}

export default store;