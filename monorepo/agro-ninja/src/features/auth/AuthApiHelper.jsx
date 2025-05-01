import api from "../../services/api";
import { setCredentials } from "./AuthSlice";

export const register = async (userData, dispatch) => {
  try {
    const response = await api.post("/api/register", userData);
    const data = response.data;
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(setCredentials({ ...data }));
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (userData, dispatch) => {
  try {
    const response = await api.post("/api/login", userData);
    const data = response.data;
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(setCredentials({ ...data }));
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export const logout = async (dispatch) => {
  try {
    await api.post("/api/logout");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: "auth/logout"});
  } catch (error) {
    // Still clear local storage and redux state even if logout API fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({type: "auth/logout"});
  }
}