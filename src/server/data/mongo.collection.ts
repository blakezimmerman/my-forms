import { Collection } from 'mongodb';
import connectDb from './mongo.connection';

type MongoCollection = Promise<Collection> | undefined;

const getCollection = (name: string) => {
  let collection: MongoCollection;

  return () => {
    if (!collection) {
      collection = connectDb()
        .then((db) => db.collection(name))
        .catch((err) => Promise.reject(new Error(err)));
    }
    return collection;
  };
};

if (process.env.CLEAN) {
  ['users'].forEach((name) =>
    connectDb()
      .then((db) => db.collection(name).remove({}))
      .catch((err) => Promise.reject(new Error(err)))
  );
}

export const usersCollection = getCollection('users');
export const formsCollection = getCollection('forms');
