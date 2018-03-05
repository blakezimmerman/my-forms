// Define constants
export const ENV = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3000;
export const host = process.env.HOST || `http://localhost:${port}/`;
export const secret = process.env.SECRET || 'This is my not so secret string';

// Create app
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser(secret));

// Add routes
import routes from './routes';
routes(app);

// Serve app
import serveApp from './serveApp';
serveApp(app);

// Start listening
app.listen(port, () =>
  console.log(`Listening on ${host}`) // tslint:disable-line
);
