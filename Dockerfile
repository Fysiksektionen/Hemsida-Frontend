# Alpine version will not work with node-sass.
FROM node:16-buster

# Load npm packages first according to https://stackoverflow.com/a/35774741
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# Copy current files
WORKDIR /opt/app
COPY . /opt/app

# Logging of commands for history
RUN mkdir -p /commandhistory
RUN touch /commandhistory/.bash_history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo $SNIPPET >> "/root/.bashrc"

# Expose running port and start server
EXPOSE 3000
CMD ["npm", "start"]
