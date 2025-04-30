const ChemicalTypes = require('../models/index').ChemicalTypes;
const Product = require('../models/index').Product;
const DEFAULT_INCLUDES = [
 
  {
    model: Product,
    as: 'Products',
  }
];

const chemicalTypeController = {
  // Create a new chemical type
  create: async (req, res) => {
    try {
      const newChemicalType = await ChemicalTypes.create(req.body);
      res.status(201).json(newChemicalType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all chemical types
  getAll: async (req, res) => {
    try {
      const chemicalTypes = await ChemicalTypes.findAll({include: DEFAULT_INCLUDES});
      res.status(200).json(chemicalTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single chemical type by ID
  getById: async (req, res) => {
    try {
      const chemicalType = await ChemicalTypes.findByPk(req.params.id, {include: DEFAULT_INCLUDES});
      if (!chemicalType) {
        return res.status(404).json({ message: 'Chemical type not found' });
      }
      res.status(200).json(chemicalType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a chemical type
  update: async (req, res) => {
    try {
      const [updated] = await ChemicalTypes.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) {
        return res.status(404).json({ message: 'Chemical type not found' });
      }
      const updatedChemicalType = await ChemicalTypes.findByPk(req.params.id, {include: DEFAULT_INCLUDES});
      res.status(200).json(updatedChemicalType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a chemical type
  delete: async (req, res) => {
    try {
      const deleted = await ChemicalTypes.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Chemical type not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = chemicalTypeController;
