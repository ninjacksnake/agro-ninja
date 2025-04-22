import api from "./api";

const getCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const newCategory = await api.post(`/categories`, category);
    return newCategory.data;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (category) => {
  try {
    const response = await api.put(`/categories`, category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const CategoryService = {
  FindAll: getCategories,
  Create: createCategory,
  Update: updateCategory,
};

export default CategoryService;
