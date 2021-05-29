# Alpine version will not work with node-sass.
FROM node:16
EXPOSE 3000

# See http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# To make things more efficient.

ADD package.json /home/fsh/package.json
WORKDIR /home/fsh
RUN npm install

CMD npm start