import axios from "axios";
import Utils from "./Utils";

const apiUrl = Utils.production.apiURl;

const getChemicals = () => {
  const callApi = async () => {
    try {
      const Chemical = await axios.get(`${apiUrl}/chemicals
      `);
      return Chemical.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const getChemicalById = (id) => {
  const callApi = async () => {
    try {
      const chemical = await axios.get(`${apiUrl}/chemicals/${id}`);
      return chemical.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi();
};


const createChemical = (chemical) => {
  const callApi = async (chemical) => {
    try {
      const newChemical = await axios.post(
        `${apiUrl}/chemicals
      `,
        chemical
      );
      return newChemical.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(chemical);
};

const updateChemical = (chemical) => {
  
  const callApi = async (chemical) => {
 //  console.log("update Chemical ")
    try {
      const newChemical = await axios.put(
        `${apiUrl}/chemicals
      `,
        chemical
      );
      return newChemical.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(chemical);
};


const ChemicalService = {
    Chemicals: {
      findAll: getChemicals,
      findById: getChemicalById,
      createChemical,
      updateChemical,
    }
  
  };
  
  export default ChemicalService;
  