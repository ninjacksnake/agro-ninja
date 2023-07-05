import axios from "axios";
import Utils from "./Utils";

const apiUrl = Utils.production.apiURl;

const moduleNameUrl = "/categories"

const getCategories = () => {
  const callApi = async () => {
    try {
      const category = await axios.get(`${apiUrl}${moduleNameUrl}`);
      return category.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createCategory = (category) => {
 // console.log("create category ", category);
  const callApi = async (category) => {
    try {
      const newCategory = await axios.post(
        `${apiUrl}${moduleNameUrl}
      `,
        category
      );
      return newCategory.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(category);
};

const updateCategory = (category) => {
  
  const callApi = async (category) => {
  //  console.log("update category ")
    try {
      const newCategory = await axios.put(
        `${apiUrl}${moduleNameUrl}
      `,
        category
      );
      return newCategory.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(category);
};


const categoryService = {
    Categories: {
      FindAll: getCategories,
     Create: createCategory,
     Update: updateCategory,
    }
  
  };
  
  export default categoryService;
  