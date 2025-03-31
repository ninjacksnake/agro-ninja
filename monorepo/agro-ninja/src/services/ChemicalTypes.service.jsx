import axios from 'axios';

import Utils from "./Utils";

const API_URL = Utils.apiURl;
class ChemicalTypesService {
  getChemicalTypes() {
    return axios.get(`${API_URL}/chemical-types`);
  }

  getChemicalTypeById(id) {
    return axios.get(`${API_URL}/chemical-types/${id}`);
  }

  createChemicalType(data) {
    return axios.post(`${API_URL}/chemical-types`, data);
  }

  updateChemicalType(id, data) {
    return axios.put(`${API_URL}/chemical-types/${id}`, data);
  }

  deleteChemicalType(id) {
    return axios.delete(`${API_URL}/chemical-types/${id}`);
  }
}

const ChemicalTypesService = {
    Chemicals: {
      findAll: getChemicals,
      findById: getChemicalById,
      createChemical,
      updateChemical,
    },
  };

export default new ChemicalTypesService();
