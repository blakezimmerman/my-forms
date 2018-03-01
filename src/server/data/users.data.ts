import { usersCollection } from './mongo.collection';
import { UserAccount } from 'models/users';

export const createUser = (user: UserAccount) =>
  usersCollection()
    .then((x) => x.insertOne(user))
    .catch((err) => Promise.reject(err));

export const getUser = (userName: string): Promise<UserAccount> =>
  usersCollection()
    .then((x) => x.findOne({userName}))
    .catch((err) => Promise.reject(err));
