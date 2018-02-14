# myForms

## About
myForms is a web application for creating surveys / tests, administrating them through shareable links, and viewing the results once submissions are received. This application follows the specifications required by the Engineering Design VI course (SSW-322 at Stevens Institute of Technology).

## Technology Stack
The technology stack for myForms can be classified into three distinct parts:

### Client
- [Typescript](https://www.typescriptlang.org/) for primary language
- [React](https://reactjs.org/) for view framework
- [Sass](https://sass-lang.com/) (SCSS) for styling views
- [Redux](https://redux.js.org/) for state managment
- [Redux-Observable](https://redux-observable.js.org/) for handling side effects
- [Redux-First Router](https://github.com/faceyspacey/redux-first-router) for application routing

### Server
- [Typescript](https://www.typescriptlang.org/) for primary language
- [Express](https://expressjs.com/) for web framework
- [JSON Web Tokens](https://jwt.io/) and cookies for authentication

### Database
- [MongoDB](https://www.mongodb.com/) for storing data

To help maintain a uniform runtime environment and relieve possible dependency issues, the entire stack is set up to run in [Docker](https://www.docker.com/) via [Docker Compose](https://docs.docker.com/compose/). The stack is made up of two Docker containers:

- `myforms_app` : Image based on `node-9.5-alpine` where the React client and Node server will be run.
- `mongo:3.6.2-jessie` : Image where the MongoDB instance will be run. All data will be persisted `/data/` of this project folder.

## Project Directory Structure
```
├── data (Persists MongoDB data; appears after starting Docker container)
├── node_modules (Dependencies; appears after npm install)
├── src/
│   ├── client/ (React code)
│   │   ├── app/ (App views and logic)
│   │   │   ├── 'feature'/ (All files related to a feature)
│   │   │   │   ├── 'feature'.epics.ts
│   │   │   │   ├── 'feature'.reducer.ts
│   │   │   │   ├── 'feature'.selectors.ts
│   │   │   │   ├── 'feature'.styles.scss
│   │   │   │   ├── 'feature'.styles.scss.d.ts (Auto-gen'd style definitions)
│   │   │   │   ├── 'UI Component'.tsx
│   │   │   ├── app.styles.scss (Styles for root component)
│   │   │   ├── app.styles.scss.d.ts (Auto-gen'd style definitions)
│   │   │   └── app.tsx (Root component)
│   │   ├── assets/ (Static assets like images)
│   │   ├── router/ (Code for Redux-First Router)
│   │   │   ├── router.epics.ts (Epics for router actions)
│   │   │   └── router.ts (Route map for application)
│   │   ├── shared/ (Code shared between React components)
│   │   │   ├── apiUtils.ts (Utils for API calls)
│   │   │   ├── miscUtils.ts (Other utils)
│   │   │   └── reduxUtils.ts (Utils and abstractions for redux)
│   │   ├── store/ (Code for initializing Redux store)
│   │   │   ├── createStore/ (Returns Redux store for current env)
│   │   │   ├── rootEpic.ts (Root epic for Redux)
│   │   │   └── rootReducer.ts (Root reducer for Redux)
│   │   ├── index.handlebars (HTML where env config and JS bundle are injected)
│   │   └── index.tsx (Entry point for React)
│   ├── models/ (All shared types and interfaces for project)
│   └── server/ (Node.js code)
│       ├── data/ (Code to interface with MongoDB)
│       ├── routes/ (Code for API routes)
│       ├── app.ts (Entry point for server)
│       ├── clientConfig.ts (Returns env config for client)
│       ├── serveApp.ts (Serves Single-Page-App)
│       └── webpackBuild.ts (Builds client in dev env)
├── webpack/
│   ├── webpack.common.js (Common webpack config properties)
│   ├── webpack.dev.js (Config for dev build of client code)
│   ├── webpack.prod.js (Config for prod build of client code)
│   └── webpack.server.js (Config for build of server code)
├── .dockerignore (Files for Docker to ignore)
├── .editorconfig (Formatting rules for editor)
├── .gitignore (Files for git to ignore)
├── docker-compose.dev.yml (Dev config for Docker Compose)
├── docker-compose.yml (Prod config for Docker Compose)
├── Dockerfile (Prod build script for myforms_app container)
├── Dockerfile.dev (Dev build script for myforms_app container)
├── package-lock.json (Specific versions for all dependencies)
├── package.json (Dependency list and npm scripts)
├── README.md (This file)
├── tsconfig.json (Config for TypeScript compiler)
└── tslint.json (Config for TypeScript linter)
```

## Some Terminology
Some terms or conventions in the code base may be unfamiliar so I'll try to define some of them here.

### Reducers
Reducers are pure functions that take an action and the current Redux state object and then return a new state object. Reducers can be composed together and a composition of all the application's reducers is called the root reducer. In this project, files that end with `.reducer.ts` contain a reducer and definitions for the actions that the reducer acts on. More can be read about reducers in the [docs for Redux](https://redux.js.org/docs/basics/Reducers.html).

### Epics
Epics are the means by which asynchronous Redux actions are performed. In essence, they take in actions, perform side effects, and return new actions as a result. More can read about them in the [docs for Redux-Observable](https://redux-observable.js.org/docs/basics/Epics.html).

### Selectors
Selectors are memoized functions that take the global Redux state as an argument and return some value computed from the state. They can be read about in more detail at [Reselect's GitHub Repo](https://github.com/reactjs/reselect).

### Style Definitions
Style definitions refer to the source files with the extension `.scss.d.ts`. These files are automatically generated by `typings-for-css-modules-loader` when the client is bundled by webpack. These files allow you to have type checking and autocomplete when referencing SCSS classes in React Components.

## How to Run

### Development
- [Install Docker](https://www.docker.com/community-edition#/download) on your machine
- Ensure that both `docker` and `docker-compose` work in your terminal
- [Install Node](https://nodejs.org/en/) on your machine
- Pull down a copy of this repository
- Run `cd my-forms` (Or wherever this project is stored)
- Run `npm install` to install dependencies
- Run `npm run docker` to start dev Docker container
- Application will now be running on `localhost:3000`
- As you edit source files, webpack will perform hot module replacements from the Docker container

### Production
- [Install Docker](https://www.docker.com/community-edition#/download) on your machine
- Ensure that both `docker` and `docker-compose` work in your terminal
- Pull down a copy of this repository
- Run `cd my-forms` (Or wherever this project is stored)
- Run `docker-compose up` to start the application on `localhost:3000`
