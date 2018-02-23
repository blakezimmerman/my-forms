import { MongoClient, Db } from 'mongodb';

type MongoConnection = Promise<Db> | undefined;

const serverUrl = process.env.MONGODB_URI || 'mongodb://mongo';
const database = process.env.MONGODB_DB || 'my-forms';

let connection: MongoConnection;

const connectDb = () => {
  if (!connection) {
    connection = MongoClient.connect(serverUrl)
      .then((client) => client.db(database))
      .catch((err) => Promise.reject(new Error('Unable to connect to database')));
  }
  return connection;
};

export default connectDb;
