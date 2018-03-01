import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { WriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
import { secret } from '../app';

type OperationResult = WriteOpResult | DeleteWriteOpResultObject;

export const checkMatchFound = (result: OperationResult, res: express.Response) =>
  !result.result.n || result.result.n < 1
    ? res.status(500).json('Could not find a matching object')
    : res.json(result);

type UserNameCallback = (err: Error, userName: string) => void;

export const userNameinCookies = (req: express.Request, callback: UserNameCallback) =>
  jwt.verify(req.signedCookies.token, secret, callback);
