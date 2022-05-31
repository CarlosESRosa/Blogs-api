const { User } = require('../database/models');
const validateUser = require('../utils/validateUser');
const errorHandler = require('../utils/errorHandler');

const createUser = async (body) => {
  validateUser(body);
  const { email } = body;
  const existentUser = await User.findOne({ where: { email } });
  if (existentUser) throw errorHandler(409, 'User already registered');

  const user = await User.create(body);

  return user;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) throw errorHandler(404, 'User does not exist');

  return user;
};

const deleteMe = async (myId) => {
  await User.destroy({ where: { id: myId } });
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteMe,
};