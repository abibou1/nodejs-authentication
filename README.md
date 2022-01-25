# nodejs-authentication

This is a simple user registration API with ExpressJS. It has sign up, sign in and get users routes.
Mocha, Chai, and Supertest are used for testing.


# API
List of routes: https://app.swaggerhub.com/apis/abibou1/authAPIS/1.0.0#/

## Requirements

For development, you will only need Node.js, a node global package, and MongoDB.
You may also need to install Postman to run the APIs.

# Install

  $ git clone https://github.com/abibou1/nodejs-authentication.git
  $ cd nodejs-authentication
  $ npm install

# Setting

You will an .env file where you set goblal variables: API_PORT and MONGO_URI.

For example:
  API_PORT=8080
  MONGO_URI=mongodb://127.0.0.1:27017

# Running the project
  $ npm start
  or
  $ npm run dev

# API
More information about the apis here:
  https://app.swaggerhub.com/apis/abibou1/authAPIS/1.0.0#/

# Running tests
  $ npm run test


# Build Docker
docker-compose build

# Run docker
docker-compose up

