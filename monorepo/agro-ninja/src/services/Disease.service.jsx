import appConfig from "../app.config";
import api from "./api";





const getDiseases = () => {
  const callApi = async () => {
    try {
      const disease = await api.get(`/diseases`);
      //  console.log(disease.data);
      return disease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};
const getDiseaseById = (id) => {
  const callApi = async () => {
    try {
      const disease = await api.get(`/categories/diseases/${id}`);
      return disease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createDisease = (disease) => {
  const callApi = async (disease) => {
    try {
      const newDisease = await api.post(
        `/categories/diseases
      `,
        disease
      );
      return newDisease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(disease);
};

const updateDisease = (disease) => {
  const callApi = async (disease) => {
    //  console.log("update disease ")
    try {
      const updatedDisease = await api.put(
        `/categories/diseases
      `,
        disease
      );
      return updatedDisease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(disease);
};

const DiseaseService = {
  
    findAll: getDiseases,
    findById: getDiseaseById,
    create: createDisease,
    update: updateDisease,

};

export default DiseaseService;
