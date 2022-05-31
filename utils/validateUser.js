const errorHandler = require('./errorHandler');

const validateEmail = (email) => {
  if (!email || !email.includes('@')) throw errorHandler(400, '"email" must be a valid email');
};

const validateUser = (body) => {
  const { displayName, email, password } = body;

  if (!displayName || displayName.length < 8) { 
    throw errorHandler(400, '"displayName" length must be at least 8 characters long');
  }

  validateEmail(email);

  if (!password || password.length < 6) {
    throw errorHandler(400, '"password" length must be at least 6 characters long'); 
  }
};

module.exports = validateUser;