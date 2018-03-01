import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import { ObjectId } from 'mongodb';
import { createUser, getUser } from '../data/users.data';
import { User } from 'models/users';

const router = express.Router();

const processUser = ({userName, password}: User) => {
  if (userName.toLowerCase() === 'anonymous') {
    return Promise.reject(new Error('Username is already taken'));
  }
  return getUser(userName)
    .then((user) => {
      if (!user) {
        return ({
          _id: new ObjectId().toHexString(),
          userName,
          hashedPassword: bcrypt.hashSync(password)
        });
      }
      throw new Error('Username is already taken');
    })
    .catch((err: any) => Promise.reject(err));
};

router.post('/', (req, res) =>
  processUser(req.body)
    .then((user) => createUser(user)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json('Unable to create account, please try again later')))
    .catch((err: any) => res.status(500).json('Sorry, this username is already taken'))
);

export default router;
