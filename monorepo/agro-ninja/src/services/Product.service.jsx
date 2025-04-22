import api from "./api";

const getProducts = async () => {
    try {
      const response = await api.get(`/products`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };



const getProductById = (id) => {
  const callApi = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };
  return callApi();
};

const createProduct = (product) => {
 
  const callApi = async (product) => {
    try {
      const response = await api.post(`/products`, product);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return callApi(product);
};

const updateProduct = (product) => {
  const callApi = async (product) => {
    try {
      const response = await api.put(` /products`, product);
      return response.data;
    } catch (error) {   
      throw error;
    }
  };
  return callApi(product);
};

const ProductService = {
 
    findAll: getProducts,
    findById: getProductById,
    createProduct,
    updateProduct,

};

export default ProductService;
