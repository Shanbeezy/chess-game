const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.use('/api/auth', authRouter);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.join(__dirname, '../client/build/index.html'))
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startApolloServer();
