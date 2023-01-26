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