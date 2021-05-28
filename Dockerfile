# Alpine version will not work with node-sass.
FROM node:16-buster

ENV NODE_ENV=development

# Load npm packages first according to https://stackoverflow.com/a/35774741
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app
COPY . /opt/app

EXPOSE 3000
CMD ["npm", "start"]
