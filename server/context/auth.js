const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

function authMiddleware({ req }) {
  // allows token to be sent via  req.query or headers
  let token = req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  // verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch (error) {
    console.log(`[ERROR]: Invalid token || ${error.message}`);
    throw new AuthenticationError('Invalid error');
  }

  return req;
}

function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = {
  authMiddleware,
  signToken,
};
