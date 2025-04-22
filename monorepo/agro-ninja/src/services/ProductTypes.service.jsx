import api from "./api";
import Utils from "./Utils";

//const apiUrl = Utils.production.apiURl;
const apiUrl = Utils.apiURl;

const getProductTypes = () => {
  const callApi = async () => {
    try {
      const productType = await api.get(`${apiUrl}/productType`);
        console.log(productType.data);
      return productType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const getProductTypeById = (id) => {
  const callApi = async () => {
    try {
      const productType = await api.get(`${apiUrl}/productType/${id}`);
      console.log(productType.data);
      return productType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createProductType = (productType) => {
  const callApi = async (productType) => {
    try {
      const productType = await api.post(`${apiUrl}/productType`, productType);
      return productType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(productType);
};

const updateProductType = (productType) => {
  const callApi = async (productType) => {
    try {
      const productType = await api.put(`${apiUrl}/productType`, productType);
      return productType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(productType);
};




const ProductService = {
 
    findAll: getProductTypes,
    findById: getProductTypeById,
    createProductType,
    updateProductType,


};

export default ProductService;
