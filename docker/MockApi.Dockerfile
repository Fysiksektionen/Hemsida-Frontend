#
# Dockerfile for json-server
#

FROM vimagick/json-server

# TODO: Perhaps this can be done using docker-compose
#CMD ["-H", "$(hostname -i)",  "-p", "3000", "-w", "db.json"]
COPY docker/mock-api-start.sh /data/start.sh
ENTRYPOINT ["bin/ash"]
CMD ./start.sh