# Get version of Node.js we want
FROM node:9.5-alpine

# Expose port 3000 to run the server on
EXPOSE 3000

# Create a working directory and cd to it
RUN mkdir /app
WORKDIR /app

# Copy over our package.json and install its dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# Copy over all of our source files
COPY . /app

# Build our server and client application
RUN npm run build

# Start our Node.js server
CMD ["npm", "run", "start:prod"]
