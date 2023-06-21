import axios from "axios";

const apiUrl = "http://localhost:3004";

const getDiceases = () => {
  const callApi = async () => {
    try {
      const dicease = await axios.get(`${apiUrl}/diceases
      `);
    //  console.log(dicease.data);
      return dicease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};
const getDiceaseById = (id) => {
  const callApi = async () => {
    try {
      const dicease = await axios.get(`${apiUrl}/diceases/${id}`);
      return dicease.data;
    } catch (error) {
      console.log(error);
      throw (error)
    }
  };
  return callApi();
};

const createDicease = (dicease) => {
   const callApi = async (dicease) => {
    try {
      const newdicease = await axios.post(
        `${apiUrl}/diceases
      `,
        dicease
      );
      return newdicease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(dicease);
};

const updateDicease = (dicease) => {
  const callApi = async (dicease) => {
  //  console.log("update dicease ")
    try {
      const updatedDicease = await axios.put(
        `${apiUrl}/diceases
      `,
        dicease
      );
      return updatedDicease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(dicease);
};


const DiceaseService = {
    diceases: {
      findAll: getDiceases,
      findById: getDiceaseById,
      create: createDicease,
      update: updateDicease,
    }
  
  };
  
  export default DiceaseService;
  