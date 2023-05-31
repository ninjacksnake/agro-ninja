import axios from "axios";

const apiUrl = "http://localhost:3004";

const getDeceases = () => {
  const callApi = async () => {
    try {
      const Decease = await axios.get(`${apiUrl}/deceases
      `);
      console.log(Decease.data);
      return Decease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi();
};

const createDecease = (decease) => {
  console.log("create Decease ", decease);
  const callApi = async (decease) => {
    try {
      const newDecease = await axios.post(
        `${apiUrl}/deceases
      `,
        decease
      );
      return newDecease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(decease);
};

const updateDecease = (decease) => {
  
  const callApi = async (decease) => {
    console.log("update Decease ")
    try {
      const newDecease = await axios.put(
        `${apiUrl}/deceases
      `,
        decease
      );
      return newDecease.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return callApi(decease);
};


const ApiService = {
    Deceases: {
      findAll: getDeceases,
      createDecease,
      updateDecease,
    }
  
  };
  
  export default ApiService;
  