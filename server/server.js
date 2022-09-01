const express = require('express');
const path = require('path');
const connectToDatabase = require('./config/connection');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./context/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

const init = async () => {
  try {
    await connectToDatabase();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware,
    });

    const { url } = await server.listen(PORT);
    console.log(`Server running on ${url}`);
  } catch (err) {
    console.log(`Failed to initiate server || ${err.message}`);
  }
};

init();
