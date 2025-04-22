import {createSlice} from "@reduxjs/toolkit";

const getDataFromLocalStorage = (key) => {
  try {
      const localStorageItem = JSON.parse(localStorage.getItem(key));
      console.log('localStorageItem is ', localStorageItem);
      return localStorageItem ? JSON.parse(localStorage.getItem(key)) : null;
  } catch (error) {
    console.error('Error getting data from local storage:', error);
    return null;
  }
}

const initialState = {
    user: getDataFromLocalStorage('user'),
    accessToken: getDataFromLocalStorage('accessToken'),
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
         
            const {user, accessToken} = action.payload;
           // console.log('user and accessToken is ', user, accessToken);
            if (!user || !accessToken) {
               console.log('user or accessToken is null', user, accessToken);
            }
            state.user = user;
            state.accessToken = accessToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        },
        logout: (state)=>{
            state.user = null;
            state.accessToken = null;
             localStorage.removeItem('user');
             localStorage.removeItem('accessToken');
        },
    },
});

export const {setCredentials, logout} = AuthSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectIsauthenticated = (state) => state.auth.user !== null;
// export const selectCurrentUser = (state) => state.auth.user;

export default AuthSlice.reducer;