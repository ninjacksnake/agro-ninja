import axios from "axios";

const apiUrl = "http://localhost:3004";

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

const createChemical = (chemical) => {
  console.log("create Chemical ", chemical);
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
    console.log("update Chemical ")
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
      createChemical,
      updateChemical,
    }
  
  };
  
  export default ChemicalService;
  