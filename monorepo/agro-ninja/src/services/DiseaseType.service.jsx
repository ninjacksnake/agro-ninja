import api from "./api";

const findAll = () => {
  const callApi = async () => {
    try {
      const diseaseTypes = await api.get(`/diseasetypes`);
      return diseaseTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const findById = (id) => {
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

const create = (disease) => {
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

const update = (disease) => {
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
    findAll,
    findById,
    create,
    update
};

export default DiseaseTypeService;
