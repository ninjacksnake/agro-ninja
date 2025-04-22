import api from './api';

import Utils from "./Utils";

const API_URL = Utils.apiURl;
class ChemicalTypesService {
  getChemicalTypes() {
    return api.get(`${API_URL}/chemical-types`);
  }

  getChemicalTypeById(id) {
    return api.get(`${API_URL}/chemical-types/${id}`);
  }

  createChemicalType(data) {
    return api.post(`${API_URL}/chemical-types`, data);
  }

  updateChemicalType(id, data) {
    return api.put(`${API_URL}/chemical-types/${id}`, data);
  }

  deleteChemicalType(id) {
    return api.delete(`${API_URL}/chemical-types/${id}`);
  }
}

// const ChemicalTypesService = {
    
//       findAll: getChemicals,
//       findById: getChemicalById,
//       createChemical,
//       updateChemical,

//   };

export default new ChemicalTypesService();
