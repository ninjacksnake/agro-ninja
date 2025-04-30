import api from "./api";

class CropTypeService {
  async getAll() {
    try {
      const response = await api.get('/croptype');
      return response.data;
      console.log(response.data)
    } catch (error) {
      throw new Error(`Failed to fetch crop types: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`/croptype/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch crop type with id ${id}: ${error.message}`);
    }
  }

  async create(cropType) {
    try {
      const response = await api.post('/croptype', cropType);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create crop type: ${error.message}`);
    }
  }

  async update(id, cropType) {
    try {
      const response = await api.put(`/croptype/${id}`, cropType);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update crop type with id ${id}: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`/croptype/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete crop type with id ${id}: ${error.message}`);
    }
  }
}

export default new CropTypeService();
