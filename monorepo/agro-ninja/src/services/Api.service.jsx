import axios from "axios";
import UpdateChemical from './../pages/chemicals/UpdateChemical';
const apiUrl = "http://localhost:3004";

const getProducts = () => {
  const callApi = async () => {
    try {
      const products = await axios.get(`${apiUrl}/products`);
      console.log(products.data);
      return products.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi();
 
};

const createProduct = (product) => {
  console.log("create products", product);
  const callApi = async (product) => {
    try {
      const products = await axios.post(`${apiUrl}/products`, product);
      return products.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi(product)
};

const updateProduct = (product) => {
  console.log("update products", product);
  const callApi = async (product) => {
    try {
      const products = await axios.put(`${apiUrl}/products`, product);
      return products.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi(product)
};

const getChemicals = () => {
  const callApi = async () => {
    try {
      const chemicals = await axios.get(`${apiUrl}/chemicals`);
      console.log(chemicals.data)
      return chemicals.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
 return callApi();
};

const createChemical = (chemical) => {
  console.log("create chemical", chemical);
  const callApi = async (product) => {
    try {
      const newChemical = await axios.post(`${apiUrl}/chemicals`, chemical);
      return newChemical.data;
    } catch (error) {
      throw (error)
    }
  };
  return callApi(chemical)
};

const updateChemical = (chemical) => {
  console.log("create chemical", chemical);
  const callApi = async (product) => {
    try {
      const updatedChemical = await axios.put(`${apiUrl}/chemicals`, chemical);
      console.log(updatedChemical);
      return updatedChemical.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi(chemical)
};

const getCategories = async () => {
  const callApi = async () => {
    try {
      const chemicals = await axios.get(`${apiUrl}/categories`);
      return chemicals.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
 return callApi();
};

const createCategory = (category) => {
  console.log("create Category", category);
  const callApi = async (product) => {
    try {
      const newCategory = await axios.post(`${apiUrl}/categorie`, category);
      return newCategory.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi(category)
};

const updateCategory = (category) => {
  console.log("create Category", category);
  const callApi = async (product) => {
    try {
      const updatedCategory = await axios.put(`${apiUrl}/categorie`, category);
      console.log(updatedCategory);
      return updatedCategory.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi(category)
};


const ApiService = {
  Products: {
    findAll: getProducts,
    createProduct,
    updateProduct,
    
  },
  Chemicals:{
    findAll: getChemicals,
     createChemical,
     UpdateChemical,
  },
  Categories: {
    findAll: getCategories,
    createCategory,
    updateCategory
  }

};

export default ApiService;
