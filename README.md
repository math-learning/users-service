# Users-service

[![Coverage Status](https://coveralls.io/repos/github/math-learning/users-service/badge.svg)](https://coveralls.io/github/math-learning/users-service)

Service of the Math Learning platform. Used to store users metadata and manage authentication and authorization for the platform.


## Steps to prepare the environment

After start the server you will need postgres and npm.


### Install NPM and Node

1. Download node and npm. https://nodejs.org/en/

2. Once node is installed, run `npm install` to install all the dependencies of the project


### Set up the Database

1. Install postgres. For ubuntu guys: `sudo apt install postgresql postgresql-contrib`.

2. Once node is installed, it is neccesary to create the database. Run `sudo -i -u postgres` to enter in the postgres console.

3. Once in the console, write `psql` and create the users database for the development and tests: write `CREATE DATABASE users_service;` and then `CREATE DATABASE users_service_tests;`

4. Install the following global dependency: `npm install knex -g` 


_Note_: If you already has postgres and psql you can just write `PGPASSWORD=postgres psql -U postgres` to enter in the psql console, then do the step 3.

_Note_: If you want to change the postgres user and/or password, edit the file `./configs.js` with this configuration.

_Note_: For more information about postgres migrations, read http://knexjs.org/#Migrations-CLI



## Start the server

#### `npm start`

_Note_: Now your server is ready in the port specified in the file `./configs.js`. By default the port `7000` is choosen.


## Run tests

Before all, run `npm install eslint -g` to install the eslint flobal dependency

#### `npm test`

Launches the test runner for the application.

#### `npm run lint`

Launches the linter test runner to check the code syntaxis.

#### `npm run test:app`

If you only want to run the tests for the application and not the linter, you can execute this command
