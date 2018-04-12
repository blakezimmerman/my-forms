import * as express from 'express';
import * as path from 'path';
import webpackBuild from './webpackBuild';
import { ENV } from './app';

const clientDir = path.resolve(__dirname, '../client/');

const serveApp = (app: express.Express) => {
  if (ENV === 'dev') {
    webpackBuild(app);
  } else {
    app.use(express.static(clientDir));
    app.get('/*', (req, res) =>
      res.sendFile(clientDir + '/index.html')
    );
  }
};

export default serveApp;
