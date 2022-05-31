const errorHandler = require('./errorHandler');

const validateCategory = (allCategories, categoryIds) => {
  const result = categoryIds.find((element) => !allCategories.includes(element));
  if (result !== undefined) throw errorHandler(400, '"categoryIds" not found');
};

const validatePost = (params) => {
  const { title, content, categoryIds, allCaregories } = params;
  if (!title || !content) { 
    throw errorHandler(400, 'Some required fields are missing');
  }
  if (!categoryIds || categoryIds.length === 0) {
    throw errorHandler(400, '"categoryIds" not found');
  }

  validateCategory(allCaregories, categoryIds);
};

module.exports = validatePost;