import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import * as uuid from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import { secret } from '../app';
import { getUser } from '../data/users.data';

const router = express.Router();

const findUser = (userName: string) =>
  getUser(userName)
    .then((users) => users.length ? users[0] : false)
    .catch((err) => false);

const checkPassword = (hash: string, password: string) =>
  bcrypt.compareSync(password, hash);

const generateToken = (userName: string) =>
  jwt.sign(userName, secret);

router.post('/login', (req, res) => {
  findUser(req.body.userName)
    .then((user) => {
      if (user) {
        if (checkPassword(user.hashedPassword, req.body.password)) {
          res.cookie('token', generateToken(user.userName), { httpOnly: true, signed: true });
          res.json(user.userName);
        } else {
          res.status(500).json('Incorrect password entered');
        }
      } else {
        res.status(500).json('Username not found');
      }
    })
    .catch((err) => res.status(500).json('An error occurred during user lookup'));
});

router.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, signed: true, maxAge: 0 });
  res.redirect('/');
});

router.get('/refresh', (req, res) =>
  jwt.verify(req.signedCookies.token, secret, (err: any, decoded: string) =>
    (err || !decoded)
      ? res.json('Not Authorized')
      : findUser(decoded)
          .then((user) => {
            if (user) {
              res.json(user.userName);
            } else {
              res.redirect('/api/auth/logout');
            }
          })
          .catch((e: any) => res.redirect('/api/auth/logout'))
  )
);

export default router;
