const { Category } = require('../database/models');
const errorHandler = require('../utils/errorHandler');

const createCategory = async (body) => {
  if (!body.name) throw errorHandler(400, '"name" is required'); 

  const category = await Category.create(body);
  
  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();
  
  return categories;
};

module.exports = {
  createCategory,
  getAll,
};