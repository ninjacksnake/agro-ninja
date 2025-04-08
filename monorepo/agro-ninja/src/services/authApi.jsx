import axios from 'axios';
import { store } from '../features/Store';
import { setCredentials, logout } from '../features/auth/AuthSlice'
import appConfig from '../app.config';


const api = axios.create({
    baseURL: appConfig.development.apiUrl,
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessTokem;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Repsonse interceptor for token refresh
api.interceptors.response.use(res => res, async (error) => {
    const originalRequest = error.config;
    try {
        const res = await axios.post(
            'http://localhost:3001/api/refresh-token',
            {},
            { withCredentials: true }
        );

        const newToken = res.data.accessToken;
    } catch (error) {

    }
})
