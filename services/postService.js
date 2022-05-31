const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const validatePost = require('../utils/validatePost');
const errorHandler = require('../utils/errorHandler');
const validateUpdatePost = require('../utils/validateUpdatePost');

const createPost = async (title, content, id, categoryIds) => {
  const existentCategories = await Category.findAll();

  const allCaregories = existentCategories.map((element) => element.dataValues.id);
  const params = { title, content, categoryIds, allCaregories };

  validatePost(params);

  const post = await BlogPost.create({ title, content, userId: id });

  const promises = categoryIds.map((category) => (
    PostCategory.create({ postId: post.id, categoryId: category })
  ));
  await Promise.all(promises);

  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' }],
  });

  return posts;
};

const getById = async (id) => {
  const postById = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' }],
  });

  if (!postById) throw errorHandler(404, 'Post does not exist');
  return postById;
};

const update = async (id, title, content, userId) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ] },
    );

  const params = { id, title, content, userId };
  validateUpdatePost(params);

  const updatedPost = await getById(id);
  return updatedPost;
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) throw errorHandler(404, 'Post does not exist');
  if (post.dataValues.userId !== userId) throw errorHandler(401, 'Unauthorized user');
  await BlogPost.destroy({ where: { id } });
};

const searchPost = async (query) => {
  // fonte: https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize
  // const { Op } = Sequelize;

  const postBytitle = await BlogPost.findAll({
    where: { title: { [Sequelize.Op.like]: `%${query}%` } },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' }],
    });
    console.log(Sequelize.Op.like);
    const postByContent = await BlogPost.findAll({
      where: { content: { [Sequelize.Op.like]: `%${query}%` } },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
      });
      
  if (postBytitle.length !== 0) return postBytitle;
  if (postByContent.length !== 0) return postByContent;
  
  return [];
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  deletePost,
  searchPost,
};