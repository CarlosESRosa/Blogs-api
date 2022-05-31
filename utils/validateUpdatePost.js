const errorHandler = require('./errorHandler');

const validateUpdatePost = (params) => {
  const { id, title, content, userId } = params;

  if (Number(id) !== userId) throw errorHandler(401, 'Unauthorized user');

  if (!title || !content) throw errorHandler(400, 'Some required fields are missing');
};

module.exports = validateUpdatePost;