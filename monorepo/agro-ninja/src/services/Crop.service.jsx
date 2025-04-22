import api from "./api";
import UpdateChemical from "../pages/chemicals/UpdateChemical";
import appConfig from "../app.config";

//const apiUrl = Utils.cropion.apiURl;
const apiUrl = appConfig.apiUrl;

const getCrops = () => {
  const callApi = async () => {
    try {
      const crops = await api.get(`${apiUrl}/crops`);
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
      const crops = await api.get(`${apiUrl}/crops/${id}`);
      //console.log(crops.data[0]); // Agrega este log para verificar los datos de la respuesta en la consola del navegador
      return crops.data[0];
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
      const crops = await api.post(`${apiUrl}/crops`, crop);
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
      const crops = await api.put(`${apiUrl}/crops`, crop);
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
      const crops = await api.get(`${apiUrl}/croptypes`);
      return crops.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}

const CropService = {
  
    findAll: getCrops,
    findById: getCropById,
    createCrop,
    updateCrop,
  

};

export default CropService;
