import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import * as uuid from 'uuid/v4';
import { createUser, getUser } from '../data/users.data';
import { NewUser, UserAccount } from 'models/users';

const router = express.Router();

const processUser = ({userName, password}: NewUser) =>
  getUser(userName)
    .then((users) => {
      if (!users.length) {
        return ({
          _id: uuid(),
          userName,
          hashedPassword: bcrypt.hashSync(password)
        });
      }
      Promise.reject('Username is already taken');
    })
    .catch((err: any) => Promise.reject(err));

router.post('/new', (req, res) =>
  processUser(req.body)
    .then((user: UserAccount) => createUser(user)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json('Unable to create account, please try again later')))
    .catch((err: any) => res.status(500).json('Sorry, this username is already taken'))
);

export default router;
