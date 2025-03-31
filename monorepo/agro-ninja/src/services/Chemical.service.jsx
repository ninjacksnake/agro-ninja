import Utils from "./Utils";
import axios from "axios";


const apiUrl = Utils.apiURl;

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
      throw error;
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

//
//
//Chemical Types
//
//

const getChemicalTypes = () => {
  const callApi = async () => {
    try {
      const ChemicalTypes = await axios.get(`${apiUrl}/chemicaltypes
      `);
      return ChemicalTypes.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}
const getChemicalTypeById = (id) => {
  const callApi = async () => {
    try {
      const chemicalType = await axios.get(`${apiUrl}/chemicaltypes/${id}`);
      return chemicalType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
}


const createChemicalType = (chemicalType) => {
  const callApi = async (chemicalType) => {
    try {
      const newChemicalType = await axios.post(
        `${apiUrl}/chemicaltypes
    `,
        chemicalType
      )
      return newChemicalType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  callApi(chemicalType);
}

const updateChemicalType = (chemicalType) => {
  const callApi = async (chemicalType) => {
    try {
      const newChemicalType = await axios.put(
        `${apiUrl}/chemicaltypes`,
        chemicalType)
      return newChemicalType.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  callApi(chemicalType);
}

const ChemicalService = {
  Chemicals: {
    findAll: getChemicals,
    findById: getChemicalById,
    createChemical,
    updateChemical,
  },
  ChemicalTypes: {
    findAll: getChemicalTypes,
    findById: getChemicalTypeById,
    createChemicalType,
    updateChemicalType,
  },
};

export default ChemicalService;
