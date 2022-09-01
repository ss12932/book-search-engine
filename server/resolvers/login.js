const { ApolloError } = require('apollo-server');

const { User } = require('../models');
const { signToken } = require('../utils/auth');

const login = async (_, { input }) => {
  const user = await User.findOne({
    $or: [{ username: input.username }, { email: input.email }],
  });

  if (!user) {
    return ApolloError("Can't find this user");
  }

  const correctPw = await user.isCorrectPassword(input.password);

  if (!correctPw) {
    return ApolloError('Wrong password!');
  }

  const token = signToken(user);

  return { token, user };
};

module.exports = login;
