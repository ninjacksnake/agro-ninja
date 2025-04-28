import api from './api';

class ChemicalTypesService {
  getAll = async () => {
    try {
      const response = await api.get('/chemicaltypes');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id) => {
    try {
      const response = await api.get(`/chemicaltypes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  create = async (data) => {
    try {
      const response = await api.post('/chemicaltypes', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await api.put(`/chemicaltypes/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await api.delete(`/chemicaltypes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new ChemicalTypesService();
