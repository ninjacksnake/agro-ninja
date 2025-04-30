import api from "./api";
import appConfig from "../app.config";

const apiUrl = appConfig.apiUrl;

/**
 * Fetches all crops from the API
 * @returns {Promise<Array>} Array of crops
 */
const findAll = async () => {
  try {
    const response = await api.get(`${apiUrl}/crops`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
};

/**
 * Fetches a crop by its ID
 * @param {string|number} id - The crop ID
 * @returns {Promise<Object>} Crop data
 */
const findById = async (id) => {
  try {
    const response = await api.get(`${apiUrl}/crops/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error fetching crop ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new crop
 * @param {Object} crop - The crop data
 * @returns {Promise<Object>} Created crop data
 */
const createCrop = async (crop) => {
  try {
    const response = await api.post(`${apiUrl}/crops`, crop);
    return response.data;
  } catch (error) {
    console.error('Error creating crop:', error);
    throw error;
  }
};

/**
 * Updates an existing crop
 * @param {string|number} id - The crop ID
 * @param {Object} crop - The updated crop data
 * @returns {Promise<Object>} Updated crop data
 */
const updateCrop = async (id, crop) => {
  try {
    const response = await api.put(`${apiUrl}/crops/${id}`, crop);
    return response.data;
  } catch (error) {
    console.error(`Error updating crop ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches all crop types
 * @returns {Promise<Array>} Array of crop types
 */
const getCropTypes = async () => {
  try {
    const response = await api.get(`${apiUrl}/croptypes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crop types:', error);
    throw error;
  }
};

const CropService = {
  findAll,
  findById,
  createCrop,
  updateCrop,
  getCropTypes
};

export default CropService;
