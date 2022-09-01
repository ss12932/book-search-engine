const express = require('express');
const path = require('path');
const connectToDatabase = require('./config/connection');
const routes = require('./routes');

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
    app.listen(PORT, () => {
      console.log(`Server listening on https://localhost:${PORT} 🚀`);
    });
  } catch (err) {
    console.log(`Failed to initiate server || ${err.message}`);
  }
};

init();
