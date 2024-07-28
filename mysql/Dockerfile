FROM mysql:latest

# Set environment variables
# These variables can be customized as needed
ENV MYSQL_ROOT_PASSWORD=Styl@123
ENV MYSQL_DATABASE=HOTEL
RUN mkdir sqlfile
COPY final.sql sqlfile/
COPY ./init.sh /docker-entrypoint-initdb.d/
# Expose the default MySQL port
EXPOSE 3306
CMD ["mysqld"]