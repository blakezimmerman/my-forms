import * as express from 'express';
import * as path from 'path';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../../webpack/webpack.dev';

const compiler = webpack(webpackConfig);
const outputPath = (compiler as any).outputPath;

const webpackBuild = (app: express.Express) => {
  app.use(webpackDevMiddleware(compiler, {
    stats: {
      colors: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
    publicPath: '/'
  }));

  app.use(webpackHotMiddleware(compiler));

  app.set('views', outputPath);

  app.use('/*', (req, res, next) => {
    const filename = path.resolve(outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, 'utf8', (err: Error, result: string) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
};

export default webpackBuild;
