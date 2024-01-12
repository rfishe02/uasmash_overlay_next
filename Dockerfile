# syntax=docker/dockerfile:1

FROM node:18.1.0

RUN apt-get update
RUN apt-get install -y locales locales-all
ENV LC ALL en US. UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en US.UTF-8

WORKDIR /server

COPY ["package.json", "package-lock.json*", "./"]

RUN mkdir -p /server/uploads
RUN chmod 755 /server/uploads

RUN if [ "${NODE_ENV}" = "production" ]; then \
      npm install --production; \
    else \
      npm install; \
    fi

COPY . .

RUN if [ "${NODE_ENV}" = "production" ]; then \
      echo npm start > run.sh; \
    else \
      echo npm run dev > run.sh; \
    fi; \
    chmod 777 run.sh;

CMD ["./run.sh"]