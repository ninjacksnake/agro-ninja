export const categories = [
  { id: 1, name: 'Fruits' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Grains' },
  { id: 4, name: 'Legumes' }
];

export const chemicals = [
  { id: 1, name: 'Glyphosate', typeId: 1 },
  { id: 2, name: 'Atrazine', typeId: 1 },
  { id: 3, name: 'Chlorpyrifos', typeId: 2 },
  { id: 4, name: 'Malathion', typeId: 2 }
];

export const chemicalTypes = [
  { id: 1, name: 'Herbicide' },
  { id: 2, name: 'Insecticide' },
  { id: 3, name: 'Fungicide' }
];

export const diseases = [
  { id: 1, name: 'Powdery Mildew', typeId: 1 },
  { id: 2, name: 'Leaf Rust', typeId: 1 },
  { id: 3, name: 'Root Rot', typeId: 2 },
  { id: 4, name: 'Bacterial Blight', typeId: 3 }
];

export const diseaseTypes = [
  { id: 1, name: 'Fungal' },
  { id: 2, name: 'Soil-borne' },
  { id: 3, name: 'Bacterial' },
  { id: 4, name: 'Viral' }
];

export const products = [
  { id: 1, name: 'Apple', categoryId: 1, typeId: 1 },
  { id: 2, name: 'Tomato', categoryId: 2, typeId: 2 },
  { id: 3, name: 'Rice', categoryId: 3, typeId: 3 },
  { id: 4, name: 'Soybean', categoryId: 4, typeId: 4 }
];

export const productTypes = [
  { id: 1, name: 'Tree Fruit' },
  { id: 2, name: 'Vine Crop' },
  { id: 3, name: 'Cereal' },
  { id: 4, name: 'Pulse' }
];

export const crops = [
  { id: 1, name: 'Corn', typeId: 1 },
  { id: 2, name: 'Wheat', typeId: 2 },
  { id: 3, name: 'Cotton', typeId: 3 },
  { id: 4, name: 'Sugarcane', typeId: 4 }
];

export const cropTypes = [
  { id: 1, name: 'Row Crop' },
  { id: 2, name: 'Small Grain' },
  { id: 3, name: 'Fiber Crop' },
  { id: 4, name: 'Industrial Crop' }
];
