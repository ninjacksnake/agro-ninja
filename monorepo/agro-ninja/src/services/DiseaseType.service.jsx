import axios from "axios";
import Utils from "./Utils";

const apiUrl = Utils.apiURl;
console.log(apiUrl);

const getdiseaseTypes = () => {
  const callApi = async () => {
    try {
      const diseaseTypes = await axios.get(`${apiUrl}/diseasetypes
      `);
        console.log(diseaseTypes.data);
      return diseaseTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};
const getdiseaseTypeById = (id) => {
  const callApi = async () => {
    try {
      const disease = await axios.get(`${apiUrl}/diseasetypes/${id}`);
      return disease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const creatediseaseType = (disease) => {
  const callApi = async (disease) => {
    try {
      const newdisease = await axios.post(
        `${apiUrl}/diseaseTypes
      `,
        disease
      );
      return newdisease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(disease);
};

const updatediseaseType = (disease) => {
  const callApi = async (disease) => {
    //  console.log("update disease ")
    try {
      const updateddisease = await axios.put(
        `${apiUrl}/diseaseTypes
      `,
        disease
      );
      return updateddisease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(disease);
};

const DiseaseTypeService = {
  diseaseTypes: {
    findAll: getdiseaseTypes,
    findById: getdiseaseTypeById,
    create: creatediseaseType,
    update: updatediseaseType,
  },
};

export default DiseaseTypeService;
