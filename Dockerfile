# syntax=docker/dockerfile:1

FROM node:18.1.0


RUN apt-get update
RUN apt-get install -y locales locales-all
ENV LC ALL en US. UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en US.UTF-8


ENV NODE_ENV=production

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "./bin/www" ]
