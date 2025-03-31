import axios from "axios";
import Utils from "./Utils";

const apiUrl = Utils.apiURl;
console.log(apiUrl);

const getDiseases = () => {
  const callApi = async () => {
    try {
      const disease = await axios.get(`${apiUrl}/diseases
      `);
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
      const disease = await axios.get(`${apiUrl}/diseases/${id}`);
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
      const newDisease = await axios.post(
        `${apiUrl}/diseases
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
      const updatedDisease = await axios.put(
        `${apiUrl}/diseases
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
  diseases: {
    findAll: getDiseases,
    findById: getDiseaseById,
    create: createDisease,
    update: updateDisease,
  },
};

export default DiseaseService;
