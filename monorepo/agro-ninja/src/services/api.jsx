import axios from 'axios';
import store from '../features/Store';
import { setCredentials, logout } from '../features/auth/AuthSlice'
import appConfig from '../app.config';


const api = axios.create({
    baseURL: appConfig.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    //console.log({token});
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['Access-Control-Allow-Credentials'] = true;
    return config;
}, error => {
    return Promise.reject(error);
});

// Repsonse interceptor for token refresh
api.interceptors.response.use(res => res, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const res = await axios.post(
                `${appConfig.apiUrl}/refresh-token`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            );

            const newToken = res.data.accessToken;
            store.dispatch(setCredentials({
                accessToken: newToken,
                user: res.data.user
            }));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (error) {
            store.dispatch(logout());
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);

}

)
export default api;