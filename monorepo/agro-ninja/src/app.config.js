
const  appConfig = {
    apiUrl: process.env.REACT_APP_API_BASE_URL_DEVELOPMENT,
    authenticationEndpoint: '/auth  ',
    uploadPath: '/upload',
    modules: {
        products: '/products',
        chemicals: '/chemicals',
        diseases: '/diseases',
        categories: '/categories',
        crops: '/crops'
    }
};

export default appConfig;