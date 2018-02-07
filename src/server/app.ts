// Define constants
export const ENV = process.env.NODE_ENV || 'dev';
const port = 3000;
export const host =
  ENV === 'prod'
    ? `http://localhost:${port}/` // Add prod link later
    : `http://localhost:${port}/`;

// Create app
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Serve app
import serveApp from './serveApp';
serveApp(app);

// Start listening
app.listen(port, () =>
  console.log(`Listening on ${host}`) // tslint:disable-line
);
