import axios from "axios";
import appConfig from "../app.config";

//const apiUrl = Utils.cropion.apiURl;
const apiUrl = appConfig.development.apiUrl;


const getCropTypeById = (id) => {
  const callApi = async () => {
    try {
      const cropTypes = await axios.get(`${apiUrl}/croptype/${id}`);
      return cropTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createCropType = (cropType) => {
 
  const callApi = async (cropType) => {
    try {
      const cropType = await axios.post(`${apiUrl}/croptype`, cropType);
      return cropType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(cropType);
};

const updateCropType = (cropType) => {
  const callApi = async (cropType) => {
    try {
      const cropType = await axios.put(`${apiUrl}/croptype`, cropType);
      return cropType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(cropType);
};


const getCropTypes = () => {
  const callApi = async () => {
    try {
      const cropTypes = await axios.get(`${apiUrl}/croptype`);
      return cropTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}

const CropTypeService = {
  Crops: {
    findAll: getCropTypes,
    findById: getCropTypeById,
    createCrop: createCropType,
    updateCrop: updateCropType,
  },

};

export default CropTypeService;
