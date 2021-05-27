# Alpine version will not work with node-sass.
FROM node:16-buster

# Copied from: http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install --production
# RUN mkdir -p /home/fsh && cp -a /tmp/node_modules /home/fsh/

COPY . /home/f
WORKDIR /home/f
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
