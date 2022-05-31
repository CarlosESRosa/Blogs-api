const jwt = require('jsonwebtoken');

const senhasecreta = process.env.JWT_SECRET;

const jwtConfig = { // HEADERS CONFIG
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, senhasecreta, jwtConfig);

  return token;
};

module.exports = generateJWT;