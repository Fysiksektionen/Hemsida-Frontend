FROM node:16-alpine
EXPOSE 3000

# Alpine version requires flatpak to run node-sass (which requires glibc)
RUN apk add --no-cache flatpak \
    && rm -rf /tmp/npm* /var/cache/apk/*

# See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# To make things more efficient.

ADD package.json /home/fsh/package.json
WORKDIR /home/fsh
RUN npm install

CMD npm start