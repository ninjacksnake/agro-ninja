const appConfig = {
    development:{
        apiUrl: 'http://localhost:3004/api',
        uploadPath: '/upload',
        modules: {
            products: '/products',
            chemicals: '/chemicals',
            diceases: '/diceases',
            categories: '/categories',
            crops: '/crops'
        }

    },

    production:{
        apiUrl: 'https://agro-ninja.herokuapp.com/api',
    }


};

export default appConfig;