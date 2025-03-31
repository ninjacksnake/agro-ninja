import axios from "axios";
import UpdateChemical from "../pages/chemicals/UpdateChemical";
import appConfig from "../app.config";

//const apiUrl = Utils.cropion.apiURl;
const apiUrl = appConfig.development.apiUrl;

const getCrops = () => {
  const callApi = async () => {
    try {
      const crops = await axios.get(`${apiUrl}/crops`);
      //  console.log(crops.data);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const getCropById = (id) => {
  const callApi = async () => {
    try {
      const crops = await axios.get(`${apiUrl}/crops/${id}`);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createCrop = (crop) => {
 
  const callApi = async (crop) => {
    try {
      const crops = await axios.post(`${apiUrl}/crops`, crop);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(crop);
};

const updateCrop = (crop) => {
  const callApi = async (crop) => {
    try {
      const crops = await axios.put(`${apiUrl}/crops`, crop);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(crop);
};


const getCropTypes = () => {
  const callApi = async () => {
    try {
      const crops = await axios.get(`${apiUrl}/croptypes`);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}

const CropService = {
  Crops: {
    findAll: getCrops,
    findById: getCropById,
    createCrop,
    updateCrop,
  },

};

export default CropService;
