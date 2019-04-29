FROM node:carbon
WORKDIR usr/src/app
ADD . .
RUN apt-get update
RUN apt-get install -y inotify-tools
RUN npm install