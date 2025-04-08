import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    user: null,
    accessToken: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const {user, accessToken} = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        logout: (state)=>{
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const {setCredentials, logout} = AuthSlice.actions;
export default AuthSlice.reducer;