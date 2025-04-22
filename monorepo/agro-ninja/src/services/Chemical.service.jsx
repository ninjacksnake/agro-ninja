
import api from "./api";

const getChemicals = async () => {

  try {
    const Chemical = await api.get(`/chemicals`);
    return Chemical.data;
  } catch (error) {

    throw error;
  }


};

const getChemicalById = async (id) => {

  try {
    const chemical = await api.get(`/chemicals/${id}`);
    return chemical.data;
  } catch (error) {

    throw error;
  }

};

const createChemical = async (chemical) => {

  try {
    const newChemical = await api.post(`/chemicals`, chemical);
    return newChemical.data;
  } catch (error) {

    throw error;
  }

};

const updateChemical = async (chemical) => {

  try {
    const newChemical = await api.put(`/chemical`, chemical);
    return newChemical.data;
  } catch (error) {

    throw error;
  }
};

const ChemicalService = {

    findAll: getChemicals,
    findById: getChemicalById,
    createChemical,
    updateChemical,


};

export default ChemicalService;
