
FROM mariadb:latest

COPY ./init.sql /docker-entrypoint-initdb.d/

COPY ./utf8.cnf /etc/mysql/mariadb.conf.d/
