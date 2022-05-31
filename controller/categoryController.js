const categoryService = require('../services/categoryService');

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json(category);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
module.exports = {
  createCategory,
  getAll,
};