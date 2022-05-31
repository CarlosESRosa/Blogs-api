const generateToken = require('../utils/generateJWT');
const userService = require('../services/userService');

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    const userData = user.dataValues;

    const { password: passDB, ...userWithoutPass } = userData;
    const token = generateToken(userWithoutPass);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    const { data } = req.user;

    await userService.deleteMe(data.id);
    res.status(204).json();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteMe,
};