import api from "../../services/api";
import { setCredentials } from "./AuthSlice";

export const register = async (userData, dispatch) => {
  try {
    const response = await api.post("/api/register", userData);
    dispatch(setCredentials({ ...response.data }));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (userData, dispatch) => {
  try {
    const response = await api.post("/api/login", userData);
    dispatch(setCredentials({...response.data }));
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const logout = async (dispatch) => {
 await api.post("/api/logout");
  dispatch({type: "auth/logout"});
}