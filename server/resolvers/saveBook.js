const { ApolloError } = require('apollo-server');

const { User } = require('../models');

const saveBook = async (_, { input }, { user }) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedBooks: input } },
      { new: true, runValidators: true },
    );

    return updatedUser;
  } catch (err) {
    return ApolloError('Failed to save book');
  }
};

module.exports = saveBook;
