import api from "./api";
import appConfig from "../app.config";

//const apiUrl = Utils.cropion.apiURl;
const apiUrl = appConfig.apiUrl;


const getCropTypeById = (id) => {
  const callApi = async () => {
    try {
      const cropTypes = await api.get(`${apiUrl}/croptype/${id}`);
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
      const cropType = await api.post(`${apiUrl}/croptype`, cropType);
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
      const cropType = await api.put(`${apiUrl}/croptype`, cropType);
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
      const cropTypes = await api.get(`${apiUrl}/croptype`);
      return cropTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}

const CropTypeService = {
   
    findAll: getCropTypes,
    findById: getCropTypeById,
    createCropType,
    updateCropType,
  

};

export default CropTypeService;
