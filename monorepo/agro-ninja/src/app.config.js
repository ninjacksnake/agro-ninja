
const appConfig = {
    development:{
        apiUrl: process.env.REACT_APP_API_BASE_URL_DEVELOPMENT,
        uploadPath: '/upload',
        modules: {
            products: '/products',
            chemicals: '/chemicals',
            diseases: '/diseases',
            categories: '/categories',
            crops: '/crops'
        }

    },

    production:{
        apiUrl: process.env.REACT_APP_API_BASE_URL_PRODUCTION,
    }


};

export default appConfig;