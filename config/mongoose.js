/* eslint-disable no-console */
// require mongoose module
const mongoose = require('mongoose');

const db = {
  url: 'mongodb://localhost:27017/',
  db_name: 'authors',
};
/**
 * Mongoose options.
 */

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 20000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  // useUnifiedTopology: true  //remove deprecated warning
};

// export this function and imported by server.js
function connectMongo() {
  let isConnectedBefore = false;
  const connect = () => mongoose.connect(
    `${db.url}${db.db_name}?retryWrites=true&w=majority`,
    options,
  );

  connect();

  mongoose.connection.on('connected', () => {
    isConnectedBefore = true;
    console.log(
      `Mongoose default connection is open to ${process.env.DB_NAME}`,
    );
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
    if (!isConnectedBefore) connect();
  });

  mongoose.connection.on('reconnected', () => {
    console.log(
      `Mongoose default connection is reconnected to ${process.env.DB_NAME}`,
    );
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection is disconnected due to application termination',
      );
      process.exit(0);
    });
  });
}

module.exports = connectMongo;
