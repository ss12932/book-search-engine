const { ApolloError } = require('apollo-server');

const { User } = require('../models');
const { signToken } = require('../context/auth');

const signup = async (_, { input }) => {
  const user = await User.create(input);

  if (!user) {
    return ApolloError('Something is wrong!');
  }

  const token = signToken(user);

  return { token, user };
};

module.exports = signup;
