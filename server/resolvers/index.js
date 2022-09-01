const me = require('./me');
const signup = require('./signup');
const login = require('./login');
const saveBook = require('./saveBook');
const removeBook = require('./removeBook');

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    saveBook,
    removeBook,
    login,
    signup,
  },
};
module.exports = resolvers;
