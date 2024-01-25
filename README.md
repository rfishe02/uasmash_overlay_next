# Project Structure

This project was based on an [Express application generator](https://expressjs.com/en/starter/generator.html) template.

## /bin

Holds scripts for user authentication, database connection settings, and a script that has Express and Socket.io server settings.

## /mariadb

Contains Dockerfile, SQL commands, and language configuration settings for database setup.

## /modules

Contains custom objects used by the server.

## /public

Contains assets that will be publicly accessible by the browser such as images, scripts, and stylesheets.

## /routes

Contains scripts that define routing behavior within the server.

## /test

Contains unit tests for various objects that manipulate data, to ensure that they achieve proper output, which can be run with the command ```npm test```.

## /views

Contains the overlays, which can be used as a browser source in Open Broadcasting Software (OBS), and other web pages.

# Prerequisites

This project uses Node Package Manager (NPM) to manage and install dependencies, and a local instance of Docker to host the application. It requires port 3000 for Express and Socket.io communication. 

It's also necessary to create an ```.env``` file in the project's root directory to store confidential data needed throughout the application. For example:
```
MYSQL_ROOT_PASSWORD=<your root password>
MYSQL_DATABASE=uasmash
MYSQL_USER=admin
MYSQL_PASSWORD=<your user password>
MYSQL_HOST=mariadb
MYSQL_PORT=3306

DB_ENV=<local if locally hosted, docker otherwise>
NODE_ENV=<development for hot reloading, production otherwise>
PORT=3000

SECRET_KEY=<your key for session data management>
```

# Installation

This project uses Dockerfiles to setup the application and database in Docker, and it uses [Docker compose CLI](https://docs.docker.com/compose/reference/) commands for installation.

Build the application, database, and create the containers in Docker.
```
docker compose build
docker compose up
```

Stop and remove containers, networks, images, and volumes.
```
docker compose down
```

# Usage Instructions

1. Paste your Start.gg API key into the field on the Dashboard.
2. Select your tournament and options.
3. Copy the generated URL into the Browser Source URL field.
4. Create a stream queue in Start.gg.
5. In Start.gg, add a match to the stream queue, then start the match.

# Test Instructions

Mocha tests are in the ```\test``` folder. You can run ```npm test``` in the main folder to see the outcome of these tests.