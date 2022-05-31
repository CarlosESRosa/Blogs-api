// const generateToken = require('../utils/generateJWT');
const postService = require('../services/postService');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user.data;
    const post = await postService.createPost(title, content, id, categoryIds);
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const post = await postService.getAll();
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postById = await postService.getById(id);
    res.status(200).json(postById);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { data } = req.user;
    const updatedPost = await postService.update(id, title, content, data.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.user;

    await postService.deletePost(id, data.id);
    res.status(204).json();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const searchPost = async (req, res, next) => {
  try {
    const { q } = req.query;
    const post = await postService.searchPost(q);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  deletePost,
  searchPost,
};