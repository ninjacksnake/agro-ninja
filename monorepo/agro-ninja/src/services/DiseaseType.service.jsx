import api from "./api";

const getdiseaseTypes = () => {
  const callApi = async () => {
    try {
      const diseaseTypes = await api.get(`/diseasetypes
      `);
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
      const disease = await api.get(`/diseasetypes/${id}`);
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
      const newdisease = await api.post(
        `/categories/diseaseTypes
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
      const updateddisease = await api.put(
        `/diseaseTypes
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
 
    findAll: getdiseaseTypes,
    findById: getdiseaseTypeById,
    create: creatediseaseType,
    update: updatediseaseType,
 
};

export default DiseaseTypeService;
